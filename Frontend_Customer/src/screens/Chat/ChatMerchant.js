//Packages
import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
//Components
import { StyleSheet, Text, View, ScrollView, Button } from "react-native";
//Configs
import UserContext from "../../hooks/context/UserContext";
import { IP_ADDRESS } from "@env";

const ChatMerchant = ({ navigation }) => {
    //configs
    const isFocused = useIsFocused();
    const { state } = useContext(UserContext);
    //data
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (isFocused) {
            apiShowOrder();
        }
    }, [isFocused]);
    useEffect(() => {
        console.log(orders);
    }, [orders]);
    const apiShowOrder = () => {
        axios
            .get(
                `http://${IP_ADDRESS}/order/get?customer_id=${state.userData._id}`
            )
            .then((res) => {
                // console.log(res.data.message);
                // console.log(res.data.orders);
                setOrders(res.data.orders);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const handleChatroom = (order) => {
        navigation.navigate("Chat", {
            orderData: order.order,
            restaurantData: order.restaurant,
        });
    };
    return (
        <ScrollView>
            {orders ? (
                orders.map((order, index) => (
                    <Button
                        key={index}
                        title={order.restaurant.name}
                        onPress={() => handleChatroom(order)}
                    />
                ))
            ) : (
                <Text>คุณยังไม่ได้ทำรายการสั่งอาหาร</Text>
            )}
        </ScrollView>
    );
};

export default ChatMerchant;

const styles = StyleSheet.create({});

//Packages
import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
//Components
import { StyleSheet, Text, View, ScrollView, Button } from "react-native";
//Configs
import UserContext from "../../hooks/context/UserContext";
import { IP_ADDRESS } from "@env";

const FindLost = ({ navigation }) => {
    //Configs
    const { state } = useContext(UserContext);
    const isFocused = useIsFocused();
    //Variables
    const [listOfLostItems, setListOfLostItems] = useState([]);
    //Start up
    useEffect(() => {
        if (isFocused) {
            api_getAllLostItems();
        }
    }, [isFocused]);
    const api_getAllLostItems = () => {
        axios
            .get(`http://${IP_ADDRESS}/lostItem/getAll?type=${"find"}&owner_id=${state.userData._id}`)
            .then((res) => {
                console.log(res.data.message);
                setListOfLostItems(res.data.listOfLostItems);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const handleFindLostDetail = (data) => {
        // console.log(data);
        navigation.navigate("LostDetail",{lostData: data})
    };
    return (
        <View>
            <Text>FindLost screen</Text>
            {listOfLostItems.map((item, index) => (
                <View key={index} style={{ marginBottom: 5 }}>
                    <Button
                        title={item.name}
                        onPress={() => handleFindLostDetail(item)}
                    />
                </View>
            ))}
        </View>
    );
};

export default FindLost;

const styles = StyleSheet.create({});
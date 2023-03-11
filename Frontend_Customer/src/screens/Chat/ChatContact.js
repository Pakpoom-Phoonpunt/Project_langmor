//Packages
import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
//Components
import { StyleSheet, Text, View, ScrollView, Button } from "react-native";
import BackScreen from "../../components/buttons/BackScreen";
import SubmitBtn from "../../components/buttons/SubmitBtn";
import ContactBtn from "../../components/buttons/ContactBtn";
//Configs
import UserContext from "../../hooks/context/UserContext";
import { IP_ADDRESS } from "@env";

const BUTTONS_PER_ROW = 2;

const ChatContact = ({ navigation, route }) => {
    const { itemData, chatroomsData } = route.params;
    // console.log(chatroomsData);
    useEffect(() => {
        navigation.setOptions({
            title: "แชท",
            headerTitleStyle: {
                fontFamily: "Kanit-Bold",
                fontSize: 22,
            },
            headerLeft: () => (
                <BackScreen
                    onPress={() => navigation.goBack()}
                    color="#FF7A00"
                />
            ),
        });
    }, []);

    const api_closeItems = (data) => {
        axios
            .post(`http://${IP_ADDRESS}/chatroom/closeItem`, {
                itemData: data,
            })
            .then((res) => {
                console.log(res.data.message);
            })
            .catch((err) => {
                if (
                    err &&
                    err.response &&
                    err.response.data &&
                    err.response.data.message
                )
                    console.log("Error", err.response.data.message);
            });
    };

    const handleChatroom = (room) => {
        // console.log(room);
        navigation.navigate("Chat2", {
            itemData: itemData,
            chatroomData: room,
        });
    };
    const handleCloseSecondHand = () => {
        api_closeItems(itemData);
        navigation.goBack();
    };
    const handleDebugger = () => {
        console.log(itemData, chatroomsData);
    };

    const renderRow = (chatrooms) => (
        <View style={styles.row} key={chatrooms[0].chatroom._id}>
            {chatrooms.map((chatroom) => (
                <ContactBtn
                    chatroom={chatroom}
                    onPress={() => {
                        handleChatroom(chatroom.chatroom);
                    }}
                />
            ))}
        </View>
    );

    const rows = [];

    for (let i = 0; i < chatroomsData.length; i += BUTTONS_PER_ROW) {
        const row = chatroomsData.slice(i, i + BUTTONS_PER_ROW);
        rows.push(renderRow(row));
    }
    return (
        <View style={{ flex: 1 }}>
            <Text>ChatContact</Text>
            {/* <Button title="Debugger" onPress={handleDebugger}/> */}
            {chatroomsData.length !== 0 ? (
                <ScrollView>
                    <View
                        style={{
                            paddingBottom: "20%",
                            marginTop: "4%",
                            alignSelf: "center",
                            width: "88%",
                        }}
                    >
                        {rows}
                    </View>
                </ScrollView>
            ) : (
                <Text style={styles.alert_font}>No one contacted.</Text>
            )}

            <View style={styles.submitBtn}>
                <SubmitBtn
                    label={"ปิดการขายสินค้า"}
                    onPress={handleCloseSecondHand}
                    backgroundColor="#FF0101"
                />
            </View>
        </View>
    );
};

export default ChatContact;

const styles = StyleSheet.create({
    submitBtn: {
        position: "absolute",
        bottom: 0,
        width: "90%",
        alignSelf: "center",
        marginBottom: "8%",
    },
    alert_font: {
        fontFamily: "Kanit-Bold",
        fontSize: 18,
        textAlign: "center",
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
});

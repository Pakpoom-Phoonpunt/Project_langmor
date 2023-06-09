//packages
import React from "react";
//components
import { StyleSheet, Text, View, Image, Pressable } from "react-native";

const MessageModel = ({ message, userId }) => {
    const status = message.user === userId;

    const changeTimeFormat = (timestamp) => {
        let date = new Date(timestamp);
        let newDate = {
            hour: date.getHours().toString().padStart(2, "0"),
            mins: date.getMinutes().toString().padStart(2, "0"),
        };
        return `${newDate.hour}:${newDate.mins}`;
    };
    const timestamp = changeTimeFormat(message.timestamp);

    return (
        <View style={styles.container}>
            <View
                style={
                    status
                        ? styles.message_wrapper
                        : [styles.message_wrapper, { alignItems: "flex-start" }]
                }
            >
                <View
                    style={
                        status
                            ? styles.message
                            : [styles.message, { backgroundColor: "#DFDFDF" }]
                    }
                >
                    {message.message !== "" ? (
                        <Text style={styles.text}>{message.message}</Text>
                    ) : (
                        ""
                    )}
                    {message.picture ? (
                        <Pressable
                            onPress={() => console.log("Image Pressed..")}
                            style={{ width: "70%" }}
                        >
                            <Image
                                source={{ uri: `${message.picture.url}` }}
                                style={[
                                    {
                                        width: "100%",
                                        // height: undefined,
                                        aspectRatio:
                                            message.picture.width /
                                            message.picture.height,
                                    },
                                ]}
                            />
                        </Pressable>
                    ) : (
                        ""
                    )}
                </View>
                <Text style={[styles.text, { color: "#C9C5C4", fontSize: 12 }]}>
                    {timestamp}
                </Text>
            </View>
        </View>
    );
};

export default MessageModel;

const styles = StyleSheet.create({
    container: {},
    message_wrapper: {
        width: "100%",
        alignItems: "flex-end",
        marginBottom: 5,
    },
    message: {
        maxWidth: "100%",
        backgroundColor: "#FF7A00",
        padding: 10,
        borderRadius: 10,
    },
    image: {
        width: "50%",
        height: undefined,
    },
    text: {
        fontFamily: "Kanit-Medium",
    },
});

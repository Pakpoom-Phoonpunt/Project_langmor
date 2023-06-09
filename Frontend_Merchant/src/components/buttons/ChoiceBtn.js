//Packages
import React, { useEffect } from "react";
import { Feather } from "@expo/vector-icons";
//Components
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
const ChoiceBtn = ({ label, onPress }) => {
    return (
        <TouchableOpacity
            style={[styles.container, styles.shadow]}
            onPress={onPress}
        >
            <Text style={styles.text}> {label} </Text>
            <Feather
                name="edit-3"
                size={24}
                color="#FF4200"
                style={styles.icon}
            />
        </TouchableOpacity>
    );
};

export default ChoiceBtn;

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        flexDirection: "row",
        backgroundColor: "white",
        marginBottom: 6,
        padding: 5,
        justifyContent: "center",
        borderRadius: 5,
    },
    text: {
        fontFamily: "Kanit-Medium",
        fontSize: 16,
        color: "#1A0700",
    },
    icon: {
        position: "absolute",
        right: 10,
        top: "30%",
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.0,

        elevation: 1,
    },
});

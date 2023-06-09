//Packages
import React, { useEffect, useState } from "react";
//Components
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import CustomTextInput from "../input/CustomTextInput";

const AddressBoxDetail = ({ setValue }) => {
    const [address, setAddress] = useState();
    useEffect(() => {
        setValue(address);
    }, [address]);
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={{ marginTop: 8, marginHorizontal: "3.74%" }}>
                    <Ionicons
                        name="location-outline"
                        size={30}
                        color="#FF4200"
                    />
                </View>
                <View style={{ marginTop: 16, width: "70%" }}>
                    <View style={{ marginBottom: 3 }}>
                        <Text style={styles.textHeader}>กรอกที่อยู่จัดส่ง</Text>
                    </View>
                </View>
            </View>
            <View style={styles.textInput}>
                <CustomTextInput
                    placeholder={"เช่น ประตูรั้วหลังมจพ."}
                    value={address}
                    onChangeText={setAddress}
                    style={{borderWidth: 0.5, borderColor: "#DFDFDF"}}
                />
            </View>
        </View>
    );
};

export default AddressBoxDetail;

const styles = StyleSheet.create({
    addressText: {
        fontSize: 14,
        fontFamily: "Kanit-Bold",
        color: "#9D9693",
    },
    container: {
        backgroundColor: "white",
        borderRadius: 5,
        paddingBottom: 16,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
    },
    textInput: {
        alignItems: "center",
        // backgroundColor: "red"
    },
    editIcon: {
        justifyContent: "flex-end",
        marginLeft: "auto",
        marginHorizontal: "3.74%",
    },
    textHeader: { fontSize: 18, fontFamily: "Kanit-Bold" },
});

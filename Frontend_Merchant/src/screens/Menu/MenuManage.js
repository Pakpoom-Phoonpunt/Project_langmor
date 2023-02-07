//Packages
import React, { useEffect } from "react";
//Components
import { StyleSheet, Text, View } from "react-native";
import BackScreen from "../../components/buttons/BackScreen";

const MenuManage = ({ navigation }) => {
    useEffect(() => {
        navigation.setOptions({
            title: "จัดการเมนูร้านค้า",
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

    return (
        <View>
            <Text>MenuManage</Text>
        </View>
    );
};

export default MenuManage;

const styles = StyleSheet.create({});

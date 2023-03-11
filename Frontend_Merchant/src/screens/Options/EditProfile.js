// Packages
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
// Components
import {
    StyleSheet,
    Button,
    Text,
    View,
    ImageBackground,
    ScrollView,
    SafeAreaView,
    SectionList,
} from "react-native";
import BackScreen from "../../components/buttons/BackScreen";
// Configs
import { IP_ADDRESS } from "@env";
import UserContext from "../../hooks/context/UserContext";

const EditProfile = ({ navigation }) => {
    const { state } = useContext(UserContext);
    const [family_name, setFamily_name] = useState(state.userData.family_name);
    const [given_name, setGiven_name] = useState(state.userData.given_name);
    //Start-up
    useEffect(() => {
        navigation.setOptions({
            title: "จัดการโปรไฟล์",
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

    const api_userUpdate = () => {
        axios
            .post(`http://${IP_ADDRESS}/merchant/update`, {
                _id: state.userData._id,
                family_name: family_name,
                given_name: given_name,
            })
            .then((res) => {
                console.log(res.data.message);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const handleDebugger = () => {
        // console.log(state.userData);
        api_userUpdate();
    };
    return (
        <View>
            <Button title="Debugger" onPress={handleDebugger} />
            <Text>EditProfile</Text>
        </View>
    );
};

export default EditProfile;

const styles = StyleSheet.create({});
//Packages
import React, { useEffect, useState, useContext, useRef } from "react";
import axios from "axios";
import * as LIP from "../../lib/lm-image-picker";
//Components
import {
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Pressable,
    Button,
    Alert,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import BackScreen from "../../components/buttons/BackScreen";
import ImageInput from "../../components/Inputs/ImageInput";
import CustomTextInput from "../../components/Inputs/CustomTextInput";
import AcceptButton from "../../components/buttons/AcceptButton";
import CheckboxButton from "../../components/Checkboxes/CheckboxButton";
import Bin from "../../components/buttons/Bin";
import MiniBtn from "../../components/buttons/MiniBtn";
//Config
import UserContext from "../../hooks/context/UserContext";
import { IP_ADDRESS } from "@env";

const AddMenu = ({ navigation, route }) => {
    useEffect(() => {
        navigation.setOptions({
            title: !foodData._id ? "เพิ่มเมนูอาหาร" : "แก้ไขเมนูอาหาร",
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
            headerRight: () =>
                foodData._id ? (
                    <Bin onPress={handleDeleteMenu} color="#E61931" />
                ) : (
                    ""
                ),
        });
        // Fetuch Functions
        fetchOptions();
        fetchTypes();
    }, []);

    // Helping Variable
    const { state } = useContext(UserContext);
    const { foodData } = route.params;
    const [options, setOptions] = useState([]);
    const [type, setType] = useState("");
    const [types, setTypes] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const scrollViewRef = useRef(null);
    // Used for Send to backend
    const [image, setImage] = useState(foodData.picture);
    const [name, setName] = useState(foodData.name);
    const [price, setPrice] = useState(foodData.price);
    const [description, setDescription] = useState(foodData.description);
    const [selectOptions, setSelectOptions] = useState(foodData.options);
    const [selectedType, setSelectedType] = useState(foodData.type);

    const fetchOptions = () => {
        axios
            .get(
                `http://${IP_ADDRESS}/restaurant/options?restaurant_id=${state.restaurantData._id}`
            )
            .then((res) => {
                setOptions(res.data.options);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const fetchTypes = () => {
        axios
            .get(
                `http://${IP_ADDRESS}/restaurant/types?restaurant_id=${state.restaurantData._id}`
            )
            .then((res) => {
                setTypes(res.data.types);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const fetchTypesSave = () => {
        axios
            .post(`http://${IP_ADDRESS}/restaurant/save_types`, {
                types: types,
                restaurant_id: state.restaurantData._id,
            })
            .then((res) => {
                // console.log(res.data.message);
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

    const fetchFoodSave = (url_image) => {
        axios
            .post(`http://${IP_ADDRESS}/restaurant/save_food`, {
                restaurant_id: state.restaurantData._id,
                picture: url_image,
                name: name,
                price: Number(price),
                description: description,
                options: selectOptions,
                type: selectedType,
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

    const api_deleteMenu = () => {
        axios
            .delete(`http://${IP_ADDRESS}/restaurant/delete_food`, {
                data: {
                    food_id: foodData._id,
                },
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

    const handleSave = () => {
        if (!name.trim() || !price.trim()) {
            if (!name.trim()) {
                Alert.alert("Error", "กรุณาเติมชื่อเมนูอาหาร");
            } else if (!price.trim()) {
                Alert.alert("Error", "กรุณาเติมราคาเมนูอาหาร");
            }
            scrollViewRef.current?.scrollTo({
                y: 0,
                animated: true,
            });
            return false;
        }
        setIsLoaded(true);
        if (image) {
            if (image.type !== "upload") {
                LIP.handleUpload(image, state.restaurantData._id)
                    .then((data) => {
                        fetchTypesSave();
                        fetchFoodSave(data);
                        navigation.navigate("MenuTabs", {
                            screen: "MenuManage",
                        });
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            } else {
                fetchTypesSave();
                fetchFoodSave(image);
                navigation.navigate("MenuTabs", {
                    screen: "MenuManage",
                });
            }
        } else {
            fetchTypesSave();
            fetchFoodSave(null);
            navigation.navigate("MenuTabs", {
                screen: "MenuManage",
            });
        }
    };

    const handleSelectOptions = (option) => {
        if (selectOptions.includes(option)) {
            setSelectOptions(selectOptions.filter((o) => o !== option));
        } else {
            setSelectOptions([...selectOptions, option]);
        }
    };
    const handleSelectedType = (type) => {
        if (selectedType === type) {
            setSelectedType("");
        } else {
            setSelectedType(type);
        }
    };
    const handleAddTypesSave = () => {
        if (!types.includes(type)) {
            setTypes([...types, type]);
        }
        setModalVisible(false);
    };
    const handleEditTypes = () => {
        console.log("Press");
    };
    const handleAddOptions = () => {
        // console.log("Press");
        navigation.navigate("AddOptions", {
            optionData: {
                name: "",
                required: false,
                maximum: 0,
                choices: [],
            },
        });
    };
    const handleEditOptions = () => {
        navigation.navigate("MenuTabs", { screen: "OptionsManage" });
    };

    const handleDeleteMenu = () => {
        api_deleteMenu();
        navigation.goBack();
    };

    const handleDebugger = () => {
        console.log(foodData);
    };

    return (
        <ScrollView ref={scrollViewRef} style={{}}>
            {/* <Button title="Debugger" onPress={handleDebugger}/> */}
            <View style={styles.container}>
                <View style={styles.input_components}>
                    <View style={{ marginBottom: 8 }}>
                        <ImageInput
                            lable="เพิ่มรูปเมนู"
                            image={image}
                            setImage={(image) => setImage(image)}
                        />
                    </View>
                    <CustomTextInput
                        placeholder={"ชื่อรายการอาหาร"}
                        value={name}
                        onChangeText={setName}
                    />
                    <CustomTextInput
                        placeholder={"ราคา (บาท)"}
                        value={String(price)}
                        onChangeText={setPrice}
                        keyboardType={"numeric"}
                    />
                    <CustomTextInput
                        placeholder={"รายละเอียดเพิ่มเติม"}
                        value={description}
                        onChangeText={setDescription}
                        multiline={true}
                        numberOfLines={4}
                    />
                </View>
                <Text style={styles.header}>ประเภทอาหาร</Text>
                <View style={styles.options}>
                    {types.map((type, index) => (
                        <CheckboxButton
                            key={index}
                            label={type}
                            checked={selectedType.includes(type)}
                            onPress={() => handleSelectedType(type)}
                        />
                    ))}
                    <View style={styles.add_edit_button}>
                        <MiniBtn
                            label={"เพิ่ม"}
                            color="#FF7A00"
                            onPress={() => setModalVisible(true)}
                        />
                        <Modal
                            transparent={true}
                            animationType="fade"
                            visible={modalVisible}
                            nRequestClose={() => setModalVisible(false)}
                        >
                            <TouchableOpacity
                                style={styles.container_add_button}
                                onPress={() => setModalVisible(false)}
                            >
                                <Pressable style={styles.addTags}>
                                    <CustomTextInput
                                        placeholder="หมวดหมู่อาหาร"
                                        value={type}
                                        onChangeText={setType}
                                        style={styles.shadow}
                                    />
                                    <MiniBtn
                                        label={"บันทึก"}
                                        color="#63BE00"
                                        onPress={handleAddTypesSave}
                                    />
                                </Pressable>
                            </TouchableOpacity>
                        </Modal>
                        <MiniBtn
                            label={"แก้ไข"}
                            color="#FF0101"
                            onPress={handleEditTypes}
                        />
                    </View>
                </View>
                <Text style={styles.header}>ตัวเลือกเสริม</Text>
                <View style={styles.options}>
                    {options.map((option, index) => (
                        <CheckboxButton
                            key={index}
                            label={option.name}
                            checked={selectOptions.some(
                                (item) => item.name === option.name
                            )}
                            onPress={() => handleSelectOptions(option)}
                        />
                    ))}
                    <View style={styles.add_edit_button}>
                        <MiniBtn
                            label={"เพิ่ม"}
                            color="#FF7A00"
                            onPress={handleAddOptions}
                        />
                        <MiniBtn
                            label={"แก้ไข"}
                            color="#FF0101"
                            onPress={handleEditOptions}
                        />
                    </View>
                </View>
                <View style={styles.submitButton}>
                    <AcceptButton
                        label={!foodData._id ? "บันทึก" : "อัปเดต"}
                        onPress={handleSave}
                        isLoaded={isLoaded}
                    />
                </View>
            </View>
        </ScrollView>
    );
};

export default AddMenu;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F5F5F5",
        marginHorizontal: 30,
    },
    input_components: {
        marginBottom: 8,
        marginTop: 10,
        alignItems: "center",
    },
    options: {
        backgroundColor: "white",
        padding: 5,
        borderRadius: 15,
        marginBottom: 10,
    },
    header: {
        fontFamily: "Kanit-Bold",
        fontSize: 20,
        color: "#1A0700",
        marginBottom: 10,
    },
    add_edit_button: {
        justifyContent: "space-around",
        flexDirection: "row",
        marginVertical: 10,
    },
    container_add_button: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
    },
    addTags: {
        backgroundColor: "#EDEDED",
        padding: 20,
        borderRadius: 15,
        alignItems: "center",
    },
    submitButton: {
        marginBottom: 10,
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

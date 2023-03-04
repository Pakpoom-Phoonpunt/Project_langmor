//Packages
import React, { useEffect, useState } from "react";
import axios from "axios";
import { IP_ADDRESS } from "@env";
//Components
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
import Searchbar from "../../components/searchs/Searchbar";
import Fav from "../../components/buttons/Fav";
import AddressBox from "../../components/buttons/AddressBox";
import CardMarket from "../../components/cards/CardMarket";
import CardRestaurantTag from "../../components/cards/CardRestaurantTag";
import BackScreen from "../../components/buttons/BackScreen";

const MarketList = ({ navigation }) => {
    const [restaurants, setRestaurants] = useState();
    const [searchQuery, setSearchQuery] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        // setHeader
        navigation.setOptions({
            title: "สั่งอาหาร",
            headerStyle: {
                backgroundColor: "#FF7A00",
            },
            headerTitleAlign: "center",
            headerTintColor: "#ffffff",
            headerTitleStyle: {
                fontFamily: "Kanit-SemiBold",
                fontSize: 24,
            },
            headerLeft: () => (
                <BackScreen onPress={() => navigation.goBack()} color="white" />
            ),
            headerRight: () => (
                <View style={{ marginRight: "20%" }}>
                    <Fav />
                </View>
            ),
        });
        fetchRestaurants();
    }, []);

    useEffect(() => {
        if (searchQuery) {
            setIsLoading(true);
            const delayDebounceFn = setTimeout(async () => {
                try {
                    const response = await axios.get(
                        `http://${IP_ADDRESS}/restaurant/search_restaurant?keyword=${searchQuery}`
                    );
                    const data = response.data.results;
                    setRestaurants(data);
                    setIsLoading(false);
                } catch (error) {
                    console.error(error);
                    setIsLoading(false);
                }
            }, 1000);

            return () => clearTimeout(delayDebounceFn);
        } else {
            fetchRestaurants();
        }
    }, [searchQuery]);

    const onPressCardMarket = (restaurant) => {
        navigation.navigate("FoodList", { restaurant: restaurant });
    };
    const onSearchBoxChange = (text) => {
        // console.log(text);
        setSearchQuery(text);
    };
    const fetchRestaurants = () => {
        setIsLoading(true);
        axios
            .get(`http://${IP_ADDRESS}/restaurant/all_restaurant`)
            .then((res) => {
                // console.log(res.data.restaurantData);
                setRestaurants(res.data.restaurantData);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    //ของจริงใช้ fetch ข้อมูลจาก backend
    const exampleData = [
        {
            id: 1,
            restaurantName: "ร้านป้านิด",
            description: "ร้านป้านิดสุดอร่อย",
            tags: ["ตามสั่ง"],
            address: "address01",
            rating: 4,
            owner: "testuser01@gmail.com",
        },
        {
            id: 2,
            restaurantName: "ร้านป้าหน่อย",
            description: "ร้านป้านิดสุดอร่อย",
            tags: ["ตามสั่ง"],
            address: "address01",
            rating: 4,
            owner: "testuser01@gmail.com",
        },
        {
            id: 3,
            restaurantName: "ร้านป้าไหน",
            description: "ร้านป้านิดสุดอร่อย",
            tags: ["ตามสั่ง"],
            address: "address01",
            rating: 4,
            owner: "testuser01@gmail.com",
        },
        {
            id: 4,
            restaurantName: "ร้านป้านิด",
            description: "ร้านป้านิดสุดอร่อย",
            tags: ["ตามสั่ง"],
            address: "address01",
            rating: 4,
            owner: "testuser01@gmail.com",
        },
        {
            id: 5,
            restaurantName: "ร้านป้านิด",
            description: "ร้านป้านิดสุดอร่อย",
            tags: ["ตามสั่ง"],
            address: "address01",
            rating: 4,
            owner: "testuser01@gmail.com",
        },
        {
            id: 6,
            restaurantName: "ร้านป้านิด",
            description: "ร้านป้านิดสุดอร่อย",
            tags: ["ตามสั่ง", "ของหวาน"],
            address: "address01",
            rating: 4,
            owner: "testuser01@gmail.com",
        },
    ];
    let allTags = [
        { tag: "ของคาว", source: require("../../assets/icons/fast-food.png") },
        {
            tag: "้เครื่องดื่ม",
            source: require("../../assets/icons/drink.png"),
        },
        { tag: "ของหวาน", source: require("../../assets/icons/dessert.png") },
    ];

    return (
        <View style={{ flex: 1 }}>
            <View style={{ marginTop: 18, marginLeft: "7%" }}>
                <AddressBox />
            </View>
            <View
                style={{
                    width: "100%",
                    alignItems: "center",
                    marginVertical: 10,
                }}
            >
                <Searchbar height="55" onSearchBoxChange={onSearchBoxChange} />
            </View>

            <View>
                <Text style={styles.TagsText}>หมวดหมู่</Text>
                <View style={{}}>
                    <FlatList
                        data={allTags}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={{}} onPress={() => {}}>
                                <CardRestaurantTag
                                    tagName={item.tag}
                                    imgSrc={item.source}
                                />
                            </TouchableOpacity>
                        )}
                        horizontal={true}
                    />
                </View>
            </View>
            <View style={styles.tick}></View>
            {isLoading ? (
                <ActivityIndicator />
            ) : (
                <View style={{ flex: 1 }}>
                    {restaurants ? (
                        <View>
                            <FlatList
                                style={{ paddingTop: 10 }}
                                data={restaurants}
                                renderItem={({ item }) => (
                                    <CardMarket
                                        restaurant={item}
                                        onPressCard={onPressCardMarket}
                                    />
                                )}
                            />
                        </View>
                    ) : (
                        <View>
                            <Text>Now Loadding</Text>
                        </View>
                    )}
                </View>
            )}
        </View>
    );
};

export default MarketList;

const styles = StyleSheet.create({
    headerTitle: {
        color: "white",
        fontFamily: "Kanit-Bold",
        fontSize: 28,
    },
    headerStyle: {
        backgroundColor: "#FF7A00",
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "#FF7A00",
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.9,
        shadowRadius: 10,
    },
    TagsText: {
        fontSize: 22,
        fontFamily: "Kanit-Bold",
        marginLeft: "7%",
        margin: 8,
        marginBottom: 16,
    },
    cardMarket: {
        padding: 10,
        borderColor: "darkblue",
        borderWidth: 1,
        margin: 5,
        marginBottom: 10,
        borderRadius: 20,
    },
    tick: { height: 4, backgroundColor: "#DFDFDF" },
});

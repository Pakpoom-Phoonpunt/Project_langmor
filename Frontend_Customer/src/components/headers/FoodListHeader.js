import { ImageBackground, StyleSheet, Text, View } from "react-native";
import React from "react";
import Back from "../buttons/Back";
import Fav from "../buttons/Fav";

const FoodListHeader = (props) => {
    const {
        imgSrc,
        handlerOnPressBack,
        isFav = false,
        onPressFav,
        disableFav,
    } = props;
    const imgLink =
        "https://bk.asia-city.com/sites/default/files/u142691/burger_fb.jpg";
    return (
        <View style={{ width: "100%", height: 190 }}>
            <ImageBackground
                source={{
                    uri: imgSrc ? `${imgSrc.url}` : null,
                }}
                resizeMode="cover"
                style={{
                    flex: 1,
                    flexDirection: "row",
                    backgroundColor: "#FF7A00",
                }}
            >
                <View style={{ marginTop: 6, marginLeft: "2.2%" }}>
                    <Back handlerOnPressBack={handlerOnPressBack} />
                </View>
                <View
                    style={{
                        marginLeft: "auto",
                        marginTop: 6,
                        marginRight: "2.2%",
                    }}
                >
                    <Fav
                        isFav={isFav}
                        onPress={onPressFav}
                        disable={disableFav}
                    />
                </View>
            </ImageBackground>
        </View>
    );
};

export default FoodListHeader;

const styles = StyleSheet.create({});

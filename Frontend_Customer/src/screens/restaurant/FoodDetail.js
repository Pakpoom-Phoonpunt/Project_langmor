import { ScrollView, StyleSheet, Text, View } from "react-native";
import BasketContext from "../../hooks/context/BasketContext";
import React, { useContext, useEffect, useMemo, useState } from "react";
import FoodDetailHeader from "../../components/headers/FoodDetailHeader";
import RadioSetBtn from "../../components/buttons/RadioSetBtn";
import CheckBoxSetBtn from "../../components/buttons/CheckBoxSetBtn";
import MoreDetailCard from "../../components/cards/MoreDetailCard";
import SubmitBtn from "../../components/buttons/SubmitBtn";

const FoodDetail = ({ route, navigation }) => {
    const { basketDetail, setBasketDetail } = useContext(BasketContext);
    const { food, restaurant } = route.params;
    const [isAllInputsFilled, setIsAllInputsFilled] = useState(false);
    const [number, setNumber] = useState(1);
    const [moreDetail, setMoreDetail] = useState(null);
    const [price, setPrice] = useState(food.price);
    const foodOption = [
        {
            name: "ความหวาน",
            option: [
                { optName: "หวานน้อย", increasePrice: 0 },
                { optName: "หวานมาก", increasePrice: 10 },
                { optName: "หวานปกติ", increasePrice: 20 },
            ],
            requireFill: true,
            IsRadio: true,
        },
        {
            name: "ความเผ็ด",
            option: [
                { optName: "เผ็ดน้อย", increasePrice: 0 },
                { optName: "เผ็ดมาก", increasePrice: 10 },
                { optName: "เผ็ดปกติ", increasePrice: 20 },
            ],
            requireFill: true,
            IsRadio: true,
        },
        {
            name: "ความร้อน",
            option: [
                { optName: "ร้อนน้อย", increasePrice: 0 },
                { optName: "ร้อนมาก", increasePrice: 10 },
                { optName: "ร้อนปกติ", increasePrice: 20 },
            ],
            requireFill: false,
            IsRadio: true,
        },
        {
            name: "ความเปรี้ยว",
            option: [
                { optName: "เปรี้ยวน้อย", increasePrice: 0 },
                { optName: "เปรี้ยวมาก", increasePrice: 10 },
                { optName: "เปรี้ยวปกติ", increasePrice: 20 },
            ],
            requireFill: false,
            IsRadio: false,
        },
        {
            name: "ความขม",
            option: [
                { optName: "ขมน้อย", increasePrice: 0 },
                { optName: "ขมมาก", increasePrice: 10 },
                { optName: "ขมปกติ", increasePrice: 20 },
            ],
            requireFill: true,
            IsRadio: false,
        },
    ];
    const [confirmOption, setConfirmOption] = useState(() => {
        let array = [];
        foodOption.forEach((option) => {
            if (option.requireFill) {
                array.push({
                    name: option.name,
                    needCheck: true,
                    value: null,
                    increasePrice: 0,
                });
            } else {
                array.push({
                    name: option.name,
                    needCheck: false,
                    value: null,
                    increasePrice: 0,
                });
            }
        });
        return array;
    });

    const handlerOnRadioChangeVal = (data) => {
        const index = confirmOption.findIndex((option) => {
            return option.name === data.name;
        });

        setConfirmOption((prevValue) => {
            const newArr = [...prevValue];
            if (index !== -1 && data.value) {
                newArr[index] = {
                    name: newArr[index].name,
                    needCheck: false,
                    value: data.value,
                    increasePrice: data.price,
                };
                setPrice((prevPrice) => {
                    return (
                        prevPrice + data.price - prevValue[index].increasePrice
                    );
                });
            }
            return newArr;
        });
    };

    const handlerOnCheckBoxChangeVal = (data) => {
        const index = confirmOption.findIndex((option) => {
            return option.name === data.name;
        });

        setConfirmOption((prevValue) => {
            const newArr = [...prevValue];
            if (index !== -1) {
                newArr[index] = {
                    name: newArr[index].name,
                    // ตรงนี้ต้อง Check ตามจำนวนที่ Required มาอีกที😒😒
                    needCheck: false,
                    value: data.value,
                    increasePrice: data.price,
                };
                if (prevValue[index].increasePrice.length > data.price.length) {
                    setPrice((prevPrice) => {
                        const sumDiffPrice = prevValue[index].increasePrice
                            .filter((x) => !data.price.includes(x))
                            .reduce(
                                (partialSum, price) => partialSum + price,
                                0
                            );
                        return prevPrice - sumDiffPrice;
                    });
                } else {
                    setPrice((prevPrice) => {
                        const sumDiffPrice = data.price
                            .filter(
                                (x) =>
                                    !prevValue[index].increasePrice.includes(x)
                            )
                            .reduce(
                                (partialSum, price) => partialSum + price,
                                0
                            );
                        return prevPrice + sumDiffPrice;
                    });
                }
            }

            return newArr;
        });
    };

    // useEffect(() => {
    //     console.log(confirmOption);
    // }, [confirmOption]);

    useEffect(() => {
        console.log(basketDetail);
    }, [basketDetail]);
    const handleOnPressSubmit = () => {
        setBasketDetail((prevDetail) => {
            const newDetail = { ...prevDetail };
            const foodData = {
                id: prevDetail.foods.length,
                food: food,
                options: confirmOption,
                moreDetail: moreDetail,
                amount: number,
            };
            newDetail.restaurant = restaurant;
            newDetail.foods.push(foodData);
            return newDetail;
        });
        navigation.goBack();
    };

    const handlerOnPressBack = () => {
        navigation.goBack();
    };
    return (
        <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
            <FoodDetailHeader
                imgSrc={food.imgLink}
                handlerOnPressBack={handlerOnPressBack}
            />
            <View style={{ backgroundColor: "#FFFFFF", flexDirection: "row" }}>
                <View style={{ marginLeft: "5.33%", marginTop: 14 }}>
                    <Text style={styles.foodNameText}>{food.name}</Text>
                    <View style={{ marginBottom: 11, marginTop: 10 }}>
                        <Text style={styles.detailText}>{food.detail}</Text>
                    </View>
                </View>

                <Text style={styles.foodPrice}>{price * number} B.</Text>
            </View>

            <ScrollView>
                <View
                    style={{
                        paddingBottom: 80,
                        backgroundColor: "#FFFFFF",
                    }}
                >
                    {/* Check this food have option */}
                    {foodOption.length !== 0
                        ? foodOption.map((option) => {
                              return (
                                  <View
                                      style={styles.cardRadioSet}
                                      key={option.name}
                                  >
                                      <View
                                          style={{
                                              height: 7,
                                              backgroundColor: "#DFDFDF",
                                          }}
                                      ></View>
                                      <View style={styles.optionNameContainer}>
                                          <Text style={styles.optionNameText}>
                                              {option.name}
                                          </Text>
                                      </View>
                                      <View
                                          style={styles.optionChoiceContainer}
                                      >
                                          {/* Check option is Radio or CheckBox */}
                                          {option.IsRadio ? (
                                              <RadioSetBtn
                                                  option={option}
                                                  handlerOnRadioChangeVal={
                                                      handlerOnRadioChangeVal
                                                  }
                                              />
                                          ) : (
                                              <CheckBoxSetBtn
                                                  option={option}
                                                  handlerOnCheckBoxChangeVal={
                                                      handlerOnCheckBoxChangeVal
                                                  }
                                              />
                                          )}
                                      </View>
                                  </View>
                              );
                          })
                        : null}
                    <View
                        style={{
                            height: 7,
                            backgroundColor: "#DFDFDF",
                        }}
                    ></View>
                    <MoreDetailCard
                        number={number}
                        setNumber={setNumber}
                        moreDetail={moreDetail}
                        setMoreDetail={setMoreDetail}
                    />
                </View>
            </ScrollView>

            <View style={styles.addItemBtn}>
                <SubmitBtn
                    label={"เพิ่มลงตะกล้า"}
                    onPress={handleOnPressSubmit}
                />
            </View>
        </View>
    );
};

export default FoodDetail;

const styles = StyleSheet.create({
    detailText: {
        fontSize: 14,
        fontFamily: "Kanit-Bold",
        color: "#9D9693",
    },
    foodNameText: {
        fontSize: 22,
        fontFamily: "Kanit-Bold",
    },
    addItemBtn: {
        width: "89.33%",
        height: 46,
        marginBottom: 20,

        alignSelf: "center",
        bottom: 0,
    },
    cardRadioSet: {
        backgroundColor: "#FFFFFF",
    },
    optionNameContainer: {
        marginLeft: "6%",
        marginTop: 10,
        marginBottom: 5,
    },
    optionNameText: {
        fontFamily: "Kanit-Bold",
        fontSize: 14,
    },
    optionChoiceContainer: {
        width: "80%",
        alignSelf: "center",
        paddingBottom: 12,
    },
    foodPrice: {
        marginLeft: "auto",
        alignSelf: "center",
        marginRight: "5.33%",
        color: "#FF7A00",
        fontSize: 20,
        fontFamily: "Kanit-Bold",
    },
});

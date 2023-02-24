//packages
import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import * as LIP from "../../lib/lm-image-picker";
//components
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    Button,
    FlatList,
} from "react-native";
import BackScreen from "../../components/buttons/BackScreen";
import ChatInput from "../../components/cards/Chat/ChatInput";
import MessageModel from "../../components/cards/Chat/MessageModel";
import OrderMesssage from "../../components/cards/Chat/OrderMesssage";
//configs
import BasketContext from "../../hooks/context/BasketContext";
import UserContext from "../../hooks/context/UserContext";
import SocketContext from "../../hooks/context/SocketContext";
import { IP_ADDRESS } from "@env";

const Chat = ({ navigation, route }) => {
    //config
    const { basketDetail } = useContext(BasketContext);
    const { state } = useContext(UserContext);
    const { socket } = useContext(SocketContext);
    const inputRef = useRef(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const scrollViewRef = useRef(null);
    //data
    const { orderData, restaurantData } = route.params;
    //messages
    const [listMessages, setListMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [image, setImage] = useState(null);

    useEffect(() => {
        navigation.setOptions({
            title: `${restaurantData.name}`,
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
        // Functions
        fetchInitialMessages();
    }, []);

    useEffect(() => {
        chatroom_connect(orderData._id);
    }, [socket]);

    useEffect(() => {
        if (socket) {
            socket.on("newMessage", (data) => {
                const { id, user, message, timestamp, picture } = data;
                const renew_message = {
                    id,
                    user,
                    message,
                    timestamp,
                    picture,
                };
                setListMessages([...listMessages, renew_message]);
            });
        }
        scrollViewRef.current?.scrollToEnd({ animated: true });
    }, [listMessages]);

    const chatroom_connect = (chatroom_id) => {
        if (socket) {
            socket.emit("joinRoom", {
                chatroom: chatroom_id,
            });
        }
    };

    const chatroom_disconnect = (chatroom_id) => {
        if (socket) {
            socket.emit("leaveRoom", {
                chatroom: chatroom_id,
            });
        }
    };

    const closeChatroom = async () => {
        axios
            .post(`http://${IP_ADDRESS}/chatroom/closed`, {
                chatroomId: null,
            })
            .then((res) => {
                console.log(res.data.message);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const sendMessage = (message, picture) => {
        if (socket) {
            socket.emit("chatroomMessage", {
                chatroomId: orderData._id,
                message: message,
                picture: picture,
            });
        }
        setMessage("");
    };

    const fetchInitialMessages = () => {
        axios
            .get(
                `http://${IP_ADDRESS}/chatroom/messages?chatroomId=${orderData._id}`
            )
            .then((res) => {
                // console.log(res.data.messages)
                setListMessages(res.data.messages);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleSendMessage = () => {
        setIsLoaded(true);
        if (image) {
            LIP.handleUpload(image, state.userData._id)
                .then((data) => {
                    sendMessage(message, data);
                    setImage(null);
                    setIsLoaded(false);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            sendMessage(message, null);
        }
        inputRef.current.clear();
    };

    const handleImagePick = () => {
        LIP.pickImage()
            .then((data) => {
                setImage(data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleCamera = () => {
        LIP.openCamera()
            .then((data) => {
                setImage(data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleDebugger = () => {
        console.log(basketDetail.foods);
    };

    return (
        <View style={styles.main_container}>
            {/* <Button onPress={handleDebugger} title="Debugger" /> */}
            <View style={styles.messages_container}>
                {listMessages[0] ? (
                    <ScrollView ref={scrollViewRef}>
                        <View style={styles.orderPopup}>
                            <OrderMesssage order={basketDetail.foods} />
                        </View>
                        {listMessages.map((item, index) => (
                            <MessageModel
                                key={index}
                                message={item}
                                userId={state.userData._id}
                            />
                        ))}
                    </ScrollView>
                ) : (
                    ""
                )}
            </View>
            <ChatInput
                forwardedRef={inputRef}
                onChangeText={(value) => setMessage(value)}
                sendOnPress={handleSendMessage}
                pictureOnPress={handleImagePick}
                cameraOnPress={handleCamera}
            />
        </View>
    );
};

export default Chat;

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
    },
    messages_container: {
        margin: 5,
        flex: 10,
    },
    orderPopup: {
        marginHorizontal: "10%",
    },
});

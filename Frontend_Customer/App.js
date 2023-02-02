import "react-native-gesture-handler";
import { useEffect, useMemo, useReducer, useState } from "react";
import UserContext from "./src/hooks/context/UserContext";
import SocketContext from "./src/hooks/context/SocketContext";
import { NavigationContainer } from "@react-navigation/native";
import MyStack from "./src/config/routes";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

export default function App() {
    const [fontsLoaded] = useFonts({
        "Kanit-Bold": require("./src/assets/fonts/Kanit-Bold.ttf"),
        "Kanit-Medium": require("./src/assets/fonts/Kanit-Medium.ttf"),
        "Kanit-SemiBold": require("./src/assets/fonts/Kanit-SemiBold.ttf"),
    });
    const [socket, setSocket] = useState(null);
    const reducer = (prevState, action) => {
        switch (action.type) {
            case "SIGN_IN":
                console.log(`🟢: ${action.user.given_name} Sign In`);
                return {
                    isSignin: true,
                    userData: action.user,
                    token: action.token,
                };

            case "SIGN_OUT":
                console.log(`🔴: ${prevState.userData.given_name} Sign Out`);
                return {
                    // ...prevState,
                    isSignin: false,
                    userData: null,
                    token: null,
                };
        }
    };
    const [state, dispatch] = useReducer(reducer, {
        isSignin: false,
        userData: null,
        token: null,
    });

    const onAction = useMemo(
        () => ({
            signIn: async ({ user, token }) => {
                return dispatch({ type: "SIGN_IN", user: user, token: token });
            },
            signOut: () => {
                return dispatch({ type: "SIGN_OUT" });
            },
        }),
        []
    );
    useEffect(() => {
        async function prepare() {
            await SplashScreen.preventAutoHideAsync();
        }
        prepare();
    }, []);

    if (!fontsLoaded) {
        return undefined;
    } else {
        SplashScreen.hideAsync();
    }
    return (
        <SocketContext.Provider value={{ socket, setSocket }}>
            <UserContext.Provider value={{ onAction, state }}>
                <NavigationContainer>
                    <MyStack />
                </NavigationContainer>
            </UserContext.Provider>
        </SocketContext.Provider>
    );
}

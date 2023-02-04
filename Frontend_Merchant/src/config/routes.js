// Packages
import { createStackNavigator } from "@react-navigation/stack";
// Hooks
import { useContext } from "react";
import UserContext from "../hooks/context/UserContext";
// Screens
import Login from "../screens/Login";
import Home from "../screens/Home";
import SetRestaurant from "../screens/Introductions/SetRestaurant";
import HomeManage from "../screens/HomeManage";
import Congrat from "../screens/Introductions/Congrat";
// Configs
const Stack = createStackNavigator();

function MyStack({}) {
    const { state } = useContext(UserContext);
    return (
        <Stack.Navigator
            screenOptions={{
                // headerStyle: { elevation: 0 },
                cardStyle: { backgroundColor: "#F5F5F5" },
            }}
        >
            {state.userData ? (
                <>
                    {state.userData.have_restaurant ? (
                        <>
                            <Stack.Screen
                                name="HomeManage"
                                component={HomeManage}
                                options={{ headerShown: false }}
                            />
                        </>
                    ) : (
                        <>
                            <Stack.Screen
                                name="Home"
                                component={Home}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="SetRestaurant"
                                component={SetRestaurant}
                            />
                            <Stack.Screen
                                name="Congrat"
                                component={Congrat}
                                options={{ headerShown: false }}
                            />
                        </>
                    )}
                </>
            ) : (
                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{ headerShown: false }}
                />
            )}
        </Stack.Navigator>
    );
}

export default MyStack;

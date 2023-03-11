import { useContext } from "react";
import UserContext from "../hooks/context/UserContext";
//navigation
import { createStackNavigator } from "@react-navigation/stack";
import HomePageHeader from "../components/HomePageHeader";
//screens
import Login from "../screens/Login";
import MarketList from "../screens/restaurant/MarketList";
import FoodList from "../screens/restaurant/FoodList";
import FoodDetail from "../screens/restaurant/FoodDetail";
import Cart from "../screens/restaurant/Cart";
import Chat from "../screens/Chat/Chat";
import Chat2 from "../screens/Chat/Chat2";
import ShowOrder from "../screens/restaurant/ShowOrder";
import AddSecond from "../screens/SecondHand/AddSecond";
import AddLost from "../screens/LostItems/AddLost";
import ChatContact from "../screens/Chat/ChatContact";
import SecondDetail from "../screens/SecondHand/SecondDetail";
import LostDetail from "../screens/LostItems/LostDetail";
import Report from "../screens/Options/Report";
//Tabs
import TapStackRoutes from "./TapStackRoutes";
import SecondTabs from "./Tabs/SecondTabs";
import LostTabs from "./Tabs/LostTabs";
import ChatTabs from "./Tabs/ChatTabs";
//config
const Stack = createStackNavigator();

const MyStack = ({}) => {
    const { state } = useContext(UserContext);
    return (
        <Stack.Navigator
            screenOptions={{
                cardStyle: { backgroundColor: "#F5F5F5" },
            }}
        >
            {state.userData ? (
                <>
                    <Stack.Screen
                        name="TapStackRoutes"
                        component={TapStackRoutes}
                        options={{ headerShown: false }}
                        // options={{
                        //     title: `สวัสดีคุณ ${
                        //         state.isSignin ? state.userData.name : "Loading"
                        //     }`,
                        //     headerRight: () => <HomePageHeader />,
                        //     headerTitleStyle: {
                        //         fontFamily: "Kanit-Bold",
                        //     },
                        // }}
                    />
                    <Stack.Screen name="MarketList" component={MarketList} />
                    <Stack.Screen
                        name="FoodList"
                        component={FoodList}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="FoodDetail"
                        component={FoodDetail}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen name="Cart" component={Cart} />
                    <Stack.Screen name="Chat" component={Chat} />
                    <Stack.Screen name="Chat2" component={Chat2} />
                    <Stack.Screen name="ShowOrder" component={ShowOrder} />
                    <Stack.Screen name="SecondTabs" component={SecondTabs} />
                    <Stack.Screen name="AddSecond" component={AddSecond} />
                    <Stack.Screen name="LostTabs" component={LostTabs} />
                    <Stack.Screen name="AddLost" component={AddLost} />
                    <Stack.Screen name="ChatTabs" component={ChatTabs} />
                    <Stack.Screen name="ChatContact" component={ChatContact} />
                    <Stack.Screen
                        name="SecondDetail"
                        component={SecondDetail}
                    />
                    <Stack.Screen name="LostDetail" component={LostDetail} />
                    <Stack.Screen name="Report" component={Report} />
                </>
            ) : (
                <>
                    <Stack.Screen name="Login" component={Login} />
                </>
            )}
        </Stack.Navigator>
    );
};

export default MyStack;

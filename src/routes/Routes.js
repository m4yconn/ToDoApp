import { createNativeStackNavigator } from "@react-navigation/native-stack";
import InitialPage from "../screens/InitialPage";
import Login from "../screens/Login";
import Register from "../screens/Register";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import RecoveryPass from "../screens/RecoveryPass";


const Stack = createNativeStackNavigator()


export default function Routes(){
    return(
        <Stack.Navigator>

            <Stack.Screen
                name="Home"
                component={Home}
                options={{headerShown: false}}
            />

            <Stack.Screen
                name="InitialPage"
                component={InitialPage}
                options={{headerShown: false}}
            />

            <Stack.Screen
                name="Login"
                component={Login}
                options={{headerShown: false}}
            />

            <Stack.Screen
                name="Register"
                component={Register}
                options={{headerShown: false}}
            />


            <Stack.Screen
                name="Profile"
                component={Profile}
                options={{headerShown: false}}
            />

            <Stack.Screen
                name="Recovery"
                component={RecoveryPass}
                options={{headerShown: false}}
            />


        </Stack.Navigator>
    )
}



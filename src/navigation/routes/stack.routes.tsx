import { useTheme } from "@rneui/themed";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Posts from "../../navigation/screens/Posts";
import Home from "../../navigation/screens/Home";
import Login from "../../navigation/screens/Login";

const Stack = createNativeStackNavigator();

export default function StackRoutes() {
    const { theme } = useTheme();

    return (
        <Stack.Navigator screenOptions={{
            headerStyle: { backgroundColor: theme.colors.background },
            contentStyle: { backgroundColor: theme.colors.background },
            headerTitleAlign: 'center',
            headerTitleStyle: { color: theme.colors.black },
            headerTintColor: theme.colors.black,
        }}>
            <Stack.Screen name="Home" component={Home} options={{ title: "Home" }} />
            <Stack.Screen name="Posts" component={Posts} options={{ title: "Publicações" }} />
            <Stack.Screen name="Login" component={Login} options={{ title: "Login" }} />
        </Stack.Navigator>
    )
}
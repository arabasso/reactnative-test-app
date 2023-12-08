import { useTheme } from "@rneui/themed";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../../navigation/screens/Home";
import Login from "../../navigation/screens/Login";
import PostsList from "../screens/Posts/List";
import PostsDetails from "../screens/Posts/Details";

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
            <Stack.Screen name="PostsList" component={PostsList} options={{ title: "Publicações" }} />
            <Stack.Screen name="PostsDetails" component={PostsDetails} options={{ title: "Publicações" }} />
            <Stack.Screen name="Login" component={Login} options={{ title: "Login" }} />
        </Stack.Navigator>
    )
}
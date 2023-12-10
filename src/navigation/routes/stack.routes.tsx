import { useTheme } from "@rneui/themed";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "@screens/Home";
import PostsList from "@screens/Posts/List";
import PostsDetails from "@screens/Posts/Details";
import UsersList from "@screens/Users/List";
import UsersDetails from "@screens/Users/Details";

const Stack = createNativeStackNavigator();

export default function StackRoutes() {
    const { theme } = useTheme();

    return (
        <Stack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: theme.colors.background
            },
            contentStyle: {
                backgroundColor: theme.colors.background
            },
            headerTitleAlign: "center",
            headerTitleStyle: {
                color: theme.colors.black
            },
            headerTintColor: theme.colors.black,
        }}>
            <Stack.Screen name="Home" component={Home} options={{ title: "Home" }} />
            <Stack.Screen name="PostsList" component={PostsList} options={{ title: "Publicações" }} />
            <Stack.Screen name="PostsDetails" component={PostsDetails} options={{ title: "Detalhes" }} />
            <Stack.Screen name="UsersList" component={UsersList} options={{ title: "Usuários" }} />
            <Stack.Screen name="UsersDetails" component={UsersDetails} options={{ title: "Detalhes" }} />
        </Stack.Navigator>
    )
}
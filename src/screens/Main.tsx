import React, { Fragment, useEffect, useState } from "react";
import { StatusBar, StatusBarStyle, View } from "react-native";
import { Colors, Theme, useTheme } from "@rneui/themed";
import { Appearance } from 'react-native';
import Home from "../navigation/screens/Home";
import { NativeStackNavigationOptions, createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "../navigation/screens/Login";

const Stack = createNativeStackNavigator();

const Main = () => {
    const { theme } = useTheme();
    const [barStyle, setBarStyle] = useState<StatusBarStyle>(theme.mode === "light" ? "dark-content" : "light-content");
    const stackOptions = useNavigatorStackOptions(theme.colors);

    useEffect(() => { Appearance.addChangeListener(listener => setBarStyle(listener.colorScheme === "light" ? "dark-content" : "light-content")) }, []);

    return (
        <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
            <StatusBar barStyle={barStyle} backgroundColor={theme.colors.background} />
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Home" screenOptions={stackOptions}>
                    <Stack.Screen name="Home" component={Home} />
                    <Stack.Screen name="Login" component={Login} />
                </Stack.Navigator>
            </NavigationContainer>
        </View>
    );
}

const useNavigatorStackOptions = (colors: Colors): NativeStackNavigationOptions => {
    return {
        headerStyle: { backgroundColor: colors.background,  },
        headerTitleStyle: { color: colors.black },
        headerTintColor: colors.black,
    }
}

export default Main;
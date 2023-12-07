import React, { useEffect, useState } from "react";
import { StatusBar, StatusBarStyle, View } from "react-native";
import { Colors, useTheme } from "@rneui/themed";
import { Appearance } from 'react-native';
import { NativeStackNavigationOptions, createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Menu from "./Menu";

const Stack = createNativeStackNavigator();

export default function Main() {
    const { theme } = useTheme();
    const [barStyle, setBarStyle] = useState<StatusBarStyle>(theme.mode === "light" ? "dark-content" : "light-content");
    const stackOptions = useNavigatorStackOptions(theme.colors);

    useEffect(() => { Appearance.addChangeListener(listener => setBarStyle(listener.colorScheme === "light" ? "dark-content" : "light-content")) }, []);

    return (
        <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
            <StatusBar barStyle={barStyle} backgroundColor={theme.colors.background} />
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Menu" screenOptions={stackOptions}>
                    <Stack.Screen name="Menu" component={Menu} />
                </Stack.Navigator>
            </NavigationContainer>
        </View>
    );
}

function useNavigatorStackOptions(colors: Colors): NativeStackNavigationOptions {
    return {
        headerStyle: { backgroundColor: colors.background },
        headerTitleStyle: { color: colors.black },
        headerTintColor: colors.black,
        headerShown: false,
    }
}

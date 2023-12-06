import React, { useState } from "react";
import { StatusBar, StatusBarStyle, View, useColorScheme } from "react-native";
import { makeStyles, Text, Button, useThemeMode, useTheme } from "@rneui/themed";

export default function Home() {
    const styles = useStyles();
    const colorScheme = useColorScheme();

    const { theme } = useTheme();
    const { setMode, mode } = useThemeMode();
    const [ barStyle, setBarStyle ] = useState<StatusBarStyle>(colorScheme === "light" ? "dark-content" : "light-content");

    const handleOnPress = () => {
        setMode(mode === "dark" ? "light" : "dark");
        setBarStyle(mode === "dark" ? "dark-content" : "light-content");
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle={barStyle} backgroundColor={theme.colors.background} />
            <Text h3>Start Using RNE</Text>
            <Text style={styles.text}>
                Open up App.tsx to start working on your app!
            </Text>
            <Button onPress={handleOnPress}>Switch Theme</Button>
        </View>
    );
}

const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        marginVertical: theme.spacing.lg,
    },
}));
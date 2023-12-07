import React from "react";
import { View } from "react-native";
import { Button, makeStyles, Text } from "@rneui/themed";

export default function Home ({ navigation } : any) {
    const styles = useStyles();

    return (
        <View style={styles.container}>
            <Text h3>
                Página Inicial
            </Text>
        </View>
    )
};

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

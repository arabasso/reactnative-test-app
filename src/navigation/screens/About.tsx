import React from "react";
import { View } from "react-native";
import { makeStyles, Text } from "@rneui/themed";

export default function About ({ navigation } : any) {
    const styles = useStyles();

    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                Todos os direitos reservados.
            </Text>
        </View>
    )
};

const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        marginVertical: theme.spacing.lg,
    },
}));

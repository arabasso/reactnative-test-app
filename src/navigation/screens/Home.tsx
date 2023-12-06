import React from "react";
import { View } from "react-native";
import { Button, makeStyles, Text } from "@rneui/themed";

const Home = ({ navigation } : any) => {
    const styles = useStyles();

    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                Página Inicial
            </Text>
            <Button title="Login" onPress={() => navigation.navigate('Login')} />
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

export default Home;
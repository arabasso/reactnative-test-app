import { useContext } from "react";
import { View } from "react-native";
import { makeStyles, Text } from "@rneui/themed";
import { AuthContext } from "@contexts/AuthContext";

export default function Profile({ navigation }: any) {
    const styles = useStyles();
    const { login } = useContext(AuthContext);

    return (
        <View style={styles.container}>
            <Text h4 style={styles.text}>
                {login?.firstName} {login?.lastName}
            </Text>

            <Text style={styles.text}>
                <Text style={styles.label}>Login: </Text>
                {login?.username}
            </Text>

            <Text style={styles.text}>
                <Text style={styles.label}>E-mail: </Text>
                {login?.email}
            </Text>

            <Text style={styles.text}>
                <Text style={styles.label}>Sexo: </Text>
                {login?.gender}
            </Text>
        </View>
    )
};

const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
        padding: 10,
    },
    text: {
        marginVertical: theme.spacing.lg,
    },
    label: {
        fontWeight: "bold",
    }
}));

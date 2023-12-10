import { View } from "react-native";
import { makeStyles, Text } from "@rneui/themed";
import { useAuth } from "@hooks/Auth";

export default function Profile() {
    const styles = useStyles();
    const { login } = useAuth();

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
        padding: theme.spacing.lg,
    },
    text: {
        marginVertical: theme.spacing.lg,
    },
    label: {
        fontWeight: "bold",
    }
}));

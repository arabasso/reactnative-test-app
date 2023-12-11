import { View, ScrollView } from "react-native";
import { makeStyles, Text } from "@rneui/themed";
import { useAuth } from "@hooks/Auth";

export default function Profile() {
    const styles = useStyles();
    const { login } = useAuth();

    return (
        <ScrollView style={{ flex: 1 }}>
            <View style={styles.container}>
                <Text h4>{login?.firstName} {login?.lastName}</Text>
                <Text><Text style={styles.label}>Login: </Text> {login?.username}</Text>
                <Text><Text style={styles.label}>E-mail: </Text> {login?.email}</Text>
                <Text><Text style={styles.label}>Sexo: </Text> {login?.gender}</Text>
            </View>
        </ScrollView>
    )
};

const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
        padding: theme.spacing.lg,
    },
    label: {
        fontWeight: "bold",
    }
}));

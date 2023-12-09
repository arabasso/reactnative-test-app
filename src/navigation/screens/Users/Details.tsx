import { useContext, useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { makeStyles, Text, Image, useTheme } from "@rneui/themed";
import { useRoute } from "@react-navigation/native";

import Loading from "@components/Loading";
import { BackendService } from "@services/BackendService";
import { UserService } from "@services/UserService";
import { AuthContext } from "@contexts/AuthContext";

export default function UsersDetails() {
    const styles = useStyles();
    const { theme } = useTheme();
    const route = useRoute();
    const { login } = useContext(AuthContext);

    const { id } = route.params as { id: number };

    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<User>({} as User);
    async function getPost() {
        const service = new BackendService("https://dummyjson.com/");
        const userService = new UserService(service, login?.token);

        const user = await userService.get(id);

        setUser(user);
        setIsLoading(false);
    }

    useEffect(() => { getPost(); }, []);

    if (isLoading) return (<Loading isLoading={isLoading} />);

    return (
        <ScrollView style={styles.container}>
            <View style={{ flex: 1, flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
                {user.image && <Image source={{ uri: user.image }} style={{ width: 40, height: 40, marginRight: 10 }} />}
                <View>
                    <Text h4 style={{ color: theme.colors.black }}>{user.firstName} {user.lastName}</Text>
                </View>
            </View>
            <Text>
                <Text style={styles.label}>Idade: </Text>
                {user.age}
            </Text>
            <Text>
                <Text style={styles.label}>Altura: </Text>
                {user.height} cm
            </Text>
            <Text>
                <Text style={styles.label}>Peso: </Text>
                {user.weight} KG
            </Text>
            <Text>
                <Text style={styles.label}>Sexo: </Text>
                {user.gender}
            </Text>
            <Text>
                <Text style={styles.label}>E-mail: </Text>
                {user.email}
            </Text>
            <Text>
                <Text style={styles.label}>Telefone: </Text>
                {user.phone}
            </Text>
        </ScrollView>
    );
}

const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
        padding: 10
    },
    label: {
        fontWeight: "bold",
    }
}));

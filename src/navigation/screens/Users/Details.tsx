import { useEffect, useState } from "react";
import { ScrollView, View, Image } from "react-native";
import { makeStyles, Text, useTheme } from "@rneui/themed";
import { useRoute } from "@react-navigation/native";

import { Loading } from "@components/Loading";
import { useApi } from "@hooks/Api";

export default function UsersDetails() {
    const styles = useStyles();
    const { theme } = useTheme();
    const route = useRoute();

    const { bearerUserService } = useApi();

    const { id } = route.params as { id: number };

    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<User>({} as User);
    async function getPost() {
        const user = await bearerUserService!.get(id);

        setUser(user);
        setIsLoading(false);
    }

    useEffect(() => { getPost(); }, []);

    if (isLoading) return (<Loading isLoading={isLoading} />);

    return (
        <ScrollView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={styles.title}>
                    {user.image && (
                        <Image source={{ uri: user.image }} style={{ width: 40, height: 40, marginRight: 10 }} />
                    )}
                    <View>
                        <Text h4 style={{ color: theme.colors.black }}>{user.firstName} {user.lastName}</Text>
                    </View>
                </View>
                <Text><Text style={styles.label}>Login: </Text> {user.username}</Text>
                <Text><Text style={styles.label}>Senha: </Text> {user.password}</Text>
                <Text><Text style={styles.label}>Idade: </Text> {user.age}</Text>
                <Text><Text style={styles.label}>Altura: </Text> {user.height} cm</Text>
                <Text><Text style={styles.label}>Peso: </Text> {user.weight} KG</Text>
                <Text><Text style={styles.label}>Sexo: </Text> {user.gender}</Text>
                <Text><Text style={styles.label}>E-mail: </Text> {user.email}</Text>
                <Text><Text style={styles.label}>Telefone: </Text> {user.phone}</Text>
            </View>
        </ScrollView>
    );
}

const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
        padding: theme.spacing.lg,
    },
    title: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: theme.spacing.lg,
    },
    label: {
        fontWeight: "bold",
    }
}));

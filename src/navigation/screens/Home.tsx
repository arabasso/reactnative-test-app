import { useContext, useEffect, useState } from "react";
import { View, FlatList, TouchableOpacity, ListRenderItemInfo } from "react-native";
import { makeStyles, Text, useTheme } from "@rneui/themed";
import { Icon } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "@contexts/AuthContext";

type HomeButton = {
    id: any;
    requiresLogin: boolean;
    icon: any;
    text: string;
    navigateTo: () => void | null;
}

const buttonColumns = 3;

export default function Home() {
    const { theme } = useTheme();
    const styles = useStyles();
    const navigation = useNavigation();
    const { isLogged } = useContext(AuthContext);

    const [botoes, setBotoes] = useState<HomeButton[]>([]);
    async function getBotoes() {
        let items = [
            {
                id: 1,
                requiresLogin: false,
                icon: <Icon type="font-awesome-5" name="edit" style={{ marginBottom: 10 }} color={theme.colors.foreground} />,
                text: 'Publicações',
                navigateTo: () => navigation.navigate("PostsList")
            },
            {
                id: 2,
                requiresLogin: true,
                icon: <Icon type="font-awesome-5" name="user" style={{ marginBottom: 10 }} color={theme.colors.foreground} />,
                text: 'Usuários',
                navigateTo: () => navigation.navigate("UsersList")
            },
        ];

        while (items.length % buttonColumns != 0) {
            items.push({} as HomeButton);
        }

        setBotoes(items);
    }

    useEffect(() => { getBotoes() }, []);

    function renderItem({ item }: ListRenderItemInfo<HomeButton>) {
        return (
            <View style={{ flex: 1, flexDirection: 'column', margin: 10 }}>
                {!item.id ? <></> :
                    item.requiresLogin && !isLogged ? <></> :
                        (
                            <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={item.navigateTo}>
                                {item.icon}
                                <Text style={{ color: theme.colors.foreground }}>{item.text}</Text>
                            </TouchableOpacity>
                        )
                }
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={botoes}
                renderItem={renderItem}
                numColumns={buttonColumns}
                keyExtractor={(item) => item.id}
            />
        </View>
    )
};

const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
        padding: 0,
        margin: 10,
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 90,
        backgroundColor: theme.colors.primary,
        borderRadius: 5,
    },
}));

import { useEffect, useState } from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import { makeStyles, Text, useTheme } from "@rneui/themed";
import { Icon } from "@rneui/base";

type Botao = {
    id: any;
    icon: any;
    text: string;
    screen: string;
}

export default function Home({ navigation }: any) {
    const { theme } = useTheme();
    const styles = useStyles();

    const columns = 3;

    const [botoes, setBotoes] = useState<Botao[]>([]);
    async function getBotoes() {
        let items = [
            {
                id: 1,
                icon: <Icon type="font-awesome-5" name="edit" style={{ marginBottom: 10 }} color={theme.colors.foreground} />,
                text: 'Publicações',
                screen: 'Posts'
            },
            {
                id: 2,
                icon: <Icon type="font-awesome-5" name="product-hunt" style={{ marginBottom: 10 }} color={theme.colors.foreground} />,
                text: 'Produtos',
                screen: 'Products'
            },
        ];

        while (items.length % columns != 0) {
            items.push({} as Botao);
        }

        setBotoes(items);
    }

    useEffect(() => { getBotoes() }, []);

    return (
        <View style={styles.container}>
            <FlatList
                data={botoes}
                renderItem={({ item }) => (
                    <View
                        style={{
                            flex: 1,
                            flexDirection: 'column',
                            margin: 10
                        }}>
                        {!item.id ? <Text></Text> :
                            <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={() => navigation.navigate(item.screen)}>
                                {item.icon}
                                <Text style={{ color: theme.colors.foreground }}>{item.text}</Text>
                            </TouchableOpacity>
                        }
                    </View>
                )}
                numColumns={columns}
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

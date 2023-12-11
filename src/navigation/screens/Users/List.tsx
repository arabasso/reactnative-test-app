import { useState } from "react";
import { FlatList, ListRenderItemInfo, TouchableOpacity, View, Image } from "react-native";
import { makeStyles, Text, useTheme } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";

import { Loading } from "@components/Loading";
import { useApi } from "@hooks/Api";

const itemsPerPage = 15;

export default function UsersList() {
    const { theme } = useTheme();
    const styles = useStyles();
    const navigation = useNavigation();

    const { bearerUserService } = useApi();

    const [hasMoreData, setHasMoreData] = useState(true);
    const [page, setPage] = useState(1);
    const [users, setUsers] = useState<User[]>([]);
    async function getPosts() {
        if (!hasMoreData) return;

        const skip = itemsPerPage * (page - 1);
        const limit = itemsPerPage;

        const result = await bearerUserService!.list(skip, limit);

        setUsers(prev => [...prev, ...result.users]);
        setPage(prev => prev + 1);

        if (result.total <= skip + limit) {
            setHasMoreData(false);
        }
    }

    function renderItem({ item }: ListRenderItemInfo<User>) {
        return (
            <TouchableOpacity key={item.id} activeOpacity={0.7} style={styles.user} onPress={() => detailsUser(item.id)}>
                <View style={{ flex: 1, flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
                    {item.image && <Image source={{ uri: item.image }} resizeMode="cover" style={{ width: 40, height: 40, marginRight: 10 }} />}
                    <Text h4 style={{ color: theme.colors.black }}>{item.firstName} {item.lastName}</Text>
                </View>
                <View style={{ flex: 1, flexDirection: "row", alignItems: "center", margin: 5 }}>
                    <Text style={{ color: theme.colors.grey2, flex: 1 }}>{item.email}</Text>
                    <Text style={{ color: theme.colors.grey2, flex: 1, textAlign: "right" }}>{item.phone}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    function detailsUser(id: number) {
        navigation.navigate("UsersDetails", { id: id });
    }

    return (
        <View style={styles.container}>
            <FlatList
                contentContainerStyle={{ padding: theme.spacing.lg }}
                data={users}
                renderItem={renderItem}
                ListFooterComponent={<Loading isLoading={hasMoreData} />}
                onEndReached={getPosts}
                onEndReachedThreshold={0.1}
                keyExtractor={(item) => item.id}
            />
        </View>
    )
};

const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
    },
    user: {
        backgroundColor: theme.colors.grey5,
        borderRadius: 5,
        padding: theme.spacing.lg,
        marginBottom: theme.spacing.lg,
    },
    tags: {
        flex: 1,
        flexDirection: "row",
    },
    tag: {
        marginTop: theme.spacing.lg,
        marginRight: theme.spacing.lg,
    },
}));

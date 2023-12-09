import React, { useState } from "react";
import { FlatList, ListRenderItemInfo, TouchableOpacity, View } from "react-native";
import { makeStyles, Text, useTheme } from "@rneui/themed";
import { Badge } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";

import Loading from "@components/Loading";

const itemsPerPage = 30;

export default function PostsList() {
    const { theme } = useTheme();
    const styles = useStyles();
    const navigation = useNavigation();

    const [hasMoreData, setHasMoreData] = useState(true);
    const [page, setPage] = useState(1);
    const [posts, setPosts] = useState<Post[]>([]);
    async function getPosts() {
        if (!hasMoreData) return;

        const skip = itemsPerPage * (page - 1);
        const limit = itemsPerPage;

        const result = await fetch(`https://dummyjson.com/posts?skip=${skip}&limit=${limit}`).then(t => t.json());

        setPosts(prev => [...prev, ...result.posts]);
        setPage(prev => prev + 1);

        if (result.total <= skip + limit) {
            setHasMoreData(false);
        }
    }

    function renderItem({ item }: ListRenderItemInfo<Post>) {
        return (
            <TouchableOpacity key={item.id} activeOpacity={0.7} style={styles.post} onPress={() => detailsPost(item.id)}>
                <Text style={{ color: theme.colors.black }}>{item.title}</Text>
                <View style={styles.tags}>
                    {item.tags.map((m, i) => <Badge key={i} badgeStyle={styles.tag} value={m} />)}
                </View>
            </TouchableOpacity>
        )
    }

    function detailsPost(id: number) {
        navigation.navigate('PostsDetails', { id: id });
    }

    return (
        <View style={styles.container}>
            <FlatList
                contentContainerStyle={{ padding: 10 }}
                data={posts}
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
    post: {
        backgroundColor: theme.colors.grey5,
        borderRadius: 5,
        padding: 5,
        margin: 5,
    },
    tags: {
        flex: 1,
        flexDirection: "row",
    },
    tag: {
        marginTop: 5,
        marginRight: 5,
    },
}));

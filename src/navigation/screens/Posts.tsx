import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, TouchableOpacity, View } from "react-native";
import { makeStyles, Text, useTheme } from "@rneui/themed";
import { Badge } from "@rneui/base";

type Post = {
    id: any;
    title: string;
    tags: string[];
}

type Result = {
    loading: boolean;
    items: Post[];
}

export default function Posts({ navigation }: any) {
    const { theme } = useTheme();
    const styles = useStyles();

    const [posts, setPosts] = useState<Result>({ loading: true, items: [] });
    async function getPosts() {
        const result = await fetch('https://dummyjson.com/posts').then(t => t.json());

        setPosts({ loading: false, items: result.posts });
    }

    useEffect(() => { getPosts(); }, []);

    return (
        <View style={styles.container}>
            {posts.loading ? <ActivityIndicator animating size={100} color={theme.colors.primary} /> :
                <FlatList
                    contentContainerStyle={{ padding: 10 }}
                    data={posts.items}
                    renderItem={({ item }) => (
                        <TouchableOpacity key={item.id} activeOpacity={0.7} style={styles.post}>
                            <Text style={{ color: theme.colors.black }}>{item.title}</Text>
                            <View style={styles.tags}>
                                {item.tags.map((m, i) => <Badge key={i} badgeStyle={styles.tag} value={m} />)}
                            </View>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item.id}
                    key="posts"
                />}
        </View>
    )
};

const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
        justifyContent: "center",
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
    }
}));

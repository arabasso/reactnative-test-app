import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { Badge, makeStyles, Text } from "@rneui/themed";
import { useRoute } from "@react-navigation/native";
import Loading from "../../../components/Loading";

export default function PostsDetails() {
    const styles = useStyles();
    const route = useRoute();

    const { id } = route.params as { id: number };

    const [isLoading, setIsLoading] = useState(true);
    const [post, setPost] = useState<Post>({} as Post);
    const [user, setUser] = useState<User>({} as User);
    async function getPost() {
        const post = await fetch(`https://dummyjson.com/posts/${id}`).then(t => t.json());
        const user = await fetch(`https://dummyjson.com/users/${post.userId}`).then(t => t.json());

        setUser(user);
        setPost(post);
        setIsLoading(false);
    }

    useEffect(() => { getPost(); }, []);

    if (isLoading) return (<Loading isLoading={isLoading} />);

    return (
        <ScrollView style={styles.container}>
            <Text h4>{post.title}</Text>
            <Text style={styles.userText}>{user.firstName} {user.lastName}</Text>
            <View style={styles.tags}>
                {post.tags.map((m, i) => <Badge key={i} badgeStyle={styles.tag} value={m} />)}
            </View>
            <Text style={styles.text}>{post.body}</Text>
        </ScrollView>
    );
}

const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
        padding: 10
    },
    tags: {
        flex: 1,
        flexDirection: "row",
        marginBottom: 10,
    },
    tag: {
        marginTop: 5,
        marginRight: 5,
    },
    userText: {
        fontWeight: "bold",
        fontSize: 12,
    },
    text: {
        textAlign: "justify",
    },
}));

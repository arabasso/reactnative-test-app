import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { Badge, makeStyles, Text } from "@rneui/themed";
import { useRoute } from "@react-navigation/native";

import { Loading } from "@components/Loading";
import { useApi } from "@hooks/Api";

export default function PostsDetails() {
    const styles = useStyles();
    const route = useRoute();

    const { postService, userService } = useApi();

    const { id } = route.params as { id: number };

    const [isLoading, setIsLoading] = useState(true);
    const [post, setPost] = useState<Post>({} as Post);
    const [user, setUser] = useState<User>({} as User);
    async function getPost() {
        const post = await postService.get(id);
        const user = await userService.get(post.userId);

        setUser(user);
        setPost(post);
        setIsLoading(false);
    }

    useEffect(() => { getPost(); }, []);

    if (isLoading) return (<Loading isLoading={isLoading} />);

    return (
        <ScrollView style={{ flex: 1 }}>
            <View style={styles.container}>
                <Text h4>{post.title}</Text>
                <Text style={styles.userText}>{user.firstName} {user.lastName}</Text>
                <View style={styles.tags}>
                    {post.tags.map((m, i) => <Badge key={i} badgeStyle={styles.tag} value={m} />)}
                </View>
                <Text style={styles.paragraph}>{post.body}</Text>
            </View>
        </ScrollView>
    );
}

const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
        padding: theme.spacing.lg,
    },
    tags: {
        flex: 1,
        flexDirection: "row",
        marginBottom: theme.spacing.lg,
    },
    tag: {
        marginTop: theme.spacing.lg,
        marginRight: theme.spacing.lg,
    },
    userText: {
        fontWeight: "bold",
        fontSize: 12,
    },
    paragraph: {
        textAlign: "justify",
    },
}));

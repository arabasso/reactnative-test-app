import { DrawerToggleButton } from "@react-navigation/drawer";
import { NavigationContainer, DarkTheme, DefaultTheme } from "@react-navigation/native";
import { StatusBar, SafeAreaView, View, Image } from "react-native";
import { Text, makeStyles, useTheme } from "@rneui/themed";

import { AuthProvider } from "@providers/Auth";
import { BackendProvider } from "@providers/Backend";

import DrawerRoutes from "./drawer.routes";

export default function Routes() {
    const styles = useStyles();
    const { theme } = useTheme();

    const navigationContainerTheme = theme.mode === "dark" ? DarkTheme : DefaultTheme;

    return (
        <AuthProvider>
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="light-content" backgroundColor={theme.colors.primary} />
                <View style={styles.innerContainer}>
                    <NavigationContainer
                        theme={{
                            ...navigationContainerTheme,
                            colors: {
                                ...navigationContainerTheme.colors,
                                background: theme.colors.background
                            }
                        }}>
                        <View style={styles.headerContainer}>
                            <View style={styles.header}>
                                <Image source={require("@assets/icon.png")} style={styles.headerImage} />
                                <Text h4 style={{ color: theme.colors.foreground }}>Aplicação</Text>
                            </View>
                            <DrawerToggleButton tintColor={theme.colors.foreground} />
                        </View>
                        <BackendProvider>
                            <DrawerRoutes />
                        </BackendProvider>
                    </NavigationContainer>
                </View>
            </SafeAreaView>
        </AuthProvider>
    );
}

const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
        backgroundColor: theme.colors.primary
    },
    innerContainer: {
        flex: 1,
    },
    headerContainer: {
        flexDirection: "row",
        backgroundColor: theme.colors.primary,
        alignItems: "center",
        justifyContent: "center",
        padding: theme.spacing.lg,
    },
    header: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    headerImage: {
        width: 40,
        height: 40,
        marginRight: theme.spacing.lg,
    },
}));
import { DrawerToggleButton } from "@react-navigation/drawer";
import { NavigationContainer, DarkTheme, DefaultTheme } from "@react-navigation/native";
import { StatusBar, SafeAreaView, View, Image } from "react-native";
import { Text, makeStyles, useTheme } from "@rneui/themed";

import { AuthProvider } from "@contexts/AuthContext";
import { BackendProvider } from "@contexts/BackendContext";

import DrawerRoutes from "./drawer.routes";

export default function Routes() {
    const { theme } = useTheme();

    const navigationContainerTheme = theme.mode === "dark" ? DarkTheme : DefaultTheme;

    return (
        <AuthProvider>
            <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.primary }}>
                <StatusBar barStyle="light-content" backgroundColor={theme.colors.primary} />
                <View style={{ flex: 1 }}>
                    <NavigationContainer theme={{ ...navigationContainerTheme, colors: { ...navigationContainerTheme.colors, background: theme.colors.background } }}>
                        <View style={{ flexDirection: 'row', backgroundColor: theme.colors.primary, alignItems: 'center', justifyContent: 'center', padding: 3 }}>
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <Image source={require("assets/icon.png")} style={{ width: 40, height: 40, marginRight: 10 }} />
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
        alignItems: "center",
        justifyContent: "center",
    },
}));
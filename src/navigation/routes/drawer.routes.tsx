import { useEffect } from "react";
import { Linking, View } from "react-native";
import { Avatar, Icon } from "@rneui/base";
import { useTheme, Text, useThemeMode, makeStyles } from "@rneui/themed";
import { DrawerContentScrollView, DrawerItem, DrawerItemList, createDrawerNavigator } from "@react-navigation/drawer";

import { useAuth } from "@hooks/Auth";

import StackRoutes from "./stack.routes";
import Login from "@screens/Login";
import About from "@screens/About";
import Profile from "@screens/Profile";
import { useStorage } from "@hooks/Storage";

const Drawer = createDrawerNavigator();

const iconWidth = 30;

export default function DrawerRoutes() {
    const { theme } = useTheme();
    const { isLogged } = useAuth();

    return (
        <Drawer.Navigator
            initialRouteName="StackRoutes"
            drawerContent={CustomDrawerContent}
            screenOptions={{
                drawerActiveTintColor: theme.colors.black,
                drawerPosition: "right",
                headerLeft: (_) => null,
                headerRight: () => null,
                headerTintColor: theme.colors.black,
                headerTitleAlign: "center",
                drawerStyle: {
                    backgroundColor: theme.colors.background
                },
                drawerLabelStyle: {
                    color: theme.colors.black
                },
                headerStyle: {
                    backgroundColor: theme.colors.background,
                    shadowColor: "black"
                }
            }}>
            <Drawer.Screen
                name="StackRoutes"
                component={StackRoutes}
                options={{
                    title: "Home",
                    header: () => null,
                    drawerIcon: ({ size }) => <Icon type="font-awesome-5" name="home" color={theme.colors.black} size={size} containerStyle={{ width: iconWidth }} />
                }}
            />
            {!isLogged && (
                <Drawer.Screen
                    name="Login"
                    component={Login}
                    options={{
                        title: "Login",
                        headerShadowVisible: true,
                        drawerIcon: ({ size }) => <Icon type="font-awesome-5" name="sign-in-alt" color={theme.colors.black} size={size} containerStyle={{ width: iconWidth }} />
                    }} />
            )}
            {isLogged && (
                <Drawer.Screen
                    name="Profile"
                    component={Profile}
                    options={{
                        title: "Perfil",
                        headerShadowVisible: true,
                        drawerIcon: ({ size }) => <Icon type="font-awesome-5" solid name="user" color={theme.colors.black} size={size} containerStyle={{ width: iconWidth }} />
                    }}
                />
            )}
            <Drawer.Screen
                name="Sobre"
                component={About}
                options={{
                    title: "Sobre",
                    drawerIcon: ({ size }) => <Icon type="font-awesome-5" name="info-circle" color={theme.colors.black} size={size} containerStyle={{ width: iconWidth }} />
                }}
            />
        </Drawer.Navigator>
    );
}

function CustomDrawerContent(props: any) {
    const styles = useStyles();
    const { theme } = useTheme();
    const { mode, setMode } = useThemeMode();
    const { isLogged, setLogin, login } = useAuth();
    const { storageService } = useStorage();

    useEffect(() => { storageService.setItem("theme.mode", mode); }, [mode]);

    function switchTheme() {
        const mode = theme.mode === "dark" ? "light" : "dark";
        
        setMode(mode);

        props.navigation.closeDrawer();
    }

    function logout() {
        setLogin(null);

        props.navigation.navigate("Home");
        props.navigation.closeDrawer();
    }

    return (
        <>
            <View style={styles.header}>
                <View style={styles.avatar}>
                    {isLogged ? (
                        <Avatar
                            size={100}
                            rounded
                            source={{ uri: login?.image }}
                            containerStyle={styles.avatarContainer}
                        />
                    ) : (
                        <Avatar
                            size={100}
                            rounded
                            icon={{ type: "font-awesome", name: "user", color: theme.colors.foreground }}
                            containerStyle={styles.avatarContainer}
                        />
                    )}
                </View>

                <Text style={styles.headerUsername}>{login?.firstName || "Visitante"}</Text>
            </View>
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
                <DrawerItem labelStyle={styles.label}
                    label={(mode === "dark" ? "Modo claro" : "Modo escuro")}
                    onPress={switchTheme}
                    icon={({ size }) => <Icon type="material" name="brightness-medium" color={theme.colors.black} size={size} containerStyle={{ width: iconWidth }} />}
                />
                <DrawerItem labelStyle={styles.label}
                    label="Ajuda"
                    onPress={() => Linking.openURL("https://mywebsite.com/help")}
                    icon={({ size }) => <Icon type="font-awesome-5" name="hands-helping" color={theme.colors.black} size={size} containerStyle={{ width: iconWidth }} />}
                />
                {isLogged && (
                    <DrawerItem labelStyle={styles.label}
                        label="Sair"
                        onPress={logout}
                        icon={({ size }) => <Icon type="font-awesome-5" name="sign-out-alt" color={theme.colors.black} size={size} containerStyle={{ width: iconWidth }} />}
                    />
                )}
            </DrawerContentScrollView>
        </>
    );
}

const useStyles = makeStyles((theme) => ({
    header: {
        backgroundColor: theme.colors.grey3,
        height: 180,
        justifyContent: "flex-end",
        paddingBottom: theme.spacing.md,
    },
    headerUsername: {
        textAlign: "center",
        color: theme.colors.foreground,
        fontWeight: "bold",
    },
    avatar: {
        flexDirection: "row",
        justifyContent: "space-around",
    },
    avatarContainer: {
        backgroundColor: theme.colors.primary,
        marginBottom: theme.spacing.lg,
    },
    label: {
        color: theme.colors.black,
    },
}));
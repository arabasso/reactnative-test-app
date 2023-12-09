import { ImageBackground, Linking } from "react-native";
import { Icon } from "@rneui/base";
import { useTheme, Text, useThemeMode } from "@rneui/themed";
import { DrawerContentScrollView, DrawerItem, DrawerItemList, createDrawerNavigator } from "@react-navigation/drawer";

import { useAuth } from "@contexts/AuthContext";

import StackRoutes from "./stack.routes";
import Login from "@screens/Login";
import About from "@screens/About";
import Profile from "@screens/Profile";

const Drawer = createDrawerNavigator();

export default function DrawerRoutes() {
    const { theme } = useTheme();
    const { isLogged } = useAuth();

    return (
        <Drawer.Navigator initialRouteName="StackRoutes" drawerContent={CustomDrawerContent} screenOptions={{ headerShown: false, drawerActiveTintColor: theme.colors.black, drawerPosition: "right", headerLeft: (props) => null, headerRight: () => null, headerTintColor: theme.colors.black, headerTitleAlign: "center", drawerStyle: { backgroundColor: theme.colors.background }, drawerLabelStyle: { color: theme.colors.black }, headerStyle: { backgroundColor: theme.colors.background, shadowColor: "black" } }}>
            <Drawer.Screen name="StackRoutes" component={StackRoutes} options={{ title: 'Home', drawerIcon: ({ size }) => <Icon type="font-awesome-5" name="home" color={theme.colors.black} size={size} /> }} />
            { !isLogged && <Drawer.Screen name="Login" component={Login} options={{ title: "Login", headerShown: true, headerShadowVisible: true, drawerIcon: ({ size }) => <Icon type="font-awesome-5" name="sign-in-alt" color={theme.colors.black} size={size} /> }} />}
            { isLogged && <Drawer.Screen name="Profile" component={Profile} options={{ title: "Perfil", headerShown: true, headerShadowVisible: true, drawerIcon: ({ size }) => <Icon type="font-awesome-5" name="user" color={theme.colors.black} size={size} /> }} />}
            <Drawer.Screen name="Sobre" component={About} options={{ title: "Sobre", headerShown: true, drawerIcon: ({ size }) => <Icon type="font-awesome-5" name="info-circle" color={theme.colors.black} size={size} /> }} />
        </Drawer.Navigator>
    );
}

function CustomDrawerContent(props: any) {
    const { theme } = useTheme();
    const { mode, setMode } = useThemeMode();
    const { isLogged, setLogin, login } = useAuth();

    function switchTheme() {
        setMode(theme.mode === 'dark' ? 'light' : 'dark');

        props.navigation.closeDrawer();
    }

    function logout() {
        setLogin(null);

        props.navigation.navigate('Home');
        props.navigation.closeDrawer();
    }

    const image = { uri: 'https://legacy.reactjs.org/logo-og.png' };

    return (
        <>
            <ImageBackground source={image} resizeMode="cover" style={{ height: 200, justifyContent: 'flex-end', paddingBottom: 15 }}>
                <Text style={{ textAlign: 'center', color: theme.colors.foreground }}>{login?.firstName || 'Visitante'}</Text>
            </ImageBackground>
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
                <DrawerItem labelStyle={{ color: theme.colors.black }}
                    label={(mode === 'dark' ? 'Modo claro' : 'Modo escuro')}
                    onPress={switchTheme}
                    icon={({ size }) => <Icon type="material" name="brightness-medium" color={theme.colors.black} size={size} />}
                />
                <DrawerItem labelStyle={{ color: theme.colors.black }}
                    label="Ajuda"
                    onPress={() => Linking.openURL('https://mywebsite.com/help')}
                    icon={({ size }) => <Icon type="font-awesome-5" name="hands-helping" color={theme.colors.black} size={size} />}
                />
                { isLogged && <DrawerItem labelStyle={{ color: theme.colors.black }}
                    label="Sair"
                    onPress={logout}
                    icon={({ size }) => <Icon type="font-awesome-5" name="sign-out-alt" color={theme.colors.black} size={size} />}
                />}
            </DrawerContentScrollView>
        </>
    );
}
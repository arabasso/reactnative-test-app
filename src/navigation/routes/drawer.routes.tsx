import { ImageBackground, Linking, StatusBar, StatusBarStyle, View } from "react-native";
import { useTheme, Text, useThemeMode } from "@rneui/themed";
import { DrawerContentScrollView, DrawerItem, DrawerItemList, createDrawerNavigator } from "@react-navigation/drawer";
import { Icon } from "@rneui/base";

import StackRoutes from "./stack.routes";
import Login from "../../navigation/screens/Login";
import About from "../../navigation/screens/About";

const Drawer = createDrawerNavigator();

export default function DrawerRoutes() {
    const { theme } = useTheme();

    return (
        <Drawer.Navigator initialRouteName="StackRoutes" drawerContent={CustomDrawerContent} screenOptions={{ drawerActiveTintColor: theme.colors.black, drawerPosition: "right", headerLeft: (props) => null, headerRight: () => null, headerTintColor: theme.colors.black, headerTitleAlign: "center", drawerStyle: { backgroundColor: theme.colors.background }, drawerLabelStyle: { color: theme.colors.black }, headerStyle: { backgroundColor: theme.colors.background, shadowColor: "black" } }}>
            <Drawer.Screen name="StackRoutes" component={StackRoutes} options={{ title: 'Home', headerShown: false, drawerIcon: ({ size }) => <Icon type="font-awesome-5" name="home" color={theme.colors.black} size={size} /> }} />
            <Drawer.Screen name="Login" component={Login} options={{ title: "Login", headerShadowVisible: true, drawerIcon: ({ size }) => <Icon type="font-awesome-5" name="sign-in-alt" color={theme.colors.black} size={size} /> }} />
            <Drawer.Screen name="Sobre" component={About} options={{ title: "Sobre", drawerIcon: ({ size }) => <Icon type="font-awesome-5" name="info-circle" color={theme.colors.black} size={size} /> }} />
        </Drawer.Navigator>
    );
}

function CustomDrawerContent(props:any) {
    const { theme } = useTheme();
    const { mode, setMode } = useThemeMode();

    function switchTheme() {
        setMode(theme.mode === 'dark' ? 'light' : 'dark');
        StatusBar.setBarStyle(theme.mode === 'dark' ? 'light-content' : 'dark-content')

        props.navigation.closeDrawer();
    }

    const image = { uri: 'https://legacy.reactjs.org/logo-og.png' };

    return (
        <>
            <View>
                <ImageBackground source={image} resizeMode="cover" style={{ height: 200, justifyContent: 'flex-end', paddingBottom: 15 }}>
                    <Text style={{ textAlign: 'center', color: theme.colors.foreground }}>Visitante</Text>
                </ImageBackground>
            </View>
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
            </DrawerContentScrollView>
        </>
    );
}
import React from "react";
import { ImageBackground, Linking, View } from "react-native";
import { useTheme, Text } from "@rneui/themed";
import Home from "../navigation/screens/Home";
import Login from "../navigation/screens/Login";
import { DrawerContentScrollView, DrawerItem, DrawerItemList, createDrawerNavigator } from "@react-navigation/drawer";
import { Icon } from "@rneui/base";
import About from "../navigation/screens/About";

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
    const { theme } = useTheme();

    const image = { uri: 'https://legacy.reactjs.org/logo-og.png' };

    return (
        <>
            <View>
                <ImageBackground source={image} resizeMode="cover" style={{ height: 200, justifyContent: 'flex-end', paddingBottom: 15 }}>
                    <Text style={{ textAlign: 'center' }}>Visitante</Text>
                </ImageBackground>
            </View>
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
                <DrawerItem labelStyle={{ color: theme.colors.black }}
                    label="Ajuda"
                    onPress={() => Linking.openURL('https://mywebsite.com/help')}
                    icon={({color, size}) => <Icon type="font-awesome-5" name="hands-helping" color={theme.colors.black} size={size} />}
                />
            </DrawerContentScrollView>
        </>
    );
}

export default function Menu() {
    const { theme } = useTheme();

    return (
        <Drawer.Navigator initialRouteName="Home" drawerContent={CustomDrawerContent} screenOptions={{ drawerActiveTintColor: theme.colors.primary,  headerTintColor: theme.colors.black, headerTitleAlign: 'center', drawerStyle: { backgroundColor: theme.colors.background }, headerStyle: { backgroundColor: theme.colors.background }, drawerLabelStyle: { color: theme.colors.black } }}>
            <Drawer.Screen name="Home" component={Home} options={{ drawerIcon: ({ size }) => <Icon type="font-awesome-5" name="home" color={theme.colors.black} size={size} /> }} />
            <Drawer.Screen name="Login" component={Login} options={{ drawerIcon: ({ size }) => <Icon type="font-awesome-5" name="sign-in-alt" color={theme.colors.black} size={size} /> }} />
            <Drawer.Screen name="Sobre" component={About} options={{ drawerIcon: ({ size }) => <Icon type="font-awesome-5" name="info-circle" color={theme.colors.black} size={size} /> }} />
        </Drawer.Navigator>
    );
}
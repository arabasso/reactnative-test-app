import { Overlay, OverlayProps, useTheme } from "@rneui/themed";
import { ActivityIndicator, View, Text } from "react-native";

type LoadingProps = {
    isLoading: boolean;
};

export function Loading(props : LoadingProps) {
    const { theme } = useTheme();

    if (!props.isLoading) return null;
    
    return (
        <ActivityIndicator size={50} color={theme.colors.primary} />
    );
}

type LoadingOverlayProps = OverlayProps & {
    message: string;
};

export function LoadingOverlay({ message, ...props } : LoadingOverlayProps) {
    const { theme } = useTheme();

    return (
        <Overlay {...props} overlayStyle={{ backgroundColor: theme.colors.background }}>
        <View style={{ margin: 10, flexDirection: "row", alignItems: "center" }}>
            <Loading isLoading />
            <Text style={{ marginLeft: 10, color: theme.colors.black }}>{message}</Text>
        </View>
    </Overlay>
    );
}

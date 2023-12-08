import { useTheme } from "@rneui/themed";
import { ActivityIndicator } from "react-native";

type LoadingProps = {
    isLoading: boolean;
};

export default function Loading(props : LoadingProps) {
    const { theme } = useTheme();

    if (!props.isLoading) return null;
    
    return (
        <ActivityIndicator size={50} color={theme.colors.primary} />
    );
}

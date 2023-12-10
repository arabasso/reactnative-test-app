import { useCallback, useState } from "react";
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Dialog, makeStyles, useTheme } from "@rneui/themed";
import { Alert, ScrollView } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import * as yup from "yup";

import { useAuth } from "@hooks/Auth";
import { useBackend } from "@hooks/Backend";

import InputControl from "@components/InputControl";

type FormDataProps = {
    username: string;
    password: string;
};

export default function Login() {
    const styles = useStyles();
    const navigation = useNavigation();

    const { setLogin } = useAuth();
    const { authService } = useBackend();

    const [isLoading, setIsLoading] = useState(false);

    const validationSchema = yup.object({
        root: yup.string(),
        username: yup.string().required().label("Usuário"),
        password: yup.string().required().min(3).label("Senha"),
    });

    const { control, handleSubmit, formState: { errors }, reset } = useForm<FormDataProps>({ resolver: yupResolver(validationSchema), defaultValues: { username: "", password: "" } })

    async function onSubmit(data: any) {
        setIsLoading(true);

        await authService.login(data.username, data.password).then(login => {
            setIsLoading(false);

            setLogin(login);

            navigation.goBack();
        }).catch(err => {
            setIsLoading(false);

            Alert.alert("Erro", err.message, [{ text: "OK" }], {  userInterfaceStyle: "dark" });
        });
    };

    function onFocus() {
        reset({ username: "atuny0", password: "9uQFF1Lh" });
    }

    useFocusEffect(useCallback(onFocus, []));

    return (
        <ScrollView style={styles.container}>
            <Dialog isVisible={isLoading}>
                <Dialog.Loading loadingProps={{ size: "large" }} />
            </Dialog>
            <InputControl
                control={control}
                name="username"
                label="Usuário"
                autoCapitalize="none"
                leftIcon={{
                    name: "user",
                    solid: true,
                }}
                errorMessage={errors.username?.message} />
            <InputControl
                control={control}
                name="password"
                label="Senha"
                secureTextEntry={true}
                leftIcon={{
                    name: "lock",
                }}
                errorMessage={errors.password?.message} />
            <Button
                onPress={handleSubmit(onSubmit)}
                icon={{ name: "sign-in-alt" }}
                title="Entrar"
                accessibilityLabel="Entrar" />
            <Button
                buttonStyle={{
                    backgroundColor: "#ea0"
                }}
                onPress={navigation.goBack}
                icon={{
                    name: "times"
                }}
                title="Cancelar"
                accessibilityLabel="Cancelar" />
        </ScrollView>
    )
};

const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
        margin: theme.spacing.lg,
    },
    text: {
        marginVertical: theme.spacing.lg,
    },
}));

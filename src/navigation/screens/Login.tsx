import { useCallback, useContext, useState } from 'react';
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup";
import { Overlay } from '@rneui/base';
import { Button, makeStyles, Text, useTheme } from '@rneui/themed';
import { Alert, View } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import * as yup from "yup";

import InputControl from '@components/InputControl';
import { AuthContext } from '@contexts/AuthContext';
import { BackendContext } from '@contexts/BackendContext';
import Loading from '@components/Loading';

type FormDataProps = {
    username: string;
    password: string;
};

export default function Login() {
    const { theme } = useTheme();
    const styles = useStyles();
    const navigation = useNavigation();

    const { setLogin } = useContext(AuthContext);
    const { authService } = useContext(BackendContext);

    const [isLoading, setIsLoading] = useState(false);

    const validationSchema = yup.object({
        root: yup.string(),
        username: yup.string().required().label('Usuário'),
        password: yup.string().required().min(3).label('Senha'),
    });

    const { control, handleSubmit, formState: { errors }, reset } = useForm<FormDataProps>({ resolver: yupResolver(validationSchema), defaultValues: { username: '', password: '' } })

    async function onSubmit(data: any) {
        setIsLoading(true);

        await authService.login(data.username, data.password).then(login => {
            setIsLoading(false);

            setLogin(login);
            navigation.goBack();
        }).catch(err => {
            setIsLoading(false);

            Alert.alert("Erro", err.message);
        });
    };

    function onFocus() {
        reset({ username: 'atuny0', password: '9uQFF1Lh' });
    }

    useFocusEffect(useCallback(onFocus, []));

    return (
        <View style={styles.container}>
            <Overlay isVisible={isLoading} overlayStyle={{ backgroundColor: theme.colors.background }}>
                <View style={{ margin: 10, flexDirection: "row", alignItems: "center" }}>
                    <Loading isLoading={isLoading} />
                    <Text style={{ marginLeft: 10 }}>Autenticando...</Text>
                </View>
            </Overlay>
            <View style={{ margin: 10 }}>
                {!!errors.root?.message && <Text style={styles.error}>{errors.root?.message}</Text>}
                <InputControl control={control} name="username" label="Usuário" autoCapitalize='none' leftIcon={{ name: 'user' }} errorMessage={errors.username?.message} />
                <InputControl control={control} name="password" label="Senha" secureTextEntry={true} leftIcon={{ name: 'lock' }} errorMessage={errors.password?.message} />
                <Button onPress={handleSubmit(onSubmit)} icon={{ name: 'sign-in-alt' }} title="Entrar" accessibilityLabel="Entrar" />
                <Button buttonStyle={{ backgroundColor: '#ea0' }} onPress={navigation.goBack} icon={{ name: 'times' }} title="Cancelar" accessibilityLabel="Cancelar" />
            </View>
        </View>
    )
};

const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        padding: theme.spacing.lg
    },
    text: {
        marginVertical: theme.spacing.lg,
    },
    error: {
        color: theme.colors.error,
        textAlign: 'center',
    }
}));

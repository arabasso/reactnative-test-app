import React, { useCallback, useContext } from 'react';
import { Controller, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button, makeStyles, Text } from '@rneui/themed';
import { Alert, View } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import InputControl from '@components/InputControl';
import { AuthContext } from '@contexts/AuthContext';
import { BackendService } from '@services/BackendService';
import { AuthService } from '@services/AuthService';

type FormDataProps = {
    username: string;
    password: string;
};

export default function Login() {
    const styles = useStyles();
    const navigation = useNavigation();
    const { setLogin } = useContext(AuthContext);

    const validationSchema = yup.object({
        root: yup.string(),
        username: yup.string().required().label('Usuário'),
        password: yup.string().required().min(3).label('Senha'),
    });

    const { control, handleSubmit, formState: { errors }, setError, reset } = useForm<FormDataProps>({ resolver: yupResolver(validationSchema), defaultValues: { username: '', password: '' } })

    async function onSubmit(data: any) {
        const service = new BackendService("https://dummyjson.com/");
        const authService = new AuthService(service);

        await authService.login(data.username, data.password).then(login => {
            setLogin(login);
            navigation.navigate('Home');
        }).catch(err => {
            Alert.alert("Erro", err.message);
        });
    };

    function onFocus() {
        reset({ username: 'atuny0', password: '9uQFF1Lh' });
    }

    useFocusEffect(useCallback(onFocus, []));

    return (
        <View style={styles.container}>
            <View style={{ margin: 10 }}>
                { !!errors.root?.message && <Text style={styles.error}>{errors.root?.message}</Text> }
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

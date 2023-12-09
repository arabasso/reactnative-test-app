import React, { useCallback } from 'react';
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button, makeStyles } from '@rneui/themed';
import { View } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import InputControl from '@components/InputControl';

type FormDataProps = {
    username: string;
    password: string;
};

export default function Login () {
    const styles = useStyles();
    const navigation = useNavigation();

    const validationSchema = yup.object({
        username: yup.string().required().label('Usuário'),
        password: yup.string().required().min(3).label('Senha'),
    });

    const { control, handleSubmit, formState: { errors }, setError, reset } = useForm<FormDataProps>({ resolver: yupResolver(validationSchema), defaultValues: { username: '', password: '' } })

    async function onSubmit (data: any) {
        let isValid = true;
        
        if (data.username !== "arabasso") {
            setError('username', {
                type:'manual',
                message: 'Usuário inválido'
            });

            isValid = false;
        }
        
        if (data.password !== '123') {
            setError('password', {
                type:'manual',
                message: 'Senha incorreta'
            });

            isValid = false;
        }
        
        if (isValid) {
            navigation.navigate('Home');
        }
    };

    function onFocus() {
        reset({ username: '', password: '' });
    }

    useFocusEffect(useCallback(onFocus, []));

    return (
        <View style={styles.container}>
            <View style={{ margin: 10 }}>
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
}));

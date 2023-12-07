import React from 'react';
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button, makeStyles } from '@rneui/themed';
import { View } from 'react-native';
import InputControl from '../../components/InputControl';

type FormDataProps = {
    username: string;
    password: string;
};

export default function Login ({ navigation }: any) {
    const styles = useStyles();

    const validationSchema = yup.object({
        username: yup.string().required().label('Usuário'),
        password: yup.string().required().min(3).label('Senha'),
    });

    const { control, handleSubmit, formState: { errors }, } = useForm<FormDataProps>({ resolver: yupResolver(validationSchema), defaultValues: { username: '', password: '' } })

    function onSubmit (data: any) {
        navigation.navigate('Home', data);
    };

    return (
        <View style={styles.container}>
            <View style={{ margin: 10 }}>
                <InputControl control={control} name="username" label="Usuário" autoCapitalize='none' leftIcon={{ name: 'user' }} errorMessage={errors.username?.message} />
                <InputControl control={control} name="password" label="Senha" secureTextEntry={true} leftIcon={{ name: 'lock' }} errorMessage={errors.password?.message} />
                <Button onPress={handleSubmit(onSubmit)} icon={{ name: 'sign-in-alt' }} title="Entrar" accessibilityLabel="Entrar" />
                <Button buttonStyle={{ backgroundColor: '#ea0' }} onPress={() => navigation.navigate('Home')} icon={{ name: 'times' }} title="Cancelar" accessibilityLabel="Cancelar" />
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

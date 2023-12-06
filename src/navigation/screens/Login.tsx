import React from 'react';
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input, Button, makeStyles } from '@rneui/themed';
import { View } from 'react-native';

const Login = ({ navigation }: any) => {
    const styles = useStyles();

    const validationSchema = yup.object({
        username: yup.string().required().label('Usuário'),
        password: yup.string().required().min(3).label('Senha'),
    });

    const { control, handleSubmit, formState: { errors }, } = useForm({ resolver: yupResolver(validationSchema), defaultValues: { username: '', password: '' } })

    const onSubmit = (data: any) => {
        navigation.navigate('Home');
    };

    return (
        <View style={styles.container}>
            <View style={{ margin: 10 }}>
                <Controller name="username" control={control} render={({ field: { onChange, onBlur, value } }) => (
                    <Input label="Usuário" autoCapitalize='none' onBlur={onBlur} onChangeText={onChange} value={value} leftIcon={{ type: 'font-awesome-5', name: 'user' }} errorMessage={errors.username?.message} />
                )} />
                <Controller name="password" control={control} render={({ field: { onChange, onBlur, value } }) => (
                    <Input label="Senha" secureTextEntry={true} onBlur={onBlur} onChangeText={onChange} value={value} leftIcon={{ type: 'font-awesome-5', name: 'lock' }} errorMessage={errors.password?.message} />
                )} />
                <Button onPress={handleSubmit(onSubmit)} icon={{ type: 'font-awesome-5', name: 'sign-in-alt' }} title="Entrar" accessibilityLabel="Entrar" />
                <Button buttonStyle={{ backgroundColor: '#ea0' }} onPress={() => navigation.navigate('Home')} icon={{ type: 'font-awesome-5', name: 'times' }} title="Cancelar" accessibilityLabel="Cancelar" />
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

export default Login;

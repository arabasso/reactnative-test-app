import { InputProps as ThemedInputProps, Input as ThemedInput } from "@rneui/themed";
import { Controller } from "react-hook-form";

interface InputProps extends ThemedInputProps {
    control?: any
}

const Input = (props: InputProps) => {
    return (
        <Controller name="username" control={props.control} render={({ field: { onChange, onBlur, value } }) => (
            <ThemedInput onBlur={onBlur} onChangeText={onChange} value={value} {...props} />
        )} />
    )
};

export default Input;
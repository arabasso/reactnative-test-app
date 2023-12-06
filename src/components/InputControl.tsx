import { InputProps, Input } from "@rneui/themed";
import { Controller } from "react-hook-form";

type InputControlProps = InputProps & {
    name?: any;
    control?: any;
}

const InputControl = ({name, control, ...props}: InputControlProps) => {
    return (
        <Controller name={name} control={control} render={({ field: { onChange, onBlur, value } }) => (
            <Input {...props} onBlur={onBlur} onChangeText={onChange} value={value} />
        )} />
    )
};

export default InputControl;
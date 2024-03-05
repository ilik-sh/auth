import React, { FC } from "react";
import { TextField as MUITextField, TextFieldProps } from "@mui/material";
import { Control, Controller } from "react-hook-form";
import { camelize } from "@/utils/camelize";

interface CustomTextFieldProps extends TextFieldProps<"standard"> {
  name: string;
  control: Control<any, any>;
}

const TextField: FC<CustomTextFieldProps> = ({ name, control, ...props }) => {
  return (
    <Controller
      control={control}
      name={camelize(name)}
      render={({ field }) => (
        <MUITextField
          {...props}
          {...field}
          name={name}
          margin="normal"
          fullWidth
          id={camelize(name)}
          autoComplete={camelize(name)}
          label={name}
        />
      )}
    />
  );
};

export default TextField;

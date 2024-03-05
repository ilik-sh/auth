import { styled } from "@mui/material";
import React, { FC } from "react";
import IconTitle from "@/components/icon-title.comp";
import PasswordField from "@/components/password-field.comp";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { StyledBox } from "@/components/styled-centered-box.comp";
import { SignUpFormYup } from "@/validation-schemas/sign-up-form.schema";
import { Control, FieldErrors } from "react-hook-form";
import { StyledButton } from "@/components/styled-button.comp";
import CustomLink from "@/components/custom-link.comp";
import TextField from "@/components/text-field.comp";

interface SignUpFormProps {
  onSubmit: React.FormEventHandler;
  control: Control<SignUpFormYup, any>;
  validationErrors: FieldErrors<SignUpFormYup>;
}

const StyledCenteredBox = styled(StyledBox)(({ theme }) => ({
  marginTop: theme.spacing(8),
}));

const StyledContainer = styled("div")({
  display: "flex",
  justifyContent: "space-between",
});

const SignUpForm: FC<SignUpFormProps> = ({
  onSubmit,
  control,
  validationErrors,
}) => {
  return (
    <StyledCenteredBox>
      <IconTitle title="Sign up" Icon={LockOutlinedIcon} />
      <form noValidate onSubmit={onSubmit}>
        <TextField
          name="First Name"
          control={control}
          error={!!validationErrors.firstName}
          helperText={validationErrors.firstName?.message}
        />
        <TextField
          name="Last Name"
          control={control}
          error={!!validationErrors.lastName}
          helperText={validationErrors.lastName?.message}
        />
        <TextField
          name="Email"
          control={control}
          error={!!validationErrors.email}
          helperText={validationErrors.email?.message}
        />
        <PasswordField
          label="Password"
          autoComplete="current-password"
          control={control}
          error={!!validationErrors.password}
          helperText={validationErrors.password?.message}
        />
        <PasswordField
          label="Confirm Password"
          autoComplete="current-password"
          control={control}
          error={!!validationErrors.confirmPassword}
          helperText={validationErrors.confirmPassword?.message}
        />
        <StyledButton type="submit" fullWidth variant="contained">
          Sign Up
        </StyledButton>
        <CustomLink text="Already have an account? Sign in" link="/signin" />
      </form>
    </StyledCenteredBox>
  );
};

export default SignUpForm;

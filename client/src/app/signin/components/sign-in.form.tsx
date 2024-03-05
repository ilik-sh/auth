import { styled } from "@mui/material";
import React, { FC } from "react";
import IconTitle from "@/components/icon-title.comp";
import PasswordField from "@/components/password-field.comp";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { StyledBox } from "@/components/styled-centered-box.comp";
import { SignInFormYup } from "@/validation-schemas/sign-in-form.schema";
import { Control, FieldErrors } from "react-hook-form";
import { StyledButton } from "@/components/styled-button.comp";
import CustomLink from "../../../components/custom-link.comp";
import TextField from "@/components/text-field.comp";

interface SignInFormProps {
  onSubmit: React.FormEventHandler;
  control: Control<SignInFormYup, any>;
  validationErrors: FieldErrors<SignInFormYup>;
}

const StyledCenteredBox = styled(StyledBox)(({ theme }) => ({
  margin: theme.spacing(8) + " " + theme.spacing(4),
}));

const StyledContainer = styled("div")({
  display: "flex",
  justifyContent: "space-between",
});

const SignInForm: FC<SignInFormProps> = ({
  onSubmit,
  control,
  validationErrors,
}) => {
  return (
    <StyledCenteredBox>
      <IconTitle title="Sign in" Icon={LockOutlinedIcon} />
      <form noValidate onSubmit={onSubmit}>
        <TextField
          name="Email"
          control={control}
          error={!!validationErrors.email}
          helperText={validationErrors.email?.message}
        />
        <PasswordField
          control={control}
          label="Password"
          autoComplete="current-password"
          error={!!validationErrors.password}
          helperText={validationErrors.password?.message}
        />
        <StyledButton type="submit" fullWidth variant="contained">
          Sign In
        </StyledButton>
        <StyledContainer>
          <CustomLink text="Don't have an account? Sign Up" link="/signup" />
        </StyledContainer>
      </form>
    </StyledCenteredBox>
  );
};

export default SignInForm;

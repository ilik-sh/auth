"use client";

import React from "react";
import SignUpForm from "./components/sign-up.form";
import { useAppDispatch } from "@/hooks/redux.hooks";
import { signUpFormSchema } from "@/validation-schemas/sign-up-form.schema";
import { SignUpForm as SignUp } from "@/types/forms/sign-up.form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import { useRouter } from "next/navigation";
import { signUp } from "@/store/auth/auth.actions";
import { ApiError } from "@/types/api.error";
import { Container } from "@mui/material";

type Props = {};

export default function Signup({}: Props) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUp>({
    resolver: yupResolver(signUpFormSchema),
    mode: "onBlur",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<SignUp> = async (data) => {
    const response = await dispatch(signUp(data));
    if (response.meta.requestStatus == "rejected") {
      const payload = response.payload as ApiError;
      enqueueSnackbar(payload.message, { variant: "error" });
    }
    if (response.meta.requestStatus == "fulfilled") {
      router.push("/profile");
    }
  };

  return (
    <SnackbarProvider>
      <Container component="main">
        <SignUpForm
          onSubmit={handleSubmit(onSubmit)}
          control={control}
          validationErrors={errors}
        />
      </Container>
    </SnackbarProvider>
  );
}

"use client";
import { Container, Paper, Snackbar, TextField } from "@mui/material";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import React from "react";
import SignInForm from "./components/sign-in.form";
import { SignInForm as SignIn } from "@/types/forms/sign-in.form";
import { useAppDispatch } from "@/hooks/redux.hooks";
import { signInFormSchema } from "@/validation-schemas/sign-in-form.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { signIn } from "@/store/auth/auth.actions";
import { ApiError } from "next/dist/server/api-utils";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

type Props = {};

export default function Signin({}: Props) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignIn>({
    resolver: yupResolver(signInFormSchema),
    mode: "all",
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: SignIn) => {
    const response = await dispatch(signIn(data));
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
        <SignInForm
          onSubmit={handleSubmit(onSubmit)}
          control={control}
          validationErrors={errors}
        />
      </Container>
    </SnackbarProvider>
  );
}

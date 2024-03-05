"use client";

import React, { useLayoutEffect } from "react";
import { Paper, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/hooks/redux.hooks";
import { authSelector } from "@/store/auth/auth.selector";
import { useRouter } from "next/navigation";
import { StyledBox } from "@/components/styled-centered-box.comp";
import { StyledButton } from "@/components/styled-button.comp";
import { signOut } from "@/store/auth/auth.slice";
import { LocalStorageKeys } from "@/enums/local-storage-keys.enum";
import isAuth from "@/components/isAuth.comp";

type Props = {};

function Profile({}: Props) {
  const { isAuthenticated, name } = useAppSelector(authSelector);
  const router = useRouter();
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    if (!isAuthenticated) {
      router.push("/signin");
    }
  }, []);

  const handleClick = () => {
    localStorage.removeItem(LocalStorageKeys.AcessToken);
    localStorage.removeItem(LocalStorageKeys.RefreshToken);
    dispatch(signOut());
    router.push("/signin");
  };

  return (
    <StyledBox>
      <Typography variant="h1">Hello</Typography>
      <Typography variant="h2">{name}</Typography>
      <StyledButton onClick={handleClick} color="error">
        Sign Out
      </StyledButton>
    </StyledBox>
  );
}

export default isAuth(Profile);

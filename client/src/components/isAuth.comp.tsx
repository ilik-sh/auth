"use client";

import { useEffect } from "react";
import { redirect } from "next/navigation";
import { authSelector } from "@/store/auth/auth.selector";
import { useAppSelector } from "@/hooks/redux.hooks";

export default function isAuth(Component: any) {
  return function IsAuth(props: any) {
    const { isAuthenticated } = useAppSelector(authSelector);

    useEffect(() => {
      if (!isAuthenticated) {
        return redirect("/signin");
      }
    }, []);

    if (!isAuthenticated) {
      return null;
    }

    return <Component {...props} />;
  };
}

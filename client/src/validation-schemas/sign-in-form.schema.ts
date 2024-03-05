import * as Yup from "yup";

export const signInFormSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export type SignInFormYup = Yup.InferType<typeof signInFormSchema>;

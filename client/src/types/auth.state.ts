import { BaseState } from "./base.state";

export interface AuthState extends BaseState {
  isAuthenticated: boolean;
  isPending: {
    signIn: boolean;
    signUp: boolean;
  };
  errors: {
    signIn: string | null;
    signUp: string | null;
  };
  name: string;
}

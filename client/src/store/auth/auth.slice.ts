import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "@/types/auth.state";
import { signIn, signUp } from "./auth.actions";

const initialState: AuthState = {
  isAuthenticated: false,
  isPending: {
    signIn: false,
    signUp: false,
  },
  errors: {
    signIn: null,
    signUp: null,
  },
  name: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signOut(state) {
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state, action) => {
        state.isPending.signIn = true;
        state.errors.signIn = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.name = action.payload.firstName + " " + action.payload.lastName;
        state.isPending.signIn = false;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.isPending.signIn = false;
        state.errors.signIn = action.error.message || null;
      })
      .addCase(signUp.pending, (state, action) => {
        state.isPending.signUp = true;
        state.errors.signUp = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.name = action.payload.firstName + " " + action.payload.lastName;
        state.isPending.signUp = false;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isPending.signUp = false;
        state.errors.signUp = action.error.message || null;
      });
  },
});

export const { signOut } = authSlice.actions;
export const authReducer = authSlice.reducer;

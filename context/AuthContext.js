import { createContext } from "react";

export const AuthContext = createContext({});
export const AuthDispatchContext = createContext({
  isSignout: false,
  userToken: null,
  isLoading: true,
});

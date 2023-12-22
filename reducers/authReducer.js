import { setItemAsync } from "expo-secure-store";

export function authReducer(state, action) {
  switch (action.type) {
    case "RESTORE_TOKEN": {
      return { ...state, userToken: action.token, isLoading: false };
    }
    case "SIGN_IN": {
      setItemAsync("userToken", action.action.jwt);
      setItemAsync("userId", action.action.userId);

      return {
        ...state,
        isSignout: false,
        userToken: action.token,
        userId: action.userId,
      };
    }
    case "SIGN_OUT":
      return {
        ...state,
        isSignout: true,
        userToken: null,
        userId: null,
      };
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

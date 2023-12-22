import { setItemAsync, deleteItemAsync } from "expo-secure-store";

export function authReducer(state, action) {
  switch (action.type) {
    case "RESTORE_TOKEN": {
      return { ...state, userToken: action.token, isLoading: false };
    }
    case "SIGN_IN": {
      return {
        ...state,
        isSignout: false,
        userToken: action.data.jwt,
        userId: action.data.userId,
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

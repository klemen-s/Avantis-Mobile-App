import { useContext } from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { AuthDispatchContext } from "../context/AuthContext";
import { deleteItemAsync } from "expo-secure-store";
import { CartDispatchContext } from "../context/CartContext";

export function Logout() {
  const authDispatch = useContext(AuthDispatchContext);
  const cartDispatch = useContext(CartDispatchContext);

  async function handleLogout() {
    try {
      await deleteItemAsync("userId");
      await deleteItemAsync("userToken");
      authDispatch({ type: "SIGN_OUT" });
      cartDispatch({ type: "CHECKOUT" });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <TouchableOpacity style={style.logoutBtn} onPress={handleLogout}>
      <Text>Logout</Text>
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  logoutBtn: {
    backgroundColor: "white",
    width: 130,
    height: 35,
    margin: 15,
    shadowColor: "black",
    borderColor: "black",
    borderWidth: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

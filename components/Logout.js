import { useContext } from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { AuthDispatchContext } from "../context/AuthContext";

export function Logout() {
  const authDispatch = useContext(AuthDispatchContext);

  function handleLogout() {
    authDispatch({ type: "SIGN_OUT" });
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

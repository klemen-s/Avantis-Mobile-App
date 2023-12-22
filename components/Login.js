import { useContext, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import axios from "axios";
import { AuthDispatchContext } from "../context/AuthContext";
import { setItemAsync } from "expo-secure-store";

export function Login({ navigation }) {
  const url = process.env.EXPO_PUBLIC_API_URL + "login";

  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const authDispatch = useContext(AuthDispatchContext);

  async function handleLogin() {
    try {
      const res = await axios({
        method: "POST",
        data: {
          email: email,
          password: password,
        },
        url: url,
      });

      const { jwt, userId } = res.data;

      await setItemAsync("userToken", jwt);
      await setItemAsync("userId", userId);

      authDispatch({ type: "SIGN_IN", data: { jwt, userId } });
      navigation.navigate("Home");
    } catch (error) {
      setError(true);
      setErrorMessage("Email or password is wrong. Please try again.");
    }
  }

  return (
    <View style={style.container}>
      <TextInput
        numberOfLines={1}
        maxLength={40}
        onChangeText={(text) => onChangeEmail(text)}
        value={email}
        style={style.input}
        placeholder="Email"
      />
      <TextInput
        numberOfLines={1}
        maxLength={40}
        onChangeText={(text) => onChangePassword(text)}
        value={password}
        style={style.input}
        placeholder="Password"
        secureTextEntry={true}
      />
      <TouchableOpacity
        style={{
          borderWidth: 1,
          borderColor: "black",
          width: 90,
          height: 40,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={handleLogin}
      >
        <Text style={{ fontSize: 16 }}>Login</Text>
      </TouchableOpacity>
      {error ? (
        <Text style={{ color: "red", marginTop: 20 }}>{errorMessage}</Text>
      ) : (
        ""
      )}
    </View>
  );
}
const style = StyleSheet.create({
  input: {
    height: 50,
    width: "80%",
    borderWidth: 1,
    marginBottom: 50,
    padding: 10,
  },

  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    marignTop: 100,
  },
});

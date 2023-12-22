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

export function Login() {
  const url = process.env.EXPO_PUBLIC_API_URL + "login";

  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");

  const [isEmailCorrect, setIsEmailCorrect] = useState(true);
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(true);

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
      authDispatch({ type: "SIGN_IN", action: { jwt, userId } });
    } catch (error) {
      console.log(error);
      setIsEmailCorrect(false);
      setIsPasswordCorrect(false);
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
      <TouchableOpacity onPress={handleLogin}>
        <Text>Login</Text>
      </TouchableOpacity>
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

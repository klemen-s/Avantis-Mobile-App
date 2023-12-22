import { useState } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import NavigationButton from "./NavigationButton";
import axios from "axios";

export function Register({ navigation }) {
  const [name, onChangeName] = useState("");
  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");
  const [confirmPassword, onChangeConfirmPassword] = useState("");

  const uri = process.env.EXPO_PUBLIC_API_URL + "register";

  async function handleRegister() {
    try {
      const data = await axios.post(
        { url: uri },
        {
          email: email,
          name: name,
          password: password,
          confirmPassword,
          confirmPassword,
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={style.container}>
      <TextInput
        numberOfLines={1}
        maxLength={40}
        onChangeText={(text) => onChangeName(text)}
        value={name}
        style={style.input}
        placeholder="Name"
      />
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
      <TextInput
        numberOfLines={1}
        maxLength={40}
        onChangeText={(text) => onChangeConfirmPassword(text)}
        value={confirmPassword}
        style={style.input}
        placeholder="Confirm Password"
        secureTextEntry={true}
      />

      <TouchableOpacity onPress={handleRegister}>
        <Text>Register</Text>
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

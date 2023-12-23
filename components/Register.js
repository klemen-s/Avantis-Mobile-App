import { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import axios from "axios";

export function Register({ navigation }) {
  const [name, onChangeName] = useState("");
  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");
  const [confirmPassword, onChangeConfirmPassword] = useState("");

  const [isNameCorrect, setIsNameCorrect] = useState(true);
  const [isEmailCorrect, setIsEmailCorrect] = useState(true);
  const [isPasswordCorrect, setisPasswordCorrect] = useState(true);
  const [isConfirmPasswordCorrect, setisConfirmPasswordCorrect] =
    useState(true);

  const url = process.env.EXPO_PUBLIC_API_URL + "register";

  async function handleRegister() {
    if (name === null || name.length === 0) {
      setIsNameCorrect(false);
      return;
    }

    if (email === null || email.length === 0 || !email.includes("@")) {
      setIsEmailCorrect(false);
      return;
    }

    if (password === null || password.length === 0) {
      setisPasswordCorrect(false);
      return;
    }

    if (confirmPassword === null || confirmPassword.length === 0) {
      setisConfirmPasswordCorrect(false);
      return;
    }

    if (password === confirmPassword) {
      setisPasswordCorrect(true);
      setisConfirmPasswordCorrect(true);
    }

    try {
      const data = await axios({
        url: url,
        data: {
          email: email,
          name: name,
          password: password,
          confirmPassword,
          confirmPassword,
        },
        method: "POST",
      });

      console.log(data);
      navigation.navigate("Login");
    } catch (err) {
      console.log(err);

      const errorName = err.response.data.name;

      switch (errorName) {
        case "EMAIL_ERROR": {
          setIsEmailCorrect(false);
          return;
        }
        case "PASSWORD_MATCH_ERROR": {
          setisPasswordCorrect(false);
          setisConfirmPasswordCorrect(false);
          return;
        }
      }
    }
  }

  return (
    <View style={style.container}>
      {!isNameCorrect && (
        <Text style={style.errorMessage}>Incorrect input for Name.</Text>
      )}
      <TextInput
        numberOfLines={1}
        maxLength={40}
        onChangeText={(text) => {
          onChangeName(text);

          if (text.length < 1) setIsNameCorrect(false);
          else setIsNameCorrect(true);
        }}
        value={name}
        style={style.input}
        placeholder="Name"
      />
      {!isEmailCorrect && (
        <Text style={style.errorMessage}>
          Incorrect Email or Email is already in use.
        </Text>
      )}
      <TextInput
        numberOfLines={1}
        maxLength={40}
        onChangeText={(text) => {
          onChangeEmail(text);

          if (text.length < 1) setIsEmailCorrect(false);
          else setIsEmailCorrect(true);
        }}
        value={email}
        style={style.input}
        placeholder="Email"
      />
      {!isPasswordCorrect && (
        <Text style={style.errorMessage}>Incorrect input for password.</Text>
      )}
      <TextInput
        numberOfLines={1}
        maxLength={40}
        onChangeText={(text) => {
          onChangePassword(text);

          if (text.length < 1) setisPasswordCorrect(false);
          else setisPasswordCorrect(true);
        }}
        value={password}
        style={style.input}
        placeholder="Password"
        secureTextEntry={true}
      />
      {!isConfirmPasswordCorrect && (
        <Text style={style.errorMessage}>
          Wrong input for password or passwords do not match.
        </Text>
      )}
      <TextInput
        numberOfLines={1}
        maxLength={40}
        onChangeText={(text) => {
          onChangeConfirmPassword(text);

          if (text.length < 1) setisConfirmPasswordCorrect(false);
          else setisConfirmPasswordCorrect(true);
        }}
        value={confirmPassword}
        style={style.input}
        placeholder="Confirm Password"
        secureTextEntry={true}
      />

      <TouchableOpacity
        onPress={handleRegister}
        style={{
          borderWidth: 1,
          borderColor: "black",
          width: 90,
          height: 40,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
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

  errorMessage: {
    textAlign: "left",
    width: "80%",
    marginBottom: 5,
    color: "red",
  },
});

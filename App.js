import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Product from "./components/Product";
import NavigationButton from "./components/Button";

function HomeScreen({ navigation }) {
  return (
    <View
      style={{
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <NavigationButton navigation={navigation} navigateTo="Men" text="Men" />
      <NavigationButton
        navigation={navigation}
        navigateTo="Women"
        text="Women"
      />
      <NavigationButton navigation={navigation} navigateTo="Cart" text="Cart" />
      <NavigationButton
        navigation={navigation}
        navigateTo="Orders"
        text="Orders"
      />
      <NavigationButton
        navigation={navigation}
        navigateTo="Login"
        text="Login"
      />
      <NavigationButton
        navigation={navigation}
        navigateTo="Register"
        text="Register"
      />
    </View>
  );
}

function Men({ route }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Men's Items</Text>
    </View>
  );
}

function Women({ route }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Women's Items</Text>
    </View>
  );
}

function Cart({ route }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Cart Items</Text>
    </View>
  );
}

function Orders({ route }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Your orders</Text>
    </View>
  );
}
function Login({ route }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Login</Text>
    </View>
  );
}

function Register({ route }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Register</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Men" component={Men} />
        <Stack.Screen name="Women" component={Women} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="Orders" component={Orders} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

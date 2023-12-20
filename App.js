import { StyleSheet, Text, View, FlatList } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Product from "./components/Product";
import NavigationButton from "./components/NavigationButton";
import { useEffect, useState } from "react";

import axios from "axios";

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
  const [products, setProducts] = useState([]);
  const url = process.env.EXPO_PUBLIC_API_URL;

  useEffect(() => {
    function fetchProducts(gender) {
      axios({
        url: url + "get-products",
        params: { gender: gender },
      })
        .then((res) => {
          setProducts(res.data.products);
        })
        .catch((err) => console.log(err));
    }
    fetchProducts("male");
  }, []);

  return (
    <View style={{ height: "100%", width: "100%" }}>
      <FlatList
        data={products}
        renderItem={({ item: product }) => (
          <Product
            productName={product.name}
            imageUrl={product.imageUrl}
            price={product.price}
            id={product._id}
          />
        )}
      />
    </View>
  );
}

function Women({ route }) {
  const url = process.env.EXPO_PUBLIC_API_URL;

  const [products, setProducts] = useState([]);

  useEffect(() => {
    function fetchProducts(gender) {
      axios({
        url: url + "get-products",
        params: { gender: gender },
      })
        .then((res) => {
          setProducts(res.data.products);
        })
        .catch((err) => console.log(err));
    }
    fetchProducts("woman");
  }, []);

  return (
    <View style={{ height: "100%", width: "100%" }}>
      <FlatList
        data={products}
        renderItem={({ item: product }) => (
          <Product
            productName={product.name}
            imageUrl={product.imageUrl}
            price={product.price}
            id={product._id}
          />
        )}
      />
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

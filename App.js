import {
  Text,
  View,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState, useReducer, useContext } from "react";

import { HomeScreen } from "./components/HomeScreen";
import { Products } from "./components/Products";
import { ProductDetails } from "./components/ProductDetails";
import { Cart } from "./components/Cart";

import { CartDispatchContext, CartContext } from "./context/CartContext";
import { cartReducer } from "./reducers/cartReducer";

import axios from "axios";

// function Cart({ route }) {
//   const cart = useContext(CartContext);

//   const totalPrice = cart?.reduce((acc, cartItem) => {
//     return acc + cartItem.price * cartItem.quantity;
//   }, 0);

//   return (
//     <View
//       style={{
//         flex: 1,
//         alignItems: "center",
//         paddingBottom: 20,
//       }}
//     >
//       <FlatList
//         contentContainerStyle={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//         data={cart}
//         keyExtractor={(item, index) => index}
//         renderItem={({ item, index }) => (
//           <CartItem
//             imageUrl={item.imageUrl}
//             name={item.productName}
//             price={item.price}
//             quantity={item.quantity}
//             size={item.size}
//             id={item.id}
//           />
//         )}
//       ></FlatList>
//       <Text
//         style={{
//           textAlign: "left",
//           width: 250,
//           marginVertical: 20,
//           fontSize: 18,
//           fontWeight: 500,
//         }}
//       >
//         Total: £{parseFloat(totalPrice).toFixed(2)}
//       </Text>
//       <TouchableOpacity
//         style={{
//           width: 250,
//           height: 40,
//           borderWidth: 1,
//           borderColor: "black",
//           marginTop: 10,
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         <Text style={{ fontSize: 19 }}>Order</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

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
  const [cart, dispatchCart] = useReducer(cartReducer, []);

  return (
    <CartContext.Provider value={cart}>
      <CartDispatchContext.Provider value={dispatchCart}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="home">
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Products" component={Products} />
            <Stack.Screen
              name="ProductDetails"
              component={ProductDetails}
              options={{ title: "" }}
            />
            <Stack.Screen name="Cart" component={Cart} />
            <Stack.Screen name="Orders" component={Orders} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </Stack.Navigator>
        </NavigationContainer>
      </CartDispatchContext.Provider>
    </CartContext.Provider>
  );
}

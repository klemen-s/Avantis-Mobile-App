import { FlatList, View, Text, TouchableOpacity } from "react-native";
import { CartItem } from "./CartItem";
import { CartContext, CartDispatchContext } from "../context/CartContext";
import { useContext, useEffect, useState } from "react";
import { getItemAsync } from "expo-secure-store";

import axios from "axios";

export function Cart({ navigation }) {
  const url = process.env.EXPO_PUBLIC_API_URL + "post-order";

  const cart = useContext(CartContext);
  const cartDispatch = useContext(CartDispatchContext);
  const [checkoutError, setCheckoutError] = useState(false);
  const [isCartEmpty, setIsCartEmpty] = useState(true);

  const totalPrice = cart?.reduce((acc, cartItem) => {
    return acc + cartItem.price * cartItem.quantity;
  }, 0);

  useEffect(() => {
    if (cart.length === 0) setIsCartEmpty(true);
    else setIsCartEmpty(false);
  }, [cart]);

  async function handleCheckout() {
    if (cart.length === 0) {
      setCheckoutError(true);
    } else {
      setCheckoutError(false);
    }

    try {
      let userId;
      userId = await getItemAsync("userId");

      await axios({
        url: url,
        data: { userId: userId, orderItems: cart },
        method: "POST",
      });

      cartDispatch({ type: "CHECKOUT" });
      navigation.navigate("Orders");
    } catch (error) {
      console.log(error);
      setCheckoutError(true);
    }
  }

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        paddingBottom: 20,
      }}
    >
      {!isCartEmpty && (
        <FlatList
          contentContainerStyle={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          data={cart}
          keyExtractor={(item, index) => index}
          renderItem={({ item }) => (
            <CartItem
              imageUrl={item.imageUrl}
              name={item.productName}
              price={item.price}
              quantity={item.quantity}
              size={item.size}
              id={item.id}
            />
          )}
        />
      )}
      {isCartEmpty && (
        <View
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>Cart is empty.</Text>
        </View>
      )}
      {!isCartEmpty && (
        <Text
          style={{
            textAlign: "left",
            width: 250,
            marginVertical: 20,
            fontSize: 18,
            fontWeight: 500,
          }}
        >
          Total: £{parseFloat(totalPrice).toFixed(2)}
        </Text>
      )}
      {checkoutError && (
        <Text
          style={{
            textAlign: "left",
            width: 250,
            marginVertical: 5,
            color: "red",
          }}
        >
          An error occured, please try again.
        </Text>
      )}
      {!isCartEmpty && (
        <TouchableOpacity
          style={{
            width: 250,
            height: 40,
            borderWidth: 1,
            borderColor: "black",
            marginTop: 10,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={handleCheckout}
        >
          <Text style={{ fontSize: 19 }}>Order</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

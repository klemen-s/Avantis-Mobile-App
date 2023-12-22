import { FlatList, View, Text, TouchableOpacity } from "react-native";
import { CartItem } from "./CartItem";
import { CartContext } from "../context/CartContext";
import { useContext } from "react";

export function Cart() {
  const cart = useContext(CartContext);

  const totalPrice = cart?.reduce((acc, cartItem) => {
    return acc + cartItem.price * cartItem.quantity;
  }, 0);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        paddingBottom: 20,
      }}
    >
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
      ></FlatList>
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
      >
        <Text style={{ fontSize: 19 }}>Order</Text>
      </TouchableOpacity>
    </View>
  );
}

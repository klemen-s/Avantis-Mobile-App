import { useContext } from "react";
import { Image, View, Text, TouchableOpacity } from "react-native";
import { CartDispatchContext } from "../context/CartContext";

export function CartItem({ name, price, id, imageUrl, quantity, size }) {
  const cartDispatch = useContext(CartDispatchContext);

  function handleRemoveItem() {
    cartDispatch({ type: "REMOVE", product: { id: id, size: size } });
  }

  return (
    <View
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 40,
      }}
    >
      <Image
        style={{ width: "100%", height: 300, resizeMode: "cover" }}
        source={{ uri: imageUrl }}
      />
      <View
        style={{
          width: 250,
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          marginTop: 10,
          marginBottom: 10,
        }}
      >
        <Text style={{ fontWeight: 500 }}>{name}</Text>
        <Text>Size: {size}</Text>
        <Text>Quantity: {quantity}</Text>
        <Text>Price: £{price}</Text>
        <TouchableOpacity
          style={{
            width: "100%",
            height: 30,
            marginTop: 10,
            borderWidth: 1,
            bordercolor: "black",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={handleRemoveItem}
        >
          <Text>Remove Item</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

import { Image, View, Text } from "react-native";

export function CartItem({ name, price, id, imageUrl, quantity }) {
  return (
    <View
      key={id}
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
        <Text>Price: £{price}</Text>
        <Text>Quantity: {quantity}</Text>
      </View>
    </View>
  );
}

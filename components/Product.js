import { Button, Image, Text, View, TouchableOpacity } from "react-native";

export default function Product({
  productName,
  imageUrl,
  id,
  price,
  navigation,
}) {
  return (
    <View
      style={{
        width: "100%",
        height: 500,
        marginVertical: 60,
      }}
    >
      <Image
        style={{
          width: "100%",
          height: "100%",
          resizeMode: "contain",
        }}
        source={{ uri: imageUrl }}
      />
      <TouchableOpacity
        style={{
          width: "100%",
          height: 30,
          paddingTop: 3,
        }}
        onPress={() => navigation.navigate("ProductDetails", { productId: id })}
      >
        <Text
          style={{
            width: "100%",
            height: "100%",
            fontSize: 20,
            textAlign: "center",
          }}
        >
          Details
        </Text>
      </TouchableOpacity>
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          marginBottom: 10,
          marginTop: 9,
        }}
      >
        <Text style={{ fontSize: 17, fontWeight: "400" }}>{productName}</Text>
        <Text style={{ fontSize: 16, marginTop: 5 }}>{price}</Text>
      </View>
    </View>
  );
}

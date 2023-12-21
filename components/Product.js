import { Image, Text, View } from "react-native";

export default function Product({ productName, imageUrl, id, price }) {
  return (
    <View
      style={{
        width: "100%",
        height: 500,
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 35,
      }}
    >
      <Image
        style={{ width: "100%", height: "100%", resizeMode: "contain" }}
        source={{ uri: imageUrl }}
      />
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 10,
          marginTop: 7
        }}
      >
        <Text style={{ fontSize: 17, fontWeight: "400" }}>{productName}</Text>
        <Text style={{ fontSize: 16, marginTop: 5 }}>{price}</Text>
      </View>
    </View>
  );
}

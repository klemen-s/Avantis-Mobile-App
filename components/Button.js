import { Text, View, TouchableOpacity } from "react-native";

export default function NavigationButton({ text, navigateTo, navigation }) {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(navigateTo)}
      style={{
        backgroundColor: "white",
        width: 130,
        height: 35,
        margin: 15,
        shadowColor: "black",
        borderColor: "black",
        borderWidth: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ fontSize: 15 }}>{text}</Text>
    </TouchableOpacity>
  );
}

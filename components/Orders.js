import axios from "axios";
import { useEffect, useState } from "react";
import { FlatList, Text, Image, StyleSheet } from "react-native";
import { getItemAsync } from "expo-secure-store";
import { OrderItem } from "./OrderItem";

export function Orders() {
  const url = process.env.EXPO_PUBLIC_API_URL + "get-orders";
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const userId = await getItemAsync("userId");

        const res = await axios({
          url: url,
          data: { userId: userId },
          method: "POST",
        });

        setOrders(res.data.orders);
      } catch (error) {
        console.log(error);
      }
    }

    fetchOrders();
  }, []);

  return (
    <FlatList
      data={orders}
      renderItem={({ item, index }) => {
        return <OrderItem order={item} />;
      }}
      keyExtractor={(item, index) => index}
      contentContainerStyle={style.container}
    />
  );
}

const style = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    aligItems: "center",
    marginHorizontal: 30,
  },
});

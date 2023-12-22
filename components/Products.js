import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import Product from "./Product";
import axios from "axios";

export function Products({ route, navigation }) {
  const { gender } = route.params;

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
    fetchProducts(gender);
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
            navigation={navigation}
          />
        )}
      />
    </View>
  );
}

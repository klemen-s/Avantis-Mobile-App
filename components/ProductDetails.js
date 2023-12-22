import {
  View,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useState, useContext, useEffect } from "react";
import axios from "axios";

import { CartDispatchContext } from "../context/CartContext";

export function ProductDetails({ route }) {
  const { productId } = route.params;
  const url = process.env.EXPO_PUBLIC_API_URL + "get-product";

  const [product, setProduct] = useState({});
  const [sizes, setSizes] = useState([]);
  const [selectSize, setSelectSize] = useState("");

  const cartDispatch = useContext(CartDispatchContext);

  const addToCartHandler = () => {
    if (selectSize !== undefined) {
      const price = product.price.slice(1);
      cartDispatch({
        type: "added",
        product: {
          productName: product.name,
          size: selectSize,
          quantity: 1,
          imageUrl: product.imageUrl,
          price: parseFloat(price).toFixed(2),
          id: product._id,
        },
      });

      setSelectSize(undefined);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 24,
      backgroundColor: "#eaeaea",
    },
    btnNormal: {
      borderWidth: 1,
      borderColor: "black",
      width: "100%",
      height: 40,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "50%",
    },
    sizeBtn: {
      width: 40,
      height: 40,
      backgroundColor: "#f2f2f2",
      fontSize: 15,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    sizeBtnClicked: {
      width: 40,
      height: 40,
      backgroundColor: "black",
      fontSize: 15,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  });

  useEffect(() => {
    async function fetchProduct(productId) {
      try {
        const res = await axios({ url: url, params: { productId: productId } });
        setProduct(res.data.product);
        setSizes(res.data.product.sizes);
      } catch (error) {
        console.log(error);
      }
    }

    fetchProduct(productId);
  }, []);

  return (
    <ScrollView styles={{ flex: 1, flexDirection: "column" }}>
      <Image
        style={{ width: "100%", height: 491, resizeMode: "contain" }}
        source={{ uri: product.imageUrl }}
      />
      <View
        style={{
          marginTop: 20,
          width: "100%",
          height: 100,
          flex: 1,
          paddingHorizontal: 10,
        }}
      >
        <Text style={{ fontSize: 17, marginBottom: 5, fontWeight: 500 }}>
          {product.name}
        </Text>
        <Text style={{ fontSize: 17 }}>{product.price}</Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            height: 200,
            marginTop: 15,
            columnGap: 20,
            flexWrap: "wrap",
          }}
        >
          {sizes.map((size, index) => {
            return (
              <TouchableOpacity
                style={
                  selectSize == size ? styles.sizeBtnClicked : styles.sizeBtn
                }
                key={index}
                onPress={() => setSelectSize(size)}
              >
                <Text
                  style={
                    selectSize == size
                      ? {
                          color: "white",
                          textAlignVertical: "center",
                          textAlign: "center",
                        }
                      : {
                          color: "black",
                          textAlignVertical: "center",
                          textAlign: "center",
                        }
                  }
                >
                  {size}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 60,
          marginBottom: 20,
        }}
      >
        <TouchableOpacity
          style={styles.btnNormal}
          onPress={() => addToCartHandler()}
        >
          <Text style={{ fontSize: 15 }}>Add To Cart</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

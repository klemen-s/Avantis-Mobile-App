import {
  Text,
  View,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState, useReducer, useContext } from "react";

import Product from "./components/Product";
import NavigationButton from "./components/NavigationButton";
import { CartItem } from "./components/CartItem";
import { CartDispatchContext, CartContext } from "./context/CartContext";
import { cartReducer } from "./reducers/cartReducer";

import axios from "axios";

function HomeScreen({ navigation }) {
  return (
    <View
      style={{
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <NavigationButton
        navigation={navigation}
        navigateTo="Products"
        text="Men"
        gender="male"
      />
      <NavigationButton
        navigation={navigation}
        navigateTo="Products"
        text="Women"
        gender="woman"
      />
      <NavigationButton navigation={navigation} navigateTo="Cart" text="Cart" />
      <NavigationButton
        navigation={navigation}
        navigateTo="Orders"
        text="Orders"
      />
      <NavigationButton
        navigation={navigation}
        navigateTo="Login"
        text="Login"
      />
      <NavigationButton
        navigation={navigation}
        navigateTo="Register"
        text="Register"
      />
    </View>
  );
}

function Products({ route, navigation }) {
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

function ProductDetails({ route }) {
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

function Cart({ route }) {
  const cart = useContext(CartContext);

  return (
    <FlatList
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      data={cart}
      renderItem={({ item }) => <CartItem />}
    >
      <Text>Cart Items</Text>
    </FlatList>
  );
}

function Orders({ route }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Your orders</Text>
    </View>
  );
}
function Login({ route }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Login</Text>
    </View>
  );
}

function Register({ route }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Register</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  const [cart, dispatchCart] = useReducer(cartReducer, []);

  return (
    <CartContext.Provider value={cart}>
      <CartDispatchContext.Provider value={dispatchCart}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="home">
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Products" component={Products} />
            <Stack.Screen
              name="ProductDetails"
              component={ProductDetails}
              options={{ title: "" }}
            />
            <Stack.Screen name="Cart" component={Cart} />
            <Stack.Screen name="Orders" component={Orders} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </Stack.Navigator>
        </NavigationContainer>
      </CartDispatchContext.Provider>
    </CartContext.Provider>
  );
}

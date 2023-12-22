import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useReducer, useEffect } from "react";
import { getItemAsync } from "expo-secure-store";

import { HomeScreen } from "./components/HomeScreen";
import { Products } from "./components/Products";
import { ProductDetails } from "./components/ProductDetails";
import { Cart } from "./components/Cart";
import { Register } from "./components/Register";
import { Login } from "./components/Login";

import { CartDispatchContext, CartContext } from "./context/CartContext";
import { AuthContext, AuthDispatchContext } from "./context/AuthContext";
import { cartReducer } from "./reducers/cartReducer";
import { authReducer } from "./reducers/authReducer";

function Orders({ route }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Your orders</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  const [cart, dispatchCart] = useReducer(cartReducer, []);
  const [auth, dispatchAuth] = useReducer(authReducer, {
    isSignout: false,
    userToken: null,
    isLoading: true,
    userId: null,
  });

  useEffect(() => {
    async function fetchUserStorageToken() {
      let userToken;
      let userId;

      try {
        userToken = await getItemAsync("userToken");
        userId = await getItemAsync("userId");
      } catch (error) {
        userToken = null;
      }

      dispatchAuth({ type: "RESTORE_TOKEN", token: userToken });
    }

    fetchUserStorageToken();
  }, []);

  return (
    <AuthContext.Provider value={auth}>
      <AuthDispatchContext.Provider value={dispatchAuth}>
        <CartContext.Provider value={cart}>
          <CartDispatchContext.Provider value={dispatchCart}>
            <NavigationContainer>
              <Stack.Navigator initialRouteName="Home">
                {auth.isSignout == true ? (
                  <>
                    <Stack.Screen name="Home" component={HomeScreen} />
                    <Stack.Screen name="Products" component={Products} />
                    <Stack.Screen
                      name="ProductDetails"
                      component={ProductDetails}
                      options={{ title: "" }}
                    />
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="Register" component={Register} />
                    <Stack.Screen name="Cart" component={Cart} />
                  </>
                ) : (
                  <>
                    <Stack.Screen name="Home" component={HomeScreen} />
                    <Stack.Screen name="Products" component={Products} />
                    <Stack.Screen
                      name="ProductDetails"
                      component={ProductDetails}
                      options={{ title: "" }}
                    />
                    <Stack.Screen name="Cart" component={Cart} />
                    <Stack.Screen name="Orders" component={Orders} />
                  </>
                )}
              </Stack.Navigator>
            </NavigationContainer>
          </CartDispatchContext.Provider>
        </CartContext.Provider>
      </AuthDispatchContext.Provider>
    </AuthContext.Provider>
  );
}

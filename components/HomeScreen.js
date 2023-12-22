import { View } from "react-native";
import NavigationButton from "./NavigationButton";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { Logout } from "./Logout";

export function HomeScreen({ navigation }) {
  const cart = useContext(CartContext);
  const numberOfItemsInCart = cart.length;
  const cartTitle = "Cart (" + numberOfItemsInCart + ")";

  const auth = useContext(AuthContext);

  return (
    <View
      style={{
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {auth.isSignout == true ? (
        <>
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
          <NavigationButton
            navigation={navigation}
            navigateTo="Cart"
            text={cartTitle}
          />
        </>
      ) : (
        <>
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
          <NavigationButton
            navigation={navigation}
            navigateTo="Cart"
            text={cartTitle}
          />
          <NavigationButton
            navigation={navigation}
            navigateTo="Orders"
            text="Orders"
          />
          <Logout />
        </>
      )}
    </View>
  );
}

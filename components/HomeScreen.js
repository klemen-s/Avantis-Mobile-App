import { View } from "react-native";
import NavigationButton from "./NavigationButton";

export function HomeScreen({ navigation }) {
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
        <NavigationButton
          navigation={navigation}
          navigateTo="Cart"
          text="Cart"
        />
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
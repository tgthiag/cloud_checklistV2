import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Checklist from "./src/screens/checklist";
import MainPage from "./src/screens/main";
import Report from "./src/screens/report";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { registerRootComponent } from "expo";
import { MyProvider } from "./src/services/dataContext";
import LoginScreen from "./src/screens/loginScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <MyProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={"login"}>
          <Stack.Screen
          name="login"
          component={LoginScreen}
          />
          <Stack.Screen
            name="main"
            component={MainPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="checklist"
            component={Checklist}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="report"
            component={Report}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
        {/* <Toast position={"bottom"} bottomOffset={90} /> */}
      </NavigationContainer>
    </MyProvider>
  );
}
registerRootComponent(() => App());
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

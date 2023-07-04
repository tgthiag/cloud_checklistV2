import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Checklist from "./src/components/screens/flap";
import MainPage from "./src/components/screens/main";
import Report from "./src/components/screens/report";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { registerRootComponent } from "expo";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName={"main"}>
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
  );
}
registerRootComponent(()=>App())
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

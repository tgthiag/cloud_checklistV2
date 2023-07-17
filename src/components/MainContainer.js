import { ImageBackground, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

export default function MainContainer({ children }) {
  return (
    <LinearGradient
      // Background Linear Gradient
      colors={["rgba(100,100,255,0.6)","rgba(10,0,0,0.6)", "#000020"]}
      style={styles.container}
    >
      <SafeAreaView style={styles.centerContainer}>{children}</SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  centerContainer: {
    width: "90%",
    height: "95%",
    backgroundColor: "rgba(255,255,255,0.6)",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    borderLeftWidth: 0.1,
    borderBottomWidth: 0.8,
    borderRightWidth: 0.1,
  },
});

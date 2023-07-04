import React from "react";
import {
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { listSectors } from "../../../../lists";
import TurnoSelect from "../../functions/turnoSelect";

const sgaBackground = require("../../../../assets/sga.jpg");
const logo = require("../../../../assets/sga_logo.png");

export default function MainPage({ navigation }) {
  const RelatorioButton = () => {
    return (
      <TouchableOpacity
        style={{
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 12,
        }}
        onPress={() => navigation.navigate("report")}
      >
        <LinearGradient
          style={{
            width: "60%",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 30,
            padding: 5,
          }}
          colors={[
            "rgba(255,255,255,0.5)",
            "rgba(100,100,100,0.5)",
            "rgba(100,100,100,0.5)",
            "rgba(50,50,50,0.5)",
          ]}
        >
          <Text
            style={{
              fontWeight: "bold",
              color: "rgba(0, 0, 0, 0.9)",
              textShadowColor: "rgba(255,255,255,0.9)",
              textShadowOffset: { width: -2, height: 1 },
              textShadowRadius: 5,
              fontSize: 16,
            }}
          >
            RELATÓRIOS
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={sgaBackground} style={styles.ImageBackground}>
        <SafeAreaView style={styles.centerContainer}>
          <Image source={logo} style={styles.logo} />
          <TurnoSelect />
          <FlatList
            style={{ width: "100%" }}
            data={listSectors}
            ListFooterComponent={RelatorioButton}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={{
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 10,
                }}
                onPress={() =>
                  global.checkValue !== 0
                    ? navigation.navigate("checklist", {
                        setores: item.lista,
                        fireDBName: item.key,
                      })
                    : alert("Selecione o turno")
                }
              >
                <LinearGradient
                  style={{
                    width: "60%",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 30,
                    padding: 5,
                  }}
                  colors={[
                    "rgba(255,255,255,0.5)",
                    "rgba(100,100,100,0.5)",
                    "rgba(100,100,100,0.5)",
                    "rgba(50,50,50,0.5)",
                  ]}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      color: "rgba(0, 0, 0, 0.9)",
                      textShadowColor: "rgba(255,255,255,0.7)",
                      textShadowOffset: { width: -2, height: 1 },
                      textShadowRadius: 5,
                      fontSize: 16,
                    }}
                  >
                    {item.name}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            )}
          />
        </SafeAreaView>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  ImageBackground: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  centerContainer: {
    width: "90%",
    height: "95%",
    backgroundColor: "rgba(60,60,60,0.3)",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    borderLeftWidth: 0.1,
    borderBottomWidth: 0.8,
    borderRightWidth: 0.1,
  },
  logo: {
    justifyContent: "center",
    marginBottom: 15,
  },
  button: {
    margin: 20,
  },
});

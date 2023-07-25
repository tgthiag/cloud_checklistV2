import React, { useEffect, useState } from "react";
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
import loadQuestions from "../../services/loadquestions";
import { useFirebaseData } from "../../services/getDataFromFirebase";
import MainContainer from "../../components/MainContainer";

const sgaBackground = require("../../../assets/sga.jpg");
const logo = require("../../../assets/sga_logo.png");

export default function MainPage({ navigation }) {
  const [listSectors, setListSectors] = useState(null);
  const data = loadQuestions();
  const firebaseData = useFirebaseData();

  useEffect(() => {
    if (data) {
      const updatedListSectors = Object.entries(data).map(([key, lista]) => ({
        name: key,
        lista: lista.map((item) => item.question),
        key: key,
      }));
      setListSectors(updatedListSectors);
    }
  }, [data]);
  const RelatorioButton = () => {
    return (
      <TouchableOpacity
        style={{
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 12,
        }}
        onPress={() =>
          navigation.navigate("report", {
            questions: data,
            fireData: firebaseData,
          })
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
            "rgba(140,140,140,0.5)",
            "rgba(140,140,140,0.5)",
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
    <MainContainer>
      <Image source={logo} style={styles.logo} />
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
              navigation.navigate("checklist", {
                setores: item.lista,
                fireDBName: item.key,
                fireData: firebaseData,
              })
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
                "rgba(140,140,140,0.5)",
                "rgba(140,140,140,0.5)",
                "rgba(50,50,50,0.5)",
              ]}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  color: "rgba(0, 0, 0, 0.9)",
                  textShadowColor: "rgba(255,255,255,0.7)",
                  textShadowOffset: { width: -2, height: 1 },
                  textShadowRadius: 3,
                  fontSize: 16,
                }}
              >
                {item.name}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
      />
    </MainContainer>
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

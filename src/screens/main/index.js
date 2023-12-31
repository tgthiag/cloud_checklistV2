import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import loadQuestions from "../../services/loadquestions";
import { useFirebaseData } from "../../services/getDataFromFirebase";
import MainContainer from "../../components/MainContainer";
import { auth } from "../../../database";
import { MyContext } from "../../services/dataContext";

const sgaBackground = require("../../../assets/sga.jpg");
const logo = require("../../../assets/garantia-de-qualidade.png");

export default function MainPage({ navigation }) {
  const [listSectors, setListSectors] = useState(null);
  const data = loadQuestions();
  const firebaseData = useFirebaseData();
  const { currentUser, updateUser } = useContext(MyContext);

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

  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        updateUser("")
        navigation.replace("login");
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  };

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
          {/* Render the logout icon button in the header */}
          <TouchableOpacity
        onPress={handleLogout}
        style={{ position: "absolute", top: 20, right: 20 }}
      >
        <Ionicons name="log-out-outline" size={24} color="black" />
      </TouchableOpacity>
      <View>
      <Image source={logo} style={styles.logo} />
      </View>
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
  logo: {
    width: 150, // Set the desired width in pixels
    height: 150, // Set the desired height in pixels
    marginBottom: 15,
  },
  button: {
    margin: 20,
  },
});

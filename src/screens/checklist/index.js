import React, { useState, useEffect, useContext } from "react";
import {
  ImageBackground,
  StyleSheet,
  FlatList,
  Text,
  View,
  TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MyRadioBt from "../../components/radioBt";
import { getDatabase, ref, update } from "firebase/database";
import { db } from "../../../database";
import { getCurrentDate } from "../../functions/getDate";
import { dbpath } from "../../config/dbpath";
import { MyContext } from "../../services/dataContext";
import MainContainer from "../../components/MainContainer";

const sgaBackground = require("../../../assets/sga.jpg");

const Checklist = ({ route }) => {
  const [setor, setSetor] = useState({ name: route.params.fireDBName });
  const [listas, setListas] = useState(route.params.setores);
  const [contextTurno, setContextTurno] = useState(global.checkValue);
  const firebaseData = route.params.fireData;
  const { currentUser } = useContext(MyContext);
  console.log(currentUser);

  const updateValueDb = (result, placed) => {
    const database = getDatabase(db);
    const key = `${contextTurno}_${placed + 1}`;
    const value = result;
    update(
      ref(
        database,
        `data/${dbpath}/records/${setor.name}/${getCurrentDate()}/`
      ),
      {
        [key]: value,
      }
    );
  };

  return (
    <MainContainer>
      <FlatList
        data={listas}
        renderItem={({ item, index }) => (
          <TouchableWithoutFeedback>
            <View
              style={[
                styles.container,
                {
                  backgroundColor: "rgba(0,0,0,0.6)",
                  margin: 3,
                  borderRadius: 15,
                  justifyContent: "center",
                  alignItems: "center",
                },
              ]}
              numColumns={2}
              flexDirection={"row"}
            >
              <Text style={styles.pontosText}>{item}</Text>
              {firebaseData && (
                <MyRadioBt
                  firebaseData={firebaseData}
                  dailyId={`${contextTurno}_${index + 1}`}
                  setor={setor.name}
                  callback={(value) => {
                    updateValueDb(value, index);
                  }}
                />
              )}
            </View>
          </TouchableWithoutFeedback>
        )}
      />
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  imgBackground: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "center",
  },
  pontosText: {
    margin: 15,
    width: "62%",
    fontWeight: "bold",
    color: "#d3d3d3",
  },
});

export default Checklist;

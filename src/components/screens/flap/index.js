import React, { Component } from "react";
import { getDatabase, ref, update } from "firebase/database";
import {
  ImageBackground,
  StyleSheet,
  FlatList,
  Text,
  View,
  TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MyRadioBt from "../../functions/radioBt";
import { db } from "../../../../database";
import { getCurrentDate } from "../../functions/getDate";

const sgaBackground = require("../../../../assets/sga.jpg");

export default class Checklist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: 0,
      setor: { name: this.props.route.params.fireDBName },
      listas: this.props.route.params.setores,
      contextTurno: global.checkValue,
    };
  }

  updateValueDb(result, placed) {
    const database = getDatabase(db);
    const key = `${this.state.contextTurno}_${placed + 1}`;
    const value = result;
    update(
      ref(database, `records/${this.state.setor.name}/${getCurrentDate()}/`),
      {
        [key]: value,
      }
    );
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground source={sgaBackground} style={styles.imgBackground}>
          <FlatList
            data={this.state.listas}
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
                  <MyRadioBt
                    dailyId={`${this.state.contextTurno}_${index + 1}`}
                    setor={this.state.setor.name}
                    callback={(value) => {
                      this.updateValueDb(value, index);
                    }}
                  />
                </View>
              </TouchableWithoutFeedback>
            )}
          />
        </ImageBackground>
      </SafeAreaView>
    );
  }
}
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

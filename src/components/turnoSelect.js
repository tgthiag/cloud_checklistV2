import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { RadioButton } from "react-native-paper";

export default function TurnoSelect() {
  const [checkValue, setCheckValue] = useState(0);

  global.checkValue = checkValue;

  return (
    <View
      numColumns={6}
      flexDirection={"row"}
      columnWrapperStyle={{ flex: 2 }}
      style={{ justifyContent: "space-between", margin: 5 }}
    >
      <Text style={styles.textTurno}>1ºT</Text>
      <RadioButton
        value="1"
        status={checkValue === 1 ? "checked" : "unchecked"}
        tit
        onPress={() => {
          setCheckValue(1);
        }}
        color="#a8a8a8"
      />
      <Text style={styles.textTurno}>2ºT</Text>
      <RadioButton
        value="0"
        status={checkValue === 2 ? "checked" : "unchecked"}
        onPress={() => {
          setCheckValue(2);
        }}
        color="#a8a8a8"
      />
      <Text style={styles.textTurno}>3ºT</Text>
      <RadioButton
        value="3"
        status={checkValue === 3 ? "checked" : "unchecked"}
        onPress={() => {
          setCheckValue(3);
        }}
        color="#a8a8a8"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  textTurno: {
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});

import React, { Component } from "react";
import { View, Text } from "react-native";
import { RadioButton } from "react-native-paper";
import { db } from "../../../database";
import { ref, onValue, getDatabase } from "firebase/database";
import { getCurrentDate } from "./getDate";

class MyRadioBt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: 3,
    };
  }
  holder(number) {
    this.props.callback(number);
  }

  componentDidMount() {
    const { dailyId } = this.props;
    const { setor } = this.props;
    const atual = setor;
    const database = getDatabase(db);
    const reference = ref(database, `records/${atual}/${getCurrentDate()}/`);

    onValue(
      reference,
      (snapshot) => {
        const data = snapshot.val();
        (data != null) & (dailyId != null)
          ? this.setState({ checked: data[dailyId] })
          : this.setState({ checked: 3 });
      },
      {
        onlyOnce: true,
      }
    );
  }

  render() {
    return (
      <View
        numColumns={3}
        flexDirection={"row"}
        columnWrapperStyle={{ flex: 2 }}
      >
        <RadioButton
          value="1"
          status={this.state.checked === 1 ? "checked" : "unchecked"}
          onPress={() => {
            this.holder(1);
            this.setState({ checked: 1 });
          }}
          color="#00b900"
        />
        <RadioButton
          value="0"
          status={this.state.checked === 0 ? "checked" : "unchecked"}
          onPress={() => {
            this.holder(0);
            this.setState({ checked: 0 });
          }}
          color="#ff5c5c"
        />
        <RadioButton
          value="3"
          status={this.state.checked === 3 ? "checked" : "unchecked"}
          onPress={() => {
            this.holder(3);
            this.setState({ checked: 3 });
          }}
          color="#a8a8a8"
        />
      </View>
    );
  }
}

export default MyRadioBt;

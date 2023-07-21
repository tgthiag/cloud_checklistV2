import React, { Component } from "react";
import { View } from "react-native";
import { RadioButton } from "react-native-paper";
import { getCurrentDate } from "../functions/getDate";


class MyRadioBt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: 3,
    };
  }

  componentDidMount() {
    const { firebaseData, dailyId, setor } = this.props;
    if (firebaseData && setor) {
      const setorAtual = setor;
      const date = getCurrentDate();
      const checkedValue = firebaseData?.[setorAtual]?.[date];
      (firebaseData != null) & (dailyId != null) & (checkedValue !== undefined)
      ? this.setState({ checked: checkedValue[dailyId] === 1 || checkedValue[dailyId] == 0 ? checkedValue[dailyId] : 3})
      : this.setState({ checked: 3 });
    }
  }

  holder(number) {
    this.props.callback(number);
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

import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  ImageBackground,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MainContainer from "../../components/MainContainer";
import Title from "../../components/title";

const sgaBackground = require("../../../assets/sga.jpg");

class Report extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listSectors: this.props.route.params.questions,
      generalData: [],
      reportDate: [],
      showView: null,
      setorPercent: [],
      data: null,
      users: null,
      dataLoaded: false, // Add a flag to track if data is loaded
    };
  }

  componentDidMount() {
    let date = new Date();
    let datenow = [date.getFullYear(), date.getMonth() + 1];
    this.setState({
      reportDate: datenow,
    });

    const firebaseData = this.props.route.params.fireData;
    this.setState({ data: firebaseData });
    this.loadData(datenow[0], datenow[1], firebaseData);
  }

  backColor(percent, opacity) {
    if (percent < 90 && percent > 80) {
      return `rgba(255, 242, 0, 0.${opacity})`;
    } else if (percent < 90) {
      return `rgba(223, 112, 0, 0.${opacity})`;
    }
    console.log(
      "backColor",
      this.state.generalData,
      "            ",
      this.state.setorPercent
    );
  }

  // loadData(year, month, data) {
  //   console.log("start loading data")
  //   let verifications = 0;
  //   let isOk = 0;
  //   let errors = 0;
  //   let setorVerifications = 0;
  //   let setorIsOk = 0;
  //   let usernames= {}
  //   for (
  //     let idxLista = 0;
  //     idxLista < this.state.listSectors.length;
  //     idxLista++
  //   ) {
  //     // verify Y times, Y = list length
  //     let acumulator = [];

  //     for (
  //       let y = 1;
  //       y < this.state.listSectors[idxLista].lista.length + 1;
  //       y++
  //     ) {

  //       // Entering folder, accessing dates
  //       const sectorKeyData = data[this.state.listSectors[idxLista].key];
  //       console.log(idxLista,data[this.state.listSectors[idxLista].key])
  //       if (sectorKeyData) {
  //         const filteredData = Object.fromEntries(
  //           Object.entries(sectorKeyData).filter(([key]) =>
  //             key.includes(`${year}-${month}`)
  //           )
  //         );
  //         // console.log(filteredData)
  //       //   for (let i in filteredData) {
  //       //     // Accessing the key/values on every date
  //       //     const dateData = filteredData[i];
  //       //     console.log("i",i)
  //       //     console.log("datedata",dateData)
  //       //     for (let x in dateData) {
  //       //       console.log("x",x)
  //       //       // console.log(dateData) //is running 5 times
  //       //       const username = x.split("_")[0];

  //       //       if (!usernames[username]) {
  //       //         usernames[username] = {
  //       //           verifications: 0,
  //       //           isOk: 0,
  //       //           errors: 0,
  //       //         };
  //       //       }

  //       //       let value = dateData[x];
  //       //     if (value === 1) {
  //       //       verifications += 1;
  //       //       isOk += 1;
  //       //       usernames[username].isOk += 1;
  //       //       usernames[username].verifications += 1;
  //       //     } else if(value === 0){
  //       //       verifications += 1;
  //       //       errors += 1;
  //       //       usernames[username].verifications += 1;
  //       //     }
  //       //       // switch (value) {
  //       //       //   case 1:
  //       //       //     verifications += 1;
  //       //       //     isOk += 1;
  //       //       //     usernames[username].isOk += 1;
  //       //       //     usernames[username].verifications += 1;
  //       //       //     break;
  //       //       //   case 0:
  //       //       //     verifications += 1;
  //       //       //     errors += 1;
  //       //       //     usernames[username].verifications += 1;
  //       //       //     break;
  //       //       //   default:
  //       //       //     break;
  //       //       // }
  //       //     }
  //       //   }
  //       //   this.setState({ dataLoaded: true });
  //       // }
  //         }
  //       acumulator.push({
  //         ...(acumulator[this.state.listSectors[idxLista].key] || {}),
  //         text: this.state.listSectors[idxLista].lista[y - 1],
  //         verif: verifications,
  //         errors: errors,
  //         percent: ((isOk / verifications) * 100).toFixed(2),
  //       });
  //       setorVerifications += verifications;
  //       setorIsOk += isOk;
  //       verifications = 0;
  //       isOk = 0;
  //       errors = 0;
  //     }
  //     let percent = ((setorIsOk / setorVerifications) * 100).toFixed(2);
  //     this.setState((previous) => ({
  //       setorPercent: {
  //         ...previous.setorPercent,
  //         [this.state.listSectors[idxLista].key]: percent,
  //       },
  //     }));

  //     this.setState((previous) => ({
  //       generalData: {
  //         ...previous.generalData,
  //         [this.state.listSectors[idxLista].key]: acumulator,
  //       },
  //     }));
  //     setorIsOk = 0;
  //     setorVerifications = 0;
  //   }
  //   console.log(usernames)
  // }
  loadData(year, month, data) {
    let verifications = 0;
    let isOk = 0;
    let errors = 0;
    let setorVerifications = 0;
    let setorIsOk = 0;
    let usernames = {};
    // console.log(data)
    console.log(this.state.listSectors)
    for (setor in this.state.listSectors) {
      let acumulator = [];
      for (
        let itemQuestion = 1;
        itemQuestion < this.state.listSectors[setor].length + 1;
        itemQuestion++
      ) {
        // console.log(setor, this.state.listSectors[setor].length)

        if (data[setor]) {
          console.log(setor, data[setor]);
          //filtered data output {"17500020_11": 1, "17500020_9": 1}
          const filteredData = Object.fromEntries(
            Object.entries(data[setor]).filter(([item]) =>
              item.startsWith(`${year}-${month}`)
            )
          );
          for (let userverification in filteredData) {
            const dayVerification = filteredData[userverification];
            for (key in dayVerification) {
              const verificationPoint = key.split("_")[1];
              const username = key.split("_")[0];
              const valueEvaluated = dayVerification[key]

              if (verificationPoint == itemQuestion.toString()){
                console.log("key", dayVerification[key])
                switch (valueEvaluated) {
                  case 1:
                    console.log("VERIFFF + 1")
                    verifications += 1;
                    isOk += 1;
                    // usernames[username].isOk += 1;
                    // usernames[username].verifications += 1;
                    break;
                  case 0:
                    console.log("VERIFFF + 1")
                    verifications += 1;
                    errors += 1;
                    // usernames[username].verifications += 1;
                    break;
                  default:
                    break;
                }
              }
            }
          }
        }
        console.log("this.state.listSectors[setor][itemQuestion]",this.state.listSectors[setor][0].question)
                acumulator.push({
          ...(acumulator[setor] || {}),
          text: this.state.listSectors[setor][0].question,
          verif: verifications,
          errors: errors,
          percent: ((isOk / verifications) * 100).toFixed(2),
        });
        console.log(acumulator)
      }
    }
  }

  handleChange(props) {
    console.log(this.state.generalData);
    console.log(this.state.setorPercent);
    if (props === "<") {
      if (this.state.reportDate[1] > 1) {
        return this.setState(
          {
            reportDate: [
              this.state.reportDate[0],
              this.state.reportDate[1] - 1,
            ],
          },
          () => {
            this.loadData(
              this.state.reportDate[0],
              this.state.reportDate[1],
              this.state.data
            );
          }
        );
      } else {
        return this.setState(
          {
            reportDate: [
              this.state.reportDate[0] - 1,
              (this.state.reportDate[1] = 12),
            ],
          },
          () => {
            this.loadData(
              this.state.reportDate[0],
              this.state.reportDate[1],
              this.state.data
            );
          }
        );
      }
    }
    if (props === ">") {
      if (this.state.reportDate[1] < 12) {
        return this.setState(
          {
            reportDate: [
              this.state.reportDate[0],
              this.state.reportDate[1] + 1,
            ],
          },
          () => {
            this.loadData(
              this.state.reportDate[0],
              this.state.reportDate[1],
              this.state.data
            );
          }
        );
      } else {
        return this.setState(
          {
            reportDate: [
              this.state.reportDate[0] + 1,
              (this.state.reportDate[1] = 1),
            ],
          },
          () => {
            this.loadData(
              this.state.reportDate[0],
              this.state.reportDate[1],
              this.state.data
            );
          }
        );
      }
    }
  }

  render() {
    return (
      <MainContainer>
        <View style={styles.containerBackground}>
          <Title children={"Relatórios"} />
          <View
            style={{ flexDirection: "row", justifyContent: "space-evenly" }}
          >
            <Text
              onPress={() => this.handleChange("<")}
              style={{ fontSize: 18 }}
            >
              ◀
            </Text>
            <Text
              style={{
                justifyContent: "center",
                alignSelf: "center",
                fontWeight: "bold",
                marginBottom: 3,
                fontSize: 18,
              }}
            >
              {this.state.reportDate[1] < 10
                ? "0" + this.state.reportDate[1]
                : this.state.reportDate[1]}
              /{this.state.reportDate[0]}
            </Text>
            <Text
              onPress={() => this.handleChange(">")}
              style={{ fontSize: 18 }}
            >
              ▶
            </Text>
          </View>
          <ScrollView>
            {Object.keys(this.state.generalData).map((sectorKey, index) => (
              <View key={index}>
                <TouchableOpacity
                  onPress={() =>
                    this.state.showView === index
                      ? this.setState({ showView: null })
                      : this.setState({ showView: index })
                  }
                >
                  <View
                    style={{
                      margin: 5,
                      backgroundColor: "rgba(255, 255, 255, 0.6)",
                      padding: 5,
                      borderRadius: 10,
                    }}
                  >
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        width: "100%",
                        justifyContent: "space-between",
                        marginVertical: 2,
                      }}
                    >
                      <Text
                        style={{
                          alignSelf: "flex-start",
                          marginLeft: 10,
                          fontWeight: "bold",
                          fontSize: 22,
                        }}
                      >
                        {this.state.listSectors[index]}
                      </Text>
                      <View
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: 15,
                          padding: 5,
                          backgroundColor:
                            this.state.showView !== index
                              ? this.backColor(
                                  this.state.setorPercent[
                                    this.state.listSectors[index]
                                  ],
                                  15
                                )
                              : null,
                        }}
                      >
                        <Text
                          style={{
                            alignSelf: "center",
                            marginLeft: 10,
                            fontWeight: "bold",
                            fontSize: 16,
                          }}
                        >
                          {this.state.setorPercent[
                            this.state.listSectors[index]
                          ] !== "NaN"
                            ? this.state.setorPercent[
                                this.state.listSectors[index]
                              ] + "%"
                            : "-"}
                        </Text>
                      </View>
                    </View>
                    {this.state.showView !== null &&
                      this.state.showView === index &&
                      this.state.generalData[sectorKey].map((each, index) => (
                        <View
                          key={index}
                          style={{
                            backgroundColor: this.backColor(each.percent, 3),
                            margin: 3,
                            borderRadius: 5,
                            padding: 2,
                          }}
                        >
                          <Text style={{ fontWeight: "bold" }}>
                            {each.text}
                          </Text>
                          <Text>
                            Verificações: {each.verif} Erros: {each.errors}{" "}
                            Percentual: {each.percent}%
                          </Text>
                        </View>
                      ))}
                  </View>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>
      </MainContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  containerBackground: {},
});

export default Report;

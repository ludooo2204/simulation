//TODO enregistrer foursData dans un nouveau copmposant permettant de store en local d nouveau four et des nouveau pts de simulation
//TODO changer les setTimeout des setState et mettre des callbacks!!
//TODO mettre l'heure de la saisie et non celle de l'envoi sur le server

// les données ne sont enregistrées que lors de la validation du dernier point de mesures PAR VOIE !

// import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNBluetoothClassic, {
  BTEvents,
  BTCharsets,
} from 'react-native-bluetooth-classic';
import {
  Button,
  TouchableOpacity,
  Text,
  TextInput,
  View,
  ScrollView,
  ActivityIndicator,
  Alert,
  Pressable,
} from 'react-native';

import React from 'react';
import {styles} from './style';
import {foursData} from './fourData';
const RNFS = require('react-native-fs');
const path = RNFS.DownloadDirectoryPath;
import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
// import Share from 'react-native-share';

const Stack = createStackNavigator();


//TODO bouton pour valider la valeur de la sensibilité et l'envoyer a la suite du string des valeur de points.
const VoieDeMesure = ({voies, onPress, voieSelected}) => {
  let voieDeMesureFour = voies.voiesDeMesure;
  let styleVoie = styles.voieText;
  let styleVoie2 = styles.voieTextSelected;

  return (
    <ScrollView horizontal={true}>
      {voieDeMesureFour.map((voie, i) => {
        let bgColor = '#0f0';
        return (
          <TouchableOpacity
            key={Math.random()}
            style={voie.name == voieSelected ? styleVoie2 : styleVoie}
            onPress={() => onPress(voie)}>
            <Text style={styles.voieName}>
              {voie.name + ' - type ' + voie.typeTc}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const DeviceList = ({devices, onPress, style}) => {
  return (
    <ScrollView
      style={styles.listContainer}
      contentContainerStyle={styles.container}>
      {devices.map((device, i) => {
        let bgColor = device.connected
          ? '#0f0'
          : styles.connectionStatus.backgroundColor;
        return (
          <TouchableOpacity
            key={device.id}
            style={[styles.button, style]}
            onPress={() => onPress(device)}>
            <View
              style={[styles.connectionStatus, {backgroundColor: bgColor}]}
            />
            <View style={{flex: 1}}>
              <Text style={styles.deviceName}>{device.name}</Text>
              <Text>{device.address}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};
const FourList = ({fours, onPress, onLongPress, fourSelected}) => {
  let styleFour = styles.fourText;
  let styleFour2 = styles.fourTextSelected;
  return (
    <ScrollView horizontal={true}>
      {fours.map((four, i) => {
        let bgColor = '#0f0';
        return (
          <TouchableOpacity
            key={four.id}
            style={four.name == fourSelected.name ? styleFour2 : styleFour}
            onPress={() => onPress(four)}
            onLongPress={() => onLongPress(four)}>
            <Text style={styles.fourName}>{four.name}</Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

/////une fois connecté
class ConnectionScreen extends React.Component {
  constructor(props) {
    super(props);
    this.myTextInput = React.createRef();

    this.state = {
      fourSelectionne: '',
      voieSelectionne: '',
      text: undefined,
      scannedData: [],
      fourList: foursData,
      pointSimule: '',
      cleDataSave: '',
      DataToSave: '',
      VoiesValidees: '',
    };
    this.test = '';
  }

  storeData = async (value) => {
    try {
      let dataCle = this.state.cleDataSave.toString();

      await AsyncStorage.setItem(dataCle, String(value));
    } catch (e) {
      // saving error
    }
  };
  incrementSensibilite = () => {
    let tempIncremente = (parseFloat(this.state.pointSimule) + 0.1).toFixed(1);
    tempIncremente = 'SOUR ' + tempIncremente;

    this.setState({pointSimule: tempIncremente});

    this.SendDataAuto(tempIncremente);
  };

  decrementSensibilite = () => {
    let tempDecremente = (parseFloat(this.state.pointSimule) - 0.1).toFixed(1);
    tempDecremente = 'SOUR ' + tempDecremente;

    this.setState({pointSimule: tempDecremente});

    this.SendDataAuto(tempDecremente);
  };
  lireDATA = async () => {
    try {
      let dataCle = this.state.cleDataSave.toString();

      const valueSaved = await AsyncStorage.getItem(dataCle);

      if (valueSaved !== null) {
        Alert.alert('value ' + valueSaved);
        //TODO voir pour la validation des voies controlées (pour ne pas uploader les  voies non controlées)
        Alert.alert('voieSelectionner ' + this.state.VoiesValidees);
      }
    } catch (e) {
      // error reading value
      console.log(e);
    }
  };

  // getData = async () => {
  //   try {
  //     let dataCle = this.state.cleDataSave.toString();

  //     const valueSaved = await AsyncStorage.getItem(dataCle);
  //     // const valueSaved = await AsyncStorage.getItem('ludo')

  //     if (valueSaved !== null) {
  //       Alert.alert('value ' + valueSaved);
  //     }
  //   } catch (e) {
  //     // error reading value
  //     console.log(e);
  //   }
  // };
  getDataFour = async (cle) => {
    try {
      const valueSaved = await AsyncStorage.getItem(cle);

      this.test += valueSaved;
    } catch (e) {
      // error reading value
      console.log(e);
    }
  };

  controleSensibilite = () => {
    let temp = this.state.fourSelectionne.pointSensibilité;

    let consigneSensibilite = 'SOUR ' + temp;
    this.setState({pointSimule: consigneSensibilite});
    this.SendDataAuto(consigneSensibilite);
  };

  getAllData = async (four) => {
    try {
      let nom = four.name;
      let DataFourToTranfer = {};
      this.test = '';
      DataFourToTranfer.date = new Date().toLocaleString('fr-FR');
      DataFourToTranfer.nomFour = nom;
      DataFourToTranfer.data = [];

      four.cle = '';
      let voiesDeMesure = [];
      voiesDeMesure = four.voiesDeMesure;

      for (const voie of voiesDeMesure) {
        four.cle = nom + '-' + voie.name;

        this.getDataFour(four.cle);
      }

      setTimeout(() => {
        let data = this.test.split('\n');
        // console.log('this.test')
        // console.log(this.test)
        // for (const iterator of data) {
        //   if (iterator != '') {
        //     let dataPoint = {};
        //     let dataInter = iterator.split(';');
        //     dataPoint.name = dataInter[0];
        //     dataPoint.points = dataInter.slice(1);

        //     DataFourToTranfer.data.push(dataPoint);
        //   }
        // }
        console.log(DataFourToTranfer.data);
        console.log(DataFourToTranfer.data);
        let stringToTransfert =
          DataFourToTranfer.nomFour +
          '\n' +
          DataFourToTranfer.date +
          '\n' +
          this.test;
        console.log(stringToTransfert);

        this.storeDataPourUnFour(stringToTransfert);
      }, 500);
    } catch (e) {
      // error reading value
      console.log(e);
    }
  };
  storeDataPourUnFour = async (value) => {
    try {
      let Cle = this.state.fourSelectionne.name;
      //   const options ={
      //     title: "This is my report ",
      //     message: String(value),
      //     url:  "file:///storage/emulated/0/test.txt",
      //     subject: "Report",
      // }
      await AsyncStorage.setItem(Cle, String(value));
      RNFS.writeFile(path + '/' + Cle + '.csv', String(value), 'utf8')
        .then((success) => {
          console.log('success');
          console.log(success);
          Alert.alert(
            'creation du fichier effectué!' + path + '/' + Cle + '.csv',
          );
        })
        .catch((err) => {
          console.log(err);
        });

      // Share.open(options)
      // .then((res) => {
      //   console.log("share Sucess!");
      //   console.log(res);
      // })
      // .catch((err) => {
      //   err && console.log(err);
      // });
    } catch (e) {
      // saving error
      console.log(e);
      Alert.alert('probleme !', e);
    }
  };

  handleInput(data) {
    let indexSimulation = this.state.fourSelectionne.points.indexOf(
      parseInt(this.state.pointSimule),
    );

    let nextPoint = this.state.fourSelectionne.points[indexSimulation + 1];

    this.myTextInput.current.clear();
    this.myTextInput.current.focus();
    this.setState({DataToSave: this.state.DataToSave + ';' + data}, () => {
      if (nextPoint) {
        let consigneNextPoint = 'SOUR ' + nextPoint;
        this.setState({pointSimule: nextPoint});
        this.SendDataAuto(consigneNextPoint);
      } else {
        this.myTextInput.current.blur();

        let dataFourToSave = this.state.DataToSave + '\n';
        this.storeData(dataFourToSave);
        let stringVoievalidee =
          this.state.VoiesValidees + ' ' + this.state.voieSelectionne;
        this.setState({VoiesValidees: stringVoievalidee});

        Alert.alert(
          'SENSIBILITE',
          'Controle de la sensibilité?',
          [
            {
              text: 'Cancel',
              // onPress: () => this.getData(),
              style: 'cancel',
            },
            {text: 'OK', onPress: () => this.controleSensibilite()},
          ],
          {cancelable: false},
        );

        //   this.getData()
      }
    });
  }
  componentDidMount() {
    this.onRead = RNBluetoothClassic.addListener(
      BTEvents.READ,
      this.handleRead,
      this,
    );
    this.SendDataAuto('rem');
  }

  //Selection du four
  selectFour = (four) => {
    this.test = '';
    this.setState({fourSelectionne: four});
    this.SendDataAuto('SOUR:Func TC');
  };
  //Selection de la voie
  selectVoie = (voie) => {
    this.test = voie.name;

    this.setState({voieSelectionne: voie.name});
    this.setState({DataToSave: voie.name});
    setTimeout(() => {
      let cleString =
        this.state.fourSelectionne.name + '-' + this.state.voieSelectionne;

      this.setState({cleDataSave: cleString});
      let fourSelectionne = this.state.fourSelectionne;
      let premierPoint = fourSelectionne.points[0];
      let consigne = 'SOUR ' + fourSelectionne.points[0];
      this.SendDataAuto('SOUR:tcouple:type ' + voie.typeTc);
      setTimeout(() => {
        this.SendDataAuto(consigne);
        this.myTextInput.current.focus();
      }, 100);
    }, 500);
  };

  // choisirFour = (four) => Alert.alert("four")
  componentWillUnmount() {
    this.onRead.remove();

    RNBluetoothClassic.disconnect();
  }

  pollForData = async () => {
    var available = 0;

    do {
      console.log('Checking for available data');
      available = await RNBluetoothClassic.available();
      console.log(`There are ${available} bytes of data available`);

      if (available > 0) {
        console.log('Attempting to read the next message from the device');
        const data = await RNBluetoothClassic.readFromDevice();

        console.log(data);
        this.handleRead({data});
      }
    } while (available > 0);
  };

  handleRead = (data) => {
    data.timestamp = new Date();
    let scannedData = this.state.scannedData;
    scannedData.unshift(data);
    this.setState({scannedData});
  };

  sendData = async () => {
    console.log('send');
    let message = '';
    message = this.state.text + '\r'; // For commands
    await RNBluetoothClassic.write(message);

    let scannedData = this.state.scannedData;
    scannedData.unshift({
      timestamp: new Date(),
      data: this.state.text,
      type: 'sent',
    });
    this.setState({text: '', scannedData});
  };

  SendDataAuto = async (consigne) => {
    this.setState({pointSimule: consigne.slice(5)});
    let message = consigne + '\r'; // For commands
    await RNBluetoothClassic.write(message);
  };

  render() {
    // console.log('this.state')
    // console.log(this.state)
    return (
      <View style={styles.container}>
        <View style={styles.listFourContainer}>
          <FourList
            fourSelected={this.state.fourSelectionne}
            fours={this.state.fourList}
            onPress={this.selectFour}
            onLongPress={this.getAllData}
          />
        </View>
        <View style={{flex: 10}}>
          {this.state.fourSelectionne.name == undefined ? (
            <Text>Choisissez un four</Text>
          ) : (
            <View style={{flex: 1}}>
              <View style={{flex: 1}}>
                <VoieDeMesure
                  voieSelected={this.state.voieSelectionne}
                  voies={this.state.fourSelectionne}
                  onPress={this.selectVoie}
                />
              </View>

              <View style={{flex: 3}}>
                <Text style={{padding: 5, textAlign: 'center', fontSize: 20}}>
                  {'Points a controler  ' + this.state.fourSelectionne.points}
                </Text>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    flexDirection: 'row',
                  }}>
                  <Pressable onPress={this.decrementSensibilite}>
                    <Text
                      style={{
                        paddingHorizontal: 30,
                        fontSize: 70,
                        fontWeight: 'bold',
                      }}>
                      -
                    </Text>
                  </Pressable>

                  {this.state.pointSimule.includes('tcouple') ? (
                    <ActivityIndicator size="small" color="black" />
                  ) : (
                    <Text
                      style={{
                        padding: 2,
                        textAlign: 'center',
                        fontSize: 40,
                        borderWidth: 3,
                        borderRadius: 10,
                        width: '40%',
                        fontWeight: 'bold',
                      }}>
                      {this.state.pointSimule.includes('Func')
                        ? '-'
                        : this.state.pointSimule}{' '}
                      °C
                    </Text>
                  )}

                  <Pressable onPress={this.incrementSensibilite}>
                    <Text
                      style={{
                        paddingHorizontal: 30,
                        fontSize: 70,
                        fontWeight: 'bold',
                      }}>
                      +
                    </Text>
                  </Pressable>
                </View>
              </View>

              <View
                style={{
                  flex: 3,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {this.state.voieSelectionne == '' ? null : (
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      margin: '5%',
                      flexDirection: 'row',
                      borderWidth: 3,
                      borderRadius: 10,
                      width: '70%',
                    }}>
                    <TextInput
                      ref={this.myTextInput}
                      autoFocus={true}
                      // onBlur={() => {
                      //   console.log('blur');
                      // }}
                      // onLayout={() => console.log('layout')}
                      textAlign={'center'}
                      blurOnSubmit={false}
                      keyboardType="numeric"
                      onSubmitEditing={(e) =>
                        this.handleInput(e.nativeEvent.text)
                      }
                      style={styles.input}></TextInput>
                    <Text style={{fontSize: 40, fontWeight: 'bold'}}>°C</Text>
                  </View>
                )}
              </View>
            </View>
          )}
        </View>

        <View style={[styles.horizontalContainer, {backgroundColor: '#ccc'}]}>
          <TextInput
            style={styles.textInput}
            placeholder={'Send Data'}
            value={this.state.text}
            onChangeText={(text) => this.setState({text})}
            autoCapitalize="none"
            autoCorrect={false}
            onSubmitEditing={() => this.sendData()}
            returnKeyType="send"
          />
          <TouchableOpacity
            style={{justifyContent: 'center'}}
            onPress={() => this.sendData()}>
            <Text>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export {ConnectionScreen, FourList, DeviceList};

import React from 'react';
import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  StatusBar,
  KeyboardAvoidingView,
  ActivityIndicator
} from "react-native";
import RNBluetoothClassic, {
  BTEvents,
  BTCharsets,
} from 'react-native-bluetooth-classic';
import {
  Root,
  Container,
  Toast,
  Header,
  Title,
  Button,
  Right,
  Left,
  Icon,
  Body,
  StyleProvider,
} from 'native-base';
import getTheme from './native-base-theme/components';
import material from './native-base-theme/variables/material';
import platform from './native-base-theme/variables/platform';

const DeviceList = ({devices, onPress, style}) => {
  console.log('DeviceList.render()');
  console.log(devices);

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
const FourList = ({fours, onPress, style}) => {
  console.log('fourList.render()');
  console.log(fours);

  return (
    <ScrollView
      style={styles.listContainer}
      // contentContainerStyle={styles.container}
      >
      {fours.map((four, i) => {
        let bgColor = '#0f0';
        return (
          <TouchableOpacity
            key={four.id}
            style={[styles.button, style]}
            onPress={() => onPress(four)}>
            {/* <View
              style={[styles.connectionStatus, {backgroundColor: bgColor}]}
            /> */}
            <View style={{flex: 1}}>
              <Text style={styles.fourName}>{four.name}</Text>
              <Text>{four.points}</Text>
            </View>
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
    this.state = {
      text: undefined,
      scannedData: [],
      fourList: [{name:'mini',id:1,points:[10,20,30]},{name:'c1',id:2,points:[100,20,30]},{name:'c2',id:3,points:[10,20,300]},{name:'mini',id:4,points:[10,20,30]},{name:'c1',id:5,points:[100,20,30]},{name:'c2',id:6,points:[10,20,300]},{name:'mini',id:7,points:[10,20,30]},{name:'c1',id:9,points:[100,20,30]},{name:'c2',id:90,points:[10,20,300]},{name:'mini',id:10,points:[10,20,30]},{name:'c1',id:11,points:[100,20,30]},{name:'c2',id:12,points:[10,20,300]},{name:'mini',id:13,points:[10,20,30]},{name:'c1',id:14,points:[100,20,30]},{name:'c2',id:15,points:[10,20,300]},{name:'mini',id:16,points:[10,20,30]}],
    };
  }

  componentDidMount() {
    console.log("c'est parti");
    this.onRead = RNBluetoothClassic.addListener(
      BTEvents.READ,
      this.handleRead,
      this,
    );
    //this.poll = setInterval(() => this.pollForData(), 3000);
  }

  selectFour = four => console.log(four)

// choisirFour = (four) => Alert.alert("four")
  componentWillUnmount() {
    this.onRead.remove();
    //clearInterval(this.poll);

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

  handleRead = data => {
    data.timestamp = new Date();
    let scannedData = this.state.scannedData;
    scannedData.unshift(data);
    this.setState({scannedData});
  };

  sendData = async () => {
    console.log("send");
    
    let message = this.state.text + '\r'; // For commands
    console.log("message");
    console.log(message);
    await RNBluetoothClassic.write(message);

    let scannedData = this.state.scannedData;
    scannedData.unshift({
      timestamp: new Date(),
      data: this.state.text,
      type: 'sent',
    });
    this.setState({text: '', scannedData});

  };
  //todo
  testSend = async () => {
    console.log("sendTest");
    
    let message = 'sour 1120' + '\r'; // For commands
    console.log("message");
    console.log(message);
    await RNBluetoothClassic.write(message);

    let scannedData = this.state.scannedData;
    scannedData.unshift({
      timestamp: new Date(),
      data: this.state.text,
      type: 'sent',
    });
    this.setState({text: '', scannedData});

  };

  render() {
    console.log('DeviceConnection.render()');

    console.log(this.state);

    return (
      <Container>
        {/* <Header style={{ height:10}}>
          <Left>
            <Title>{this.props.device.name}</Title>
          </Left>
          <Right>
            <TouchableOpacity onPress={this.props.disconnect}>
              <Text style={[styles.toolbarButton, {color: '#F00'}]}>X</Text>
            </TouchableOpacity>
          </Right>
        </Header> */}
        <View style={{flex: 1,backgroundColor:"#a3a0a0"}}>
        <FourList  fours={this.state.fourList}
                    onPress={this.selectFour}
                    />


          <View style={[styles.horizontalContainer, {backgroundColor: '#ccc'}]}>
            <TextInput
              style={styles.textInput}
              placeholder={'Send Data'}
              value={this.state.text}
              onChangeText={text => this.setState({text})}
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



            {/* historique des envois et retour */}
          <FlatList
            style={{flex: 1,backgroundColor:"#a3a0a0"}}
            contentContainerStyle={{justifyContent: 'flex-end'}}
            inverted
            ref="scannedDataList"
            data={this.state.scannedData}
            keyExtractor={(item, index) => item.timestamp.toISOString()}
            renderItem={({item}) => (
              <View
                id={item.timestamp.toISOString()}
                style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                <Text>{item.timestamp.toLocaleDateString()}</Text>
                <Text>{item.type === 'sent' ? ' < ' : ' > '}</Text>
                <Text style={{flexShrink: 1}}>{item.data.trim()}</Text>
              </View>
            )}
          />
        </View>
      </Container>
    );
  }
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deviceList: [],
      connectedDevice: undefined,
      scannedData: [],
      isAccepting: false,
      isDiscovering: false
    };
  }

  componentDidMount() {
    this.initialize();
    this.subs = [];

    // Re-initialize whenever a Bluetooth event occurs
    this.subs.push(
      RNBluetoothClassic.addListener(
        BTEvents.BLUETOOTH_CONNECTED,
        device => this.onConnected(device),
        this,
      ),
    );
    this.subs.push(
      RNBluetoothClassic.addListener(
        BTEvents.BLUETOOTH_DISCONNECTED,
        device => this.onDisconnected(device),
        this,
      ),
    );
    this.subs.push(
      RNBluetoothClassic.addListener(
        BTEvents.CONNECTION_LOST,
        error => this.onConnectionLost(error),
        this,
      ),
    );
    this.subs.push(
      RNBluetoothClassic.addListener(
        BTEvents.ERROR,
        error => this.onError(error),
        this,
      ),
    );
  }

  componentWillUnmount() {
    this.subs.forEach(sub => sub.remove());
  }

  onConnected(device) {
    Toast.show({
      text: `Connected to ${device.name}`,
      duration: 3000,
    });
    this.initialize();
  }

  onDisconnected(device) {
    Toast.show({
      text: `Connection to ${device.name} was disconnected`,
      duration: 3000,
    });
    this.initialize();
  }

  onConnectionLost(error) {
    Toast.show({
      text: `la connexion avec  ${error.device.name} a été perdue`,
      duration: 3000,
    });
    this.initialize();
  }

  onError(error) {
    Toast.show({
      text: `${error.message}`,
      duration: 3000,
    });
    this.initialize();
  }

  async initialize() {
    let enabled = await RNBluetoothClassic.isEnabled();
    this.setState({ bluetoothEnabled: enabled });

    if (enabled) {
      this.refreshDevices();
    }    
  }

  async refreshDevices() {
    let newState = {
      devices: [],
      connectedDevice: undefined,
    };
   
    try {
      let connectedDevice = await RNBluetoothClassic.getConnectedDevice();

      console.log('initializeDevices::connectedDevice');
      console.log(connectedDevice);
      newState.connectedDevice = connectedDevice;
    } catch (error) {
      try {
        let devices = await RNBluetoothClassic.list();

        console.log('initializeDevices::list');
        console.log(devices);
        newState.deviceList = devices;
      } catch (error) {
        console.error(error.message);
      }
    }

    this.setState(newState);
  }

  async connectToDevice(device) {
    console.log(`connexion en cours ${device.id}`);
    Toast.show({
      text: `Connection to ${device.name} en cours !!`,
      duration: 1000,
    });
    try {
      await RNBluetoothClassic.setEncoding(BTCharsets.ASCII);
      let connectedDevice = await RNBluetoothClassic.connect(device.id);
      this.setState({connectedDevice});
    } catch (error) {
      console.log(error.message);
      Toast.show({
        text: `Connection to ${device.name} unsuccessful`,
        duration: 3000,
      });
    }
  }

  async disconnectFromDevice() {
    await RNBluetoothClassic.disconnect();
    this.setState({connectedDevice: undefined});
  }

  async acceptConnections() {
    console.log("App is accepting connections now...");
    this.setState({ isAccepting: true });

    try {
      let connectedDevice = await RNBluetoothClassic.accept();

      if (connectedDevice) {
        this.setState({ connectedDevice, isAccepting: false });
      }      
    } catch(error) {
      console.log(error);
      Toast.show({
        text: `Unable to accept client connection`,
        duration: 3000,
      });
      this.setState({ isAccepting: false });
    }
  }

  async cancelAcceptConnections() {
    console.log("...");
    
    try {
      await RNBluetoothClassic.cancelAccept();
      this.setState({ isAccepting: false });
    } catch(error) {
      console.log(error);
      Toast.show({
        text: `Unable to cancel accept client connection`,
        duration: 3000,
      });
    }
  }

  async discoverDevices() {
    console.log("Attempting to discover devices...");
    this.setState({ isDiscovering: true });

    try {
      const unpaired = await RNBluetoothClassic.discoverDevices();
      console.log("Unpaired Devices");
      console.log(unpaired);
      Toast.show({
        text: `Found ${unpaired.length} unpaired devices.`,
        duration: 3000
      })
    } catch(error) {
      console.log(error);
      Toast.show({
        text: `Error occurred while attempting to discover devices`,
        duration: 3000
      });
    } finally {
      this.setState({ isDiscovering: false });
    }
  }

  async cancelDiscoverDevices() {
    console.log(`Attempting to cancel discovery...`);

    try {
      await RNBluetoothClassic.cancelDiscovery();
      this.setState({ isDiscovering: false });
    } catch(error) {
      console.log(error);
      Toast.show({
        text: `Error occurred while attempting to cancel discover devices`,
        duration: 3000
      });
    }
  }

  refresh = () => this.refreshDevices();
  selectDevice = device => this.connectToDevice(device);
  unselectDevice = () => this.disconnectFromDevice();
  accept = () => this.acceptConnections();
  cancelAccept = () => this.cancelAcceptConnections();
  discover = () => this.discoverDevices();
  cancelDiscover = () => this.cancelDiscoverDevices();

  render() {
    console.log('App.render()');
    console.log(this.state);

    let connectedColor = !this.state.bluetoothEnabled
      ? styles.toolbarButton.color
      : 'green';

    let acceptFn = !this.state.isAccepting 
      ? () => this.accept()
      : () => this.cancelAccept();      

    let discoverFn = !this.state.isDiscovering
      ? () => this.discover()
      : () => this.cancelDiscover();

    return (
      // <StyleProvider style={getTheme(platform)}>
        <Root>
          {this.state.connectedDevice ? (
            <ConnectionScreen
              device={this.state.connectedDevice}
              scannedData={this.state.scannedData}
              disconnect={this.unselectDevice}
              onSend={this.onSend}
            />
          ) : (
            <Container >
              <Header>
                <Left>
                  <Title>Appareils</Title>
                </Left>
                <Right>
                  <TouchableOpacity
                    onPress={this.refresh}>
                    <Icon type="Ionicons" name="md-sync" style={styles.toolbarButton} />
                  </TouchableOpacity>
                </Right>
              </Header>
              <DeviceList
                devices={this.state.deviceList}
                onPress={this.selectDevice}
              />



              {/* <TouchableOpacity
                style={styles.startAcceptButton}
                onPress={acceptFn}
              >
                <Text style={[{ color: "#fff" }]}>
                  {this.state.isAccepting
                    ? "Accepting (cancel)..."
                    : "Accept Connection"}
                </Text>
                <ActivityIndicator
                  size={"small"}
                  animating={this.state.isAccepting}
                />
              </TouchableOpacity>    
              <TouchableOpacity
                style={styles.startAcceptButton}
                onPress={discoverFn}
              >
                <Text style={[{ color: "#fff" }]}>
                  {this.state.isDiscovering
                    ? "Discovering (cancel)..."
                    : "Discover Devices"}
                </Text>
                <ActivityIndicator
                  size={"small"}
                  animating={this.state.isDiscovering}
                />
              </TouchableOpacity>                          */}
              
            </Container>
          )}
        </Root>
      // </StyleProvider>
    );
  }
}

/**
 * The statusbar height goes wonky on Huawei with a notch - not sure if its the notch or the
 * Huawei but the fact that the notch is different than the status bar makes the statusbar
 * go below the notch (even when the notch is on).
 */
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 44;

const styles = StyleSheet.create({
  statusbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#222',
  },
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#222',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
    height: APPBAR_HEIGHT,
  },
  toolbarText: {
    flex: 1,
    fontSize: 20,
    color: '#fff',
  },
  toolbarButton: {
    fontSize: 20,
    color: '#fff',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor:'#c2c0bc'
   
  },
  listContainer: {
    flex: 1,
    backgroundColor:"#a6a298",
    borderWidth:3,
    borderColor:"black",
    marginTop:"2%",
    // borderRadius:20
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
  },
  startAcceptButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#333",
    padding: 9,
    marginBottom: 9
  },  
  deviceName: {
    fontSize: 16,
  },
  fourName: {
    fontSize: 30,
    backgroundColor:'#ccc'
  },
  connectionStatus: {
    width: 8,
    backgroundColor: '#ccc',
    marginRight: 16,
    marginTop: 8,
    marginBottom: 8,
  },
  horizontalContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 8,
    paddingBottom: 8,
  },
  textInput: {
    flex: 1,
    height: 40,
  },
});

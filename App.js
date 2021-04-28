import React from 'react';
import axios from 'axios';
import {ConnectionScreen, FourList, DeviceList} from './Connected';
import {styles} from './style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert, Button, Text, View, ActivityIndicator} from 'react-native';
import RNBluetoothClassic, {
  BTEvents,
  BTCharsets,
} from 'react-native-bluetooth-classic';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deviceList: [],
      connectedDevice: undefined,
      scannedData: [],
      isAccepting: false,
      isDiscovering: false,
      isConnecting: false,
      count: 0,
    };
  }

  componentDidMount() {
    this.initialize();
    this.subs = [];

    // Re-initialize whenever a Bluetooth event occurs
    this.subs.push(
      RNBluetoothClassic.addListener(
        BTEvents.BLUETOOTH_CONNECTED,
        (device) => this.onConnected(device),
        this,
      ),
    );
    this.subs.push(
      RNBluetoothClassic.addListener(
        BTEvents.BLUETOOTH_DISCONNECTED,
        (device) => this.onDisconnected(device),
        this,
      ),
    );
    this.subs.push(
      RNBluetoothClassic.addListener(
        BTEvents.CONNECTION_LOST,
        (error) => this.onConnectionLost(error),
        this,
      ),
    );
    this.subs.push(
      RNBluetoothClassic.addListener(
        BTEvents.ERROR,
        (error) => this.onError(error),
        this,
      ),
    );
  }

  componentWillUnmount() {
    this.subs.forEach((sub) => sub.remove());
  }

  onConnected(device) {
    console.log('taratata');
    Alert.alert(`Connected to ${device.name}`);
    this.initialize();
  }

  onDisconnected(device) {
    Alert.alert(`Connection to ${device.name} was disconnected`);
    this.initialize();
  }

  onConnectionLost(error) {
    Alert.alert(`la connexion avec  ${error.device.name} a été perdue`);
    this.initialize();
  }

  onError(error) {
    Alert.alert(`${error.message}`);
    this.initialize();
  }

  async initialize() {
    let enabled = await RNBluetoothClassic.isEnabled();
    this.setState({bluetoothEnabled: enabled});

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
    //todo toast native
    this.setState({isConnecting: true});
    // Alert.alert(`Connection to ${device.name} en cours !!`);
    try {
      await RNBluetoothClassic.setEncoding(BTCharsets.ASCII);
      let connectedDevice = await RNBluetoothClassic.connect(device.id);
      this.setState({connectedDevice});
      console.log('message');
      console.log('rem');
      await RNBluetoothClassic.write('rem' + '\r');
    } catch (error) {
      console.log(error.message);
      Alert.alert(`Connection to ${device.name} unsuccessful`);
    }
  }

  async disconnectFromDevice() {
    await RNBluetoothClassic.disconnect();
    this.setState({connectedDevice: undefined});
  }

  async acceptConnections() {
    console.log('App is accepting connections now...');
    this.setState({isAccepting: true});

    try {
      let connectedDevice = await RNBluetoothClassic.accept();

      if (connectedDevice) {
        this.setState({connectedDevice, isAccepting: false});
      }
    } catch (error) {
      console.log(error);

      this.setState({isAccepting: false});
    }
  }

  async cancelAcceptConnections() {
    console.log('...');

    try {
      await RNBluetoothClassic.cancelAccept();
      this.setState({isAccepting: false});
    } catch (error) {
      console.log(error);
    }
  }

  async discoverDevices() {
    console.log('Attempting to discover devices...');
    this.setState({isDiscovering: true});

    try {
      const unpaired = await RNBluetoothClassic.discoverDevices();
      console.log('Unpaired Devices');
      console.log(unpaired);
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({isDiscovering: false});
    }
  }

  async cancelDiscoverDevices() {
    console.log(`Attempting to cancel discovery...`);

    try {
      await RNBluetoothClassic.cancelDiscovery();
      this.setState({isDiscovering: false});
    } catch (error) {
      console.log(error);
    }
  }

  refresh = () => this.refreshDevices();
  selectDevice = (device) => this.connectToDevice(device);
  unselectDevice = () => this.disconnectFromDevice();
  accept = () => this.acceptConnections();
  cancelAccept = () => this.cancelAcceptConnections();
  discover = () => this.discoverDevices();
  cancelDiscover = () => this.cancelDiscoverDevices();
  storeData = async (value) => {
    try {
      await AsyncStorage.setItem('ludo', String(value));
    } catch (e) {
      // saving error
    }
  };
  ludo = '';
  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('ludo');
      console.log(value);
      if (value !== null) {
        console.log('value ' + value);
      }
    } catch (e) {
      // error reading value
    }
  };

  render() {
    console.log('App.render()');
    console.log('this.state');
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
      <View style={styles.container}>
        {this.state.connectedDevice ? (
          <ConnectionScreen
            device={this.state.connectedDevice}
            scannedData={this.state.scannedData}
            disconnect={this.unselectDevice}
            onSend={this.onSend}
          />
        ) : this.state.isConnecting ? (
          <View style={{flex: 1, justifyContent: 'center'}}>
            <ActivityIndicator size="large" color="black" />
          </View>
        ) : (
          <View style={styles.container}>
            <DeviceList
              devices={this.state.deviceList}
              onPress={this.selectDevice}
            />
          </View>
        )}
      </View>
      // </StyleProvider>
    );
  }
}

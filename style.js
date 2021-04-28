import {
    
    StyleSheet,
  
  } from "react-native";
  /**
 * The statusbar height goes wonky on Huawei with a notch - not sure if its the notch or the
 * Huawei but the fact that the notch is different than the status bar makes the statusbar
 * go below the notch (even when the notch is on).
 */
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
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
      backgroundColor:'#c2c0bc',
      justifyContent:"space-around",
      // fontSize:40
      // padding:"2%",
      // justifyContent: 'center'
     
    },
    listContainer: {
      flex: 1,
      backgroundColor:"#a6a298",
      // fontSize:50,
      
      
      // borderRadius:20
    },
    listFourContainer:{
      flex:1,
      borderColor:"black",
      // borderWidth:2,
      // borderRadius:10,
      margin:"2%",
      paddingVertical:"2%",
     textAlign:"center"
    },
    fourText:{
      margin:1,
      borderWidth:1,
      borderRadius:10,alignItems:'center',justifyContent:'center', backgroundColor:'#ccc'
    }, 
    fourTextSelected:{
      margin:1,
      borderWidth:5,
      borderRadius:10,alignItems:'center',justifyContent:'center', backgroundColor:'#ccc'
    }, 
    voieText:{
      margin:1,
      
      borderWidth:1,
      borderRadius:10,alignItems:'center',justifyContent:'center', backgroundColor:'#ccc'
    }, 
    voieTextSelected:{
      margin:1,
      
      borderWidth:5,
      borderRadius:10,alignItems:'center',justifyContent:'center', backgroundColor:'#ccc'
    }, 
    fourName: {
      fontSize: 40,
      padding:10,
      color:"black",
      fontWeight: "bold",
    },
    fourNameSelected: {
      fontSize: 40,
      padding:10,
      backgroundColor:'black',
      color: 'white',
      fontWeight: "bold",
    },
    input:{
      // borderWidth:3,
      width:"40%",
      // padding:"5%",
      fontSize:40,
      fontWeight:'bold',
      justifyContent: 'center'
    },
    input2:{
      // borderWidth:3,
      width:"40%",
      // padding:"5%",
      fontSize:20,
      fontWeight:'bold',
      justifyContent: 'center'
    },
    voieName: {
      fontSize: 30,
      padding:10,
      fontWeight: "bold",
    },
    voieNameSelected: {
      fontSize: 30,
      padding:10,
      borderWidth:5,
      fontWeight: "bold",
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
      fontSize: 25,
      fontWeight:"bold"
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
      // paddingTop: 8,
      // paddingBottom: 8,
    },
    textInput: {
      flex: 1,
      height: 40,
    },
  });
  export {styles}
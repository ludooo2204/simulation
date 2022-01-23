import React, { useState } from 'react';
import {
   Text,
    View,
    Pressable
  } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
const MajFour = () => {
    const [inputVisible, setinputVisible] = useState(false);
    const ajouterFour=()=>{
        console.log("input");
        setinputVisible(true)
    }
  return <Pressable onPress={ajouterFour}>
      <Text style={{fontSize:30}}>Ajouter four</Text>
      {inputVisible&&<TextInput style={{backgroundColor:"white"}} keyboardType="number-pad"></TextInput>}
      {/* <Text >Ajouter four</Text> */}
  </Pressable>
};

export default MajFour;

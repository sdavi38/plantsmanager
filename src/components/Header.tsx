import React, {useEffect, useState}from 'react'
import {View, StyleSheet, Text, Image} from 'react-native'
import colors from '../../styles/colors'
import fonts from '../../styles/fonts'
import userImg from '../assets/avatar.png'
import {getStatusBarHeight} from 'react-native-iphone-x-helper'
import AsyncStorage from '@react-native-async-storage/async-storage'


export function Header(){
  const [username, setUsename] =useState<String>();
  //Recupenado dados armazenados
  useEffect(()=>{
    async function loadStorageUserName(){
        const user = await AsyncStorage.getItem('@plantmanage:user')
        setUsename(user || '');
    }
   loadStorageUserName()

  },[])
  return(
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>Olá,</Text>
        <Text style={styles.username}>{username}</Text>
      </View>
      <Image style={styles.image}
      source={userImg}/>

    </View>
   


  )
}
const styles = StyleSheet.create({

   container:{
      width:'100%',
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      paddingVertical:20,
      marginTop:getStatusBarHeight(),

  
    },
    greeting:{
      fontSize:32,
      color:colors.heading,
      fontFamily:fonts.text
    },
    username:{
      fontSize:32,
      color:colors.heading,
      fontFamily:fonts.heading,
      lineHeight:40,
    },
    image:{
      width:70,
      height:70,
      borderRadius:40,

}

});
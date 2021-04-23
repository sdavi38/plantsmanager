import React from 'react'
import colors from '../../styles/colors'
import fonts from '../../styles/fonts';
import {Button} from '../components/Button'

import {SafeAreaView, View, Text, StyleSheet} from 'react-native'
import { useNavigation } from '@react-navigation/core';


export function Confirmation(){
  const navigation = useNavigation();
  function handleMoveOn(){
    navigation.navigate('PlantSelect')
  }

  return(
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>
            😏
        </Text>
        <Text style={styles.title}> 
            Prontinho
        </Text>
        <Text style={styles.subTitle}> 
            Agora vamos comerçar a cuidar  das suas 
            plantinhas com muito  carinho.
        </Text>
         
      <View style={styles.footer}>
        <Button onPress={handleMoveOn}
         title="Comerçar" />
      </View> 
      </View>
     
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'space-around'
   
  }, 
  content:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    width:'100%',
    padding:30,
  },
 

emoji:{
  fontSize:83,
},
  title:{
    fontSize:22,
    lineHeight:38,
    textAlign:'center',
    color:colors.heading,
    marginTop:15,
    fontFamily:fonts.heading,


  },

  subTitle:{
    fontSize:17,
    paddingVertical:10,
    textAlign:'center',
    color:colors.heading,
    


  },
  
 
 textInput:{
  width:'100%',
  color:colors.heading, 
  borderBottomWidth: 1,
  borderColor:colors.gray,
  textAlign:'center',
  fontSize:18,
  marginTop:50,
  padding:10,
 }
 ,
 footer:{
   marginTop:40,
   width:'100%',
   paddingHorizontal:20,
  
 }

 
})
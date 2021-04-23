import React from 'react'
import {SafeAreaView ,
  Text, 
  Image, 
  View,
  TouchableOpacity,
  Dimensions,
  StyleSheet} 
  from 'react-native'
import {Ionicons} from '@expo/vector-icons'
import colors from '../../styles/colors'
import fonts from '../../styles/fonts'
import {Button} from '../components/Button'
import wateringimg from '../assets/watering.png'
import { useNavigation } from '@react-navigation/core'

export function Welcome(){
  const navigation = useNavigation();
  function handleStart(){
    navigation.navigate('UserIdentification')
  }
 
  return(
  <SafeAreaView style={styles.container}>
    <View style={styles.wrapper}>
    <Text style={styles.title}>
    Gerencie {'\n'}
    suas plantas de{'\n'}
      forma fácil
    </Text>
 
      <Image
        resizeMode="contain"
       source={wateringimg} 
      style={styles.image}/>
  
 
    <Text style={styles.subTitle}>
    Não esqueça mais de regar suas plantas. Nós cuidamos de lembrar você
    sempre que precisar.
    </Text>
    <TouchableOpacity 
    onPress={handleStart}
    style={styles.button}
    activeOpacity={0.9}>
       
     <Ionicons 
     name='enter-outline'
     style={styles.buttonIcon}
     />
    
    </TouchableOpacity>

    </View>
    
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'space-around' //não cola nas bordas
  }, 
  wrapper:{
    flex:1,
    alignItems:'center',
    justifyContent:'space-around',
    paddingHorizontal:20, //não cola nas bordas
    

  },

  title:{
    fontSize:32,
    fontFamily:fonts.heading,
    fontWeight:'bold',
    textAlign:'center',
    color:colors.heading,
    marginTop:38,
    lineHeight:34,


  },
  image:{
    
    height:Dimensions.get('window').width * 0.7  //adaptação 
  },

  subTitle:{
    textAlign:'center',
    fontSize:18,
    color:colors.heading,
    paddingHorizontal:20,
    fontFamily:fonts.text,


  },

  button:{
    backgroundColor:colors.green,
    justifyContent:'center',
    alignItems:'center',
    alignContent:'center',
    borderRadius:13,
    marginBottom:10,
    height:56,
    width:56,
   
  },
  
  buttonIcon:{
   
    fontSize:42,
    color:colors.white
  } 
 
})
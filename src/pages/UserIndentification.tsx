import { useNavigation } from '@react-navigation/core';
import React,{useState} from 'react'
import {SafeAreaView ,View,
  Text,TextInput, 
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert

} 
  from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import colors from '../../styles/colors'
import fonts from '../../styles/fonts';
import {Button} from '../components/Button'


export function UserIndentification(){
  const navigation = useNavigation();
 
 
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false)
  const [name, setName] = useState<string>()


  function handleFocus(){
  setIsFocused(true)
    
  }
  function handleBlur(){
    setIsFocused(false)
    setIsFilled(!!name)
    
  }
  function handleChange(value:string){
    setIsFilled(!!value);
    setName(value)
    
  }
 async function handleSubmit(){
    if(!name)
      return Alert.alert('Como posso chamar você 😏')
      try{
         await AsyncStorage.setItem('@plantmanage:user', name)
         navigation.navigate('Confirmation')
      }catch{
        Alert.alert('Não foi possível salvar o nome do usuário 😏')
      }
   
  }

  return(
  <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS ==='ios' ? 'padding':'height'}>

        <View style={styles.content}>
         <View style={styles.form}>
           <View style={styles.header}>
          <Text style={styles.emoji}>
                {isFilled ?'😎':'😃'}
             </Text>
             <Text style={styles.title}>
              Como podemos {'\n'}
              chamar você ?{'\n'}
                </Text>
            </View>
             <TextInput 
            style={[
              styles.textInput,
              (isFocused || isFilled) &&{borderColor: colors.green}
            
            ]}
             onFocus={handleFocus}
             onBlur={handleBlur}
             autoCapitalize='words'
             onChangeText={handleChange}
            placeholder="Digite um nome"/>

        <View style={styles.footer}>
        <Button 
        onPress={handleSubmit}
        title="Confirmar" />
        </View>
      
        </View>
       </View>  
      </KeyboardAvoidingView>
        
    
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container:{
    flex:1,
    width:'100%',
    alignItems:'center',
    justifyContent:'space-around'
   
  }, 
  content:{
    flex:1,
    width:'100%'
  },
  form:{
    flex:1,
    justifyContent:'center',
    paddingHorizontal:54,
    alignItems:'center'

  },
  header:{
    alignItems:'center',

  },

emoji:{
  fontSize:44,
},
  title:{
    fontSize:24,
    lineHeight:32,
    fontWeight:'bold',
    textAlign:'center',
    color:colors.heading,
    marginTop:20,
    fontFamily:fonts.heading,


  },

  subTitle1:{
    fontSize:32,
    fontWeight:'bold',
    textAlign:'center',
    color:colors.heading,
    marginTop:38,


  },
  
  subTitle:{
    textAlign:'center',
    fontSize:18,
    color:colors.heading,
    paddingHorizontal:20,


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
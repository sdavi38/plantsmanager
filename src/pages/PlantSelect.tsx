import React, { useEffect, useState } from 'react'
import {
   Text,
   View,
   StyleSheet,
  FlatList, ActivityIndicator} 
   from 'react-native'
import colors from '../../styles/colors'
import fonts from '../../styles/fonts'
import { EnviromentButton } from '../components/EnviromentButton'
import { Header } from '../components/Header'
import { PlantCard } from '../components/PlantCard'
import api from '../services/api'
import {Load} from '../components/Load'
import { useNavigation } from '@react-navigation/core'
import { PlantProps } from '../libs/storage'

  

interface EnviromentsProps{
  key:string;
  title:string;
}

   
   export function PlantSelect(){
     const [enviroments, setEnviroments] = useState<EnviromentsProps[]>([]);
     const [plants, setPlants] = useState<PlantProps[]>([]);
     const [filteredPlants, setFilteredPlants] = useState<PlantsProps[]>([]);
     const [enviromentsSelected, setEnviromentsSelected] = useState('all');
     const [loading, setLoading]=useState(true);
     
     const [page, setPage] = useState(1);
     const [loadingMore, setLoadingMore]=useState(false)
     
     const navigation = useNavigation()

     useEffect(()=>{
       async function fetchEnviroment(){
         const {data} = await api.get('plants_environments?_sort=title&_order=asc'); //ordenar por asc
        setEnviroments([
          {
            key:'all',
            title:'Todos'
          },
          ...data
        ]);
       }
       
       fetchEnviroment();
     },[])
     
     async function fetchPlants(){
      const {data} = await api
      .get(`plants?_sort=name&_order=asc&_page=${page}&_limit=8`);
      //loading para carregar as paginas//
      if(!data)
      return setLoading(true);
        //se há mais de uma pagina//
      if(page > 1){
        setPlants(oldValue =>[...oldValue, ...data])
        setFilteredPlants(oldValue =>[...oldValue, ...data])
        //array com dados antigos com os novos
      }else{
            setPlants(data);
            setFilteredPlants(data)
         }
         setLoading(false)
         setLoadingMore(false)
      }
    
     function handleFectMore(distance:number){
       if(distance < 1)
       return;
       setLoadingMore(true);
       setPage(oldValue => oldValue +1)
       fetchPlants();
     }

     function handlePlatSelect(plant:PlantsProps){
       navigation.navigate('PlantSave', {plant}) //passando parametros na rota
     }
     useEffect(()=>{
      
      fetchPlants();
    },[])
    //carregamento da pagina//
    if(loading){
      return <Load/>
    }
   
    function handleSelectedEnviroments(enviroment:string){
      setEnviromentsSelected(enviroment)

      if(enviroment == 'all')
      return setFilteredPlants(plants)
      const filtered = plants.filter(plant=>
        plant.environments.includes(enviroment)
      );
      setFilteredPlants(filtered)
    } 
      
      return(
         <View style={styles.container}>
         <View style={styles.header}>
         <Header/>
         
         <Text style={styles.title}>
         Em qual ambiente
         </Text>
         
         <Text style={styles.subtitle}>
         Você quer colocar a sua planta ?
         </Text>
         </View>
         <View>
           <FlatList
           keyExtractor={(item)=>String(item.key)}
            data={enviroments}
            renderItem={({item})=>(
              <EnviromentButton
              active={item.key === enviromentsSelected}
              onPress={()=> handleSelectedEnviroments(item.key)}              
              title={item.title}/>
            )}
            horizontal
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
           />
         </View>
         <View style={styles.plants}>
           <FlatList
            keyExtractor={(item)=>String(item.id)}
            data={filteredPlants}
            renderItem={({item})=>(
              <PlantCard 
              data={item}
              onPress={()=> handlePlatSelect(item)} 
              />
            )}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            onEndReachedThreshold={0.1}
            onEndReached={({distanceFromEnd})=> 
            handleFectMore(distanceFromEnd)}
            ListFooterComponent={
              loadingMore ?
              <ActivityIndicator color={colors.green}/>
              :<></>
            }
         
           />
         </View>

       
         
         
         
         </View>   
         )
         
      }
      
      
      const styles = StyleSheet.create({
         container:{
            flex:1,
            
            
         }, 
         header:{
            paddingHorizontal:30,
         },
         
         title:{
            fontSize:17,
            fontFamily:fonts.heading,
            color:colors.heading,
            marginTop:15,
            lineHeight:20,
            
            
         },
         
         subtitle:{
            fontSize:17,
            color:colors.heading,
            fontFamily:fonts.text,
            lineHeight:20,
            
            
         },
         list:{
           height:40,
           justifyContent:'center',
           paddingBottom:5,
           marginLeft:32,
           marginVertical:32,

         },
         
         plants:{
           flex:1,
           paddingHorizontal:32,
           justifyContent:'center'
            
         },
         
         buttonIcon:{
            
            fontSize:42,
            color:colors.white
         } 
         
      })
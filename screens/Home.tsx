import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import React, { useEffect, useState } from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import styles from '../Styles/home.style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Welcome from '../components/home/Welcome';
import CarouselComponent from '../components/home/CarouselComponent';
import Headings from '../components/home/Headings';
import ProductRow from '../components/products/ProductRow';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = ({navigation}:any) => {

  const [userData, setUserData] = useState({});
  const [userLogin, setUserLogin] = useState(false);


  useEffect(() => {
    checkExistingUser();
  }, []);

  const checkExistingUser = async () => {
    const id = await AsyncStorage.getItem('id');
    const useId = `user${JSON.parse(id)}`;

    try{
      const currentUser = await AsyncStorage.getItem(useId);
      if(currentUser !== null){
        const parsedData = JSON.parse(currentUser);
        setUserData(parsedData);
        setUserLogin(true);
      }
    }catch(error){
      console.log('error in getting user data', error);
    }
  }

  return (
    <SafeAreaView>
      <View style={styles.appBarWrapper}>
        <View style={styles.appBar}>
          <Ionicons name="location-outline" size={24} color="gray" />
          <Text style={styles.location}>{userData ? userData.location: "INDIA"}</Text>
          <View style={{alignItems: 'flex-end'}}>
            <View style={styles.cartCount}>
              <Text style={styles.cartNumber}>0</Text>
            </View>
            <TouchableOpacity onPress={()=> {navigation.navigate('Cart')}}>
              <Fontisto name="shopping-bag" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ScrollView>
        <Welcome />
        <CarouselComponent />
        <Headings />
        <ProductRow />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

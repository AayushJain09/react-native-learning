import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../Styles/home.style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Welcome from '../components/home/Welcome';

const Home = () => {
  return (
    <SafeAreaView>
      <View style={styles.appBarWrapper}>
        <View style={styles.appBar}>
          <Ionicons name='location-outline' size={24} color="gray"/>
          <Text style={styles.location}>INDIA</Text>
          <View style={{ alignItems:"flex-end"}}>
            <View style={styles.cartCount}>
                <Text style={styles.cartNumber}>8</Text>
            </View>
            <TouchableOpacity>
              <Fontisto name="shopping-bag" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ScrollView>
        <Welcome />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import React from 'react';
import styles from './welcom.style';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const Welcome = () => {
    const navigation = useNavigation();
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.welcomeTxt}> Find the most</Text>
        <Text style={styles.welcomeTxt2}> Luxurious Furniture</Text>
      </View>
      <View style={styles.searchContainer}>
        <TouchableOpacity>
          <Feather name="search" size={24} style={styles.searchIcon} />
        </TouchableOpacity>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value=""
            onPress={() => {navigation.navigate('Search')}}
            placeholder="Search"
            placeholderTextColor="gray"
          />
        </View>
        <View>
          <TouchableOpacity style={styles.searchBtn}>
            <Ionicons name="camera-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Welcome;

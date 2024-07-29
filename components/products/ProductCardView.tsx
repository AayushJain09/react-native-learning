import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { COLORS, SIZES } from '../../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';



const ProductCardView = ({ item }) => {


  const addToCart = async () => {
    try {
      const userId = await AsyncStorage.getItem('id');
      if (!userId) {
        throw new Error('User ID not found');
      }
      const response = await axios.post('https://backend-furniture-seven.vercel.app/api/cart', {
        userId,
        cartItem: item._id,
        quantity: 1,
      });
      Alert.alert('Success', response.data);
    } catch (error) {
      console.error('Full error response:', error.response ? error.response.data : error.message);
      if (error.response && error.response.data) {
        Alert.alert('Error', `There was an error adding the item to the cart: ${error.response.data.message}`);
      } else {
        Alert.alert('Error', 'There was an error adding the item to the cart.');
      }
    }
  };


  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => { navigation.navigate("ProductDetails", { item: item }) }}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image 
            style={styles.image}
            source={{ uri: item.imageUrl }}
          />
        </View>
        <View style={styles.details}>
          <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
          <Text style={styles.supplier} numberOfLines={1}>{item.supplier}</Text>
          <Text style={styles.price}>${item.price}</Text>
        </View>
        <TouchableOpacity style={styles.addBtn} onPress={()=> {addToCart()}}>
          <Ionicons name="add-circle" size={40} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCardView;

const styles = StyleSheet.create({
  container: {
    width: 182,
    height: 240,
    marginEnd: 22,
    borderRadius: SIZES.medium,
    backgroundColor: COLORS.secondary,
  },
  imageContainer: {
    flex: 1,
    width: 170,
    marginLeft: SIZES.small / 2,
    marginTop: SIZES.small / 2,
    borderRadius: SIZES.small,
    overflow: 'hidden',
  },
  image: {
    aspectRatio: 1,
    resizeMode: 'cover',
  },
  details: {
    padding: SIZES.small,
  },
  title: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    marginBottom: 2,
    color: COLORS.primary,
  },
  supplier: {
    fontSize: SIZES.small,
    color: COLORS.gray,
  },
  price: {
    fontSize: SIZES.medium,
    color: COLORS.primary,
  },
  addBtn: {
    position: 'absolute',
    bottom: SIZES.xSmall,
    right: SIZES.xSmall,
  },
});

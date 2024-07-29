import {Alert, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import { useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS, SIZES} from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const ProductDetails = ({navigation}:any) => {

  const route = useRoute();
  const {item} = route.params;
  const [liked, setLiked] = useState(false);
  const [cartCount, setCartCount] = useState(1);

  useEffect(() => {
    const checkIfFavorite = async () => {
      const userId = await AsyncStorage.getItem('id');
      const favoriteKey = `favorites_${userId}`;
      const favorites = JSON.parse(await AsyncStorage.getItem(favoriteKey)) || [];
      const isFavorite = favorites.some(fav => fav._id === item._id);
      setLiked(isFavorite);
      };

    checkIfFavorite();
  }, []);

  const increment = () => {
    setCartCount(cartCount + 1);
  };

  const decrement = () => {
    if (cartCount > 1) {
      setCartCount(cartCount - 1);
    }
  };
  const toggleFavorite = async () => {
    const userId = await AsyncStorage.getItem('id');
    const favoriteKey = `favorites_${userId}`;
    const favorites = JSON.parse(await AsyncStorage.getItem(favoriteKey)) || [];

    console.log('Current favorites:', favorites);

    if (liked) {
      const updatedFavorites = favorites.filter(fav => fav._id !== item._id);
      await AsyncStorage.setItem(favoriteKey, JSON.stringify(updatedFavorites));
      } else {
      favorites.push(item);
      await AsyncStorage.setItem(favoriteKey, JSON.stringify(favorites));
      }

    setLiked(!liked);
  };


  const addToCart = async () => {
    try {
      const userId = await AsyncStorage.getItem('id');
      if (!userId) {
        throw new Error('User ID not found');
      }
      const response = await axios.post('https://backend-furniture-seven.vercel.app/api/cart', {
        userId,
        cartItem: item._id,
        quantity: cartCount,
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


  return (
    <View style={styles.container}>
      <View style={styles.upperRow}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            backgroundColor: COLORS.lightWhite,
            borderRadius: SIZES.large,
            padding: 6,
          }}>
          <Ionicons
            name="chevron-back-circle"
            size={30}
            color={COLORS.primary}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => toggleFavorite()}
          style={{
            backgroundColor: COLORS.lightWhite,
            borderRadius: SIZES.large,
            padding: 6,
          }}>
          <Ionicons
            name="heart"
            size={30}
            color={liked ? COLORS.red : COLORS.primary}
          />
        </TouchableOpacity>
      </View>
      <Image
        source={{
          uri: item.imageUrl,
        }}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.details}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{item.title}</Text>
          <View style={styles.priceWrapper}>
            <Text style={styles.price}>${item.price}d</Text>
          </View>
        </View>
        <View style={styles.ratingRow}>
          <View style={styles.rating}>
            {[1, 2, 3, 4, 5].map((item, index) => (
              <Ionicons key={index} name="star" size={24} color="gold" />
            ))}
            <Text style={styles.ratingText}>(4.9)</Text>
          </View>
          <View style={styles.rating}>
            <TouchableOpacity onPress={() => increment()}>
              <SimpleLineIcons name="plus" size={24} color={COLORS.black} />
            </TouchableOpacity>
            <Text style={styles.ratingText}>{cartCount}</Text>
            <TouchableOpacity onPress={() => decrement()}>
              <SimpleLineIcons name="minus" size={24} color={COLORS.black} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.descWrapper}>
          <Text style={styles.description}>Description</Text>
          <Text style={styles.descText}>
            {item.description}
          </Text>
        </View>
        <View style={{margin: SIZES.small}}>
          <View style={styles.location}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 8,
              }}>
              <Ionicons name="location-outline" size={20} color={COLORS.gray} />
              <Text style={{color: COLORS.gray}}>{item.product_location}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 8,
              }}>
              <MaterialCommunityIcons
                name="truck-delivery-outline"
                size={20}
                color={COLORS.black}
              />
              <Text style={{color: COLORS.black}}>Free Delivery</Text>
            </View>
          </View>
        </View>
        <View style={styles.cartRow}>
           <TouchableOpacity onPress={() => {}} style={styles.cartBtn}>
              <Text style={styles.cartTitle}>BUY NOW</Text>
           </TouchableOpacity>
           <TouchableOpacity onPress={() => {addToCart()}} style={styles.addToCart}>
              <Fontisto name="shopping-bag" size={22} color={COLORS.lightWhite} />
           </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },
  upperRow: {
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    top: SIZES.xxLarge,
    width: SIZES.width - 44,
    zIndex: 999,
  },
  image: {
    aspectRatio: 1,
  },
  details: {
    marginTop: -SIZES.xLarge,
    backgroundColor: COLORS.lightWhite,
    borderTopLeftRadius: SIZES.medium,
    width: SIZES.width,
    borderTopRightRadius: SIZES.medium,
  },
  titleRow: {
    marginHorizontal: SIZES.large,
    paddingBottom: SIZES.small,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: SIZES.width - 44,
    top: SIZES.large,
  },
  title: {
    fontSize: SIZES.large,
    fontFamily: 'Poppins-Bold',
    color: COLORS.primary,
  },
  priceWrapper: {
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.large,
  },
  price: {
    paddingHorizontal: SIZES.xSmall,
    fontFamily: 'Poppins-SemiBold',
    fontSize: SIZES.large,
    color: COLORS.black,
  },
  ratingRow: {
    paddingBottom: SIZES.small,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: SIZES.width - 10,
    top: 5,
  },
  rating: {
    top: SIZES.large,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginHorizontal: SIZES.large,
  },
  ratingText: {
    color: COLORS.gray,
    fontFamily: 'Poppins-Medium',
    paddingHorizontal: SIZES.xSmall
  },
  descWrapper: {
    marginTop: SIZES.large + 2,
    marginHorizontal: SIZES.large,
  },
  description: {
    fontFamily: 'Poppins-Medium',
    fontSize: SIZES.large - 2,
    color: COLORS.black,
  },
  descText: {
    fontFamily: 'Poppins-Regular',
    fontSize: SIZES.small,
    textAlign: 'justify',
    marginBottom: SIZES.small,
    color: COLORS.gray,
  },
  location: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.secondary,
    padding: 10,
    borderRadius: SIZES.large,
  },
  cartRow: {
    paddingBottom: SIZES.small,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: SIZES.width - 10,
  },
  cartBtn: {
    backgroundColor: COLORS.black,
    width: SIZES.width*0.7,
    padding: SIZES.small/2,
    borderRadius: SIZES.large,
    marginLeft: SIZES.small,
  },
  cartTitle: {
    marginLeft: SIZES.small,
    fontFamily: 'Poppins-Bold',
    color: COLORS.lightWhite,
    fontSize: SIZES.medium,
  },
  addToCart: {
    width: 37,
    height: 37,
    borderRadius: 50,
    margin: SIZES.small,
    backgroundColor: COLORS.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

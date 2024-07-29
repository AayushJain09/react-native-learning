import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { COLORS, SIZES } from '../../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavouritesCardView = ({ item, onFavoriteToggle }) => {
  const navigation = useNavigation();
  
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const checkIfFavorite = async () => {
      const userId = await AsyncStorage.getItem('id');
      const favoriteKey = `favorites_${userId}`;
      const favorites = JSON.parse(await AsyncStorage.getItem(favoriteKey)) || [];
      const isFavorite = favorites.some(fav => fav._id === item._id);
      setLiked(isFavorite);
    };

    checkIfFavorite();
  }, [item._id]);

  const toggleFavorite = async () => {
    const userId = await AsyncStorage.getItem('id');
    const favoriteKey = `favorites_${userId}`;
    const favorites = JSON.parse(await AsyncStorage.getItem(favoriteKey)) || [];

    if (liked) {
      const updatedFavorites = favorites.filter(fav => fav._id !== item._id);
      await AsyncStorage.setItem(favoriteKey, JSON.stringify(updatedFavorites));
      setLiked(false);
      if (onFavoriteToggle) onFavoriteToggle(item._id, false); // Notify parent
    } else {
      favorites.push(item);
      await AsyncStorage.setItem(favoriteKey, JSON.stringify(favorites));
      setLiked(true);
      if (onFavoriteToggle) onFavoriteToggle(item._id, true); // Notify parent
    }
  };

  return (
    <TouchableOpacity onPress={() => navigation.navigate("ProductDetails", { item: item })}>
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
        <TouchableOpacity
          onPress={toggleFavorite}
          style={styles.addBtn}>
          <Ionicons
            name="heart"
            size={30}
            color={liked ? COLORS.red : COLORS.primary}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default FavouritesCardView;

const styles = StyleSheet.create({
  container: {
    width: 182,
    height: 240,
    marginEnd: 22,
    borderRadius: SIZES.medium,
    backgroundColor: COLORS.secondary,
    position: 'relative', // Ensure absolute positioning works
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

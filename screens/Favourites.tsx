import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {COLORS, SIZES} from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FavouritesCardView from '../components/cart/FavouritesCardView';

const Favourites = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.upperRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              name="chevron-back-circle"
              size={30}
              color={COLORS.lightWhite}
            />
          </TouchableOpacity>
          <Text style={styles.heading}>Favourites</Text>
        </View>
        <FavouritesList />
      </View>
    </SafeAreaView>
  );
};

const FavouritesList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFavorites();
  }, []);
  

  const fetchFavorites = useCallback(async () => {
    try {
      const userId = await AsyncStorage.getItem('id');
      const favoriteKey = `favorites_${userId}`;
      const favorites = await AsyncStorage.getItem(favoriteKey);

      if (favorites !== null) {
        setData(JSON.parse(favorites));
      } else {
        setData([]);
      }
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  },[]);

  const handleFavoriteToggle = (itemId, isFavorite) => {
    fetchFavorites(); // Refresh the favorites list
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={SIZES.xxLarge} color={COLORS.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={{color: COLORS.black}}>{error.message}</Text>
      </View>
    );
  }

  if (data.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={{color: COLORS.black}}>Your favorites list is empty.</Text>
      </View>
    );
  }

  return (
    <View style={styles.Wcontainer}>
      <FlatList
        data={data}
        numColumns={2}
        contentContainerStyle={styles.Wcontainer}
        keyExtractor={item => item._id}
        renderItem={({item}) => <FavouritesCardView item={item} onFavoriteToggle={handleFavoriteToggle} />}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },
  wrapper: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },
  upperRow: {
    marginHorizontal: SIZES.large,
    width: SIZES.width - 50,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.large,
    top: SIZES.large,
    zIndex: 999,
  },
  heading: {
    color: COLORS.lightWhite,
    fontSize: SIZES.medium,
    fontFamily: 'Poppins-SemiBold',
    marginLeft: 110,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  Wcontainer: {
    alignItems: 'center',
    paddingTop: SIZES.xxLarge,
    paddingLeft: SIZES.small / 2,
  },
  separator: {
    height: SIZES.large,
  },
});

export default Favourites;

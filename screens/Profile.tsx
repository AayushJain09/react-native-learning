import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {COLORS, SIZES} from '../constants';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = ({navigation}: any) => {
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
      }else{
        navigation.navigate('Login');
      }
    }catch(error){
      console.log('error in getting user data', error);
    }
  }

  const userLogout = async () => {
    const id = await AsyncStorage.getItem('id');
    const useId = `user${JSON.parse(id)}`;

    try{
      await AsyncStorage.multiRemove([useId,'id']);
      setUserLogin(false);
      navigation.navigate('Home');
    }catch(error){
      console.log('error in loging out', error );
      }
  }

  const logout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'Continue', onPress: () => userLogout()},
    ]);
  };

  const clearCacheData = async () => {
    try {
      const userId = await AsyncStorage.getItem('id');
      const favoriteKey = `favorites_${userId}`;

      await AsyncStorage.removeItem(favoriteKey);
      console.log('Favorites cleared successfully');
    } catch (error) {
      console.log('Error clearing favorites', error);
    }
  };
  const clearCache = () => {
    Alert.alert('Clear Cache', 'Are you sure you want to clear all data on your device?', [
      {
        text: 'Cancel clear cache',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Clear cache',
        onPress: () => clearCacheData(),
      },
    ]);
  };
  const deleteAccount = () => {
    Alert.alert('Delete Account', 'Are you sure you want to delete your account?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Delete', 
        onPress: () => console.log('delete Pressed')
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <StatusBar backgroundColor={COLORS.gray} />
        <View style={{width: '100%'}}>
          <Image
            style={styles.cover}
            source={require('../assets/images/space.jpg')}
          />
        </View>
        <View style={styles.profileContainer}>
          <Image
            style={styles.profile}
            source={require('../assets/images/profile.jpeg')}
          />
          <Text style={styles.name}>
            {userLogin ? userData.username : 'Please Login into your account'}
          </Text>
          {userLogin === false ? (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Login');
              }}>
              <View style={styles.loginBtn}>
                <Text style={styles.menuText}>L O G I N</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <View style={styles.loginBtn}>
              <Text style={styles.menuText}>{userData.email}</Text>
            </View>
          )}
          {userLogin === false ? (
            <View></View>
          ) : (
            <View style={styles.menuWrapper}>
              <TouchableOpacity onPress={() => navigation.navigate('Favourites')}>
                <View style={styles.menuItem(0.2)}>
                  <MaterialCommunityIcons
                    name="heart-outline"
                    color={COLORS.primary}
                    size={24}
                  />
                  <Text style={styles.menuText}>Favourites</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate('Orders')}>
                <View style={styles.menuItem(0.2)}>
                  <MaterialCommunityIcons
                    name="truck-delivery-outline"
                    color={COLORS.primary}
                    size={24}
                  />
                  <Text style={styles.menuText}>Orders</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                <View style={styles.menuItem(0.2)}>
                  <SimpleLineIcons
                    name="bag"
                    color={COLORS.primary}
                    size={24}
                  />
                  <Text style={styles.menuText}>Cart</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => clearCache()}>
                <View style={styles.menuItem(0.2)}>
                  <MaterialCommunityIcons
                    name="cached"
                    color={COLORS.primary}
                    size={24}
                  />
                  <Text style={styles.menuText}>Clear Cache</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteAccount()}>
                <View style={styles.menuItem(0.2)}>
                  <AntDesign
                    name="deleteuser"
                    color={COLORS.primary}
                    size={24}
                  />
                  <Text style={styles.menuText}>Delete Account</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => logout()}>
                <View style={styles.menuItem(0.2)}>
                  <AntDesign name="logout" color={COLORS.primary} size={24} />
                  <Text style={styles.menuText}>Logout</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },
  cover: {
    height: 290,
    width: '100%',
    resizeMode: 'cover',
  },
  profileContainer: {
    flex: 1,
    alignItems: 'center',
  },
  profile: {
    height: 155,
    width: 155,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: COLORS.primary,
    resizeMode: 'cover',
    marginTop: -90,
  },
  name: {
    fontFamily: 'Poppins-Bold',
    color: COLORS.primary,
    marginVertical: 5,
  },
  loginBtn: {
    backgroundColor: COLORS.secondary,
    padding: 2,
    borderWidth: 0.4,
    borderColor: COLORS.primary,
    borderRadius: SIZES.xxLarge,
  },
  menuText: {
    fontFamily: 'Poppins-Regular',
    color: COLORS.gray,
    marginHorizontal: 20,
    fontWeight: '800',
    fontSize: 14,
    lineHeight: 26,
  },
  menuWrapper: {
    marginTop: SIZES.xLarge,
    width: SIZES.width - SIZES.large,
    backgroundColor: COLORS.lightWhite,
    borderRadius: SIZES.small,
  },
  menuItem: (borderBottomWidth: number) => ({
    borderBottomWidth: borderBottomWidth,
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderColor: COLORS.gray,
  }),
});

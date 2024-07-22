import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {useGlobalContext} from '../context/GlobalContext';

const UserStack = createStackNavigator();

const UserStackScreen = () => {
  return <UserStackNavigator />;
};

const UserStackNavigator = () => {
  return (
    <UserStack.Navigator>
      <UserStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />
      <UserStack.Screen
        name="Settings"
        component={SettingScreen}
        options={{
          headerShown: false,
        }}
      />
    </UserStack.Navigator>
  );
};

const ProfileScreen = ({navigation}) => {
  const {currentUser} = useGlobalContext();
  console.log('currentUser', currentUser);

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate('Settings')}>
        <Text style={styles.btnText}>Go to Settings</Text>
      </TouchableOpacity>

      <View style={styles.box}>
        <Text style={styles.heading}>Profile Info</Text>
        {currentUser && (
          <View style={{margin: 20}}>
            <Text style={styles.inbox}>Name: {currentUser.name}</Text>
            <Text style={styles.inbox}>Email: {currentUser.email}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const SettingScreen = ({navigation}) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.heading}>Setting Screen</Text>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate('Profile')}>
        <Text style={styles.btnText}>Go to Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.push('Screen1')}>
        <Text style={styles.btnText}>Go to Screen 1</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  btn: {
    backgroundColor: 'red',
    margin: 10,
    padding: 10,
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowOffset: {width: 33, height: 50},
    elevation: 5,
    borderRadius: 5,
  },
  btnText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'sans-serif',
  },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    color: 'darkred',
    position: 'absolute',
    top: 10,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  box: {
    gap: 5,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 5,
  },
  inbox: {
    verticalAlign: 'middle',
    fontSize: 20,
    color: 'black',
    padding: 5,
  },
});

export default UserStackScreen;

import React, {useState} from 'react';
import {
  Button,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  View,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import App from './App';
import GlobalProvider, {useGlobalContext} from './context/GlobalContext';
import CameraScreen from './screens/CameraScreen';

const Stack = createStackNavigator();

function Screen1({navigation}) {
  return (
    <SafeAreaView style={{gap: 6}}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'gray'} />
      <UserDetails />
      <Button
        title="Go to App Screen"
        onPress={() => navigation.navigate('App')}
      />
      <Button
        title="Go to Settings Screen"
        onPress={() =>
          navigation.navigate('App', {
            screen: 'UserStack',
            params: {screen: 'Settings'},
          })
        }
      />
      <UpdateUserForm />
    </SafeAreaView>
  );
}

function MainNavigator() {
  return (
    <GlobalProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Screen1">
          <Stack.Screen
            name="Screen1"
            component={Screen1}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="App"
            component={App}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Camera"
            component={CameraScreen}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GlobalProvider>
  );
}

const UserDetails = () => {
  const {currentUser} = useGlobalContext();

  return (
    <View>
      <Text
        style={{
          color: 'black',
          position: 'relative',
          left: '25%',
          margin: 8,
          fontSize: 25,
          fontWeight: 'bold',
          textDecorationLine: 'line-through',
        }}>
        {' '}
        Testing App
      </Text>
      {currentUser ? (
        <>
          <Text style={{color: 'black', fontSize: 20, margin: 8}}>
            Name: {currentUser.name}
          </Text>
          <Text style={{color: 'black', fontSize: 20, margin: 8}}>
            Email: {currentUser.email}
          </Text>
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

const UpdateUserForm = () => {
  const {setCurrentUser} = useGlobalContext();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleUpdate = () => {
    setCurrentUser({name, email});
  };

  return (
    <View>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={{borderWidth: 1, marginBottom: 10, color: 'black', margin: 8}}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{borderWidth: 1, marginBottom: 10, color: 'black', margin: 8}}
      />
      <Button title="Update User" onPress={handleUpdate} />
    </View>
  );
};

export default MainNavigator;

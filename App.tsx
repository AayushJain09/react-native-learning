import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigation from './navigation/BottomTabNavigation';
import {Cart, ProductDetails} from './screens';
import NewArrivals from './screens/NewArrivals';
import LoginPage from './screens/LoginPage';
import Orders from './screens/Orders';
import Favourites from './screens/Favourites';
import Signup from './screens/Signup';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Bottom Navigation"
          component={BottomTabNavigation}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Cart"
          component={Cart}
          options={{
            headerShown: false,
          }}  
        />
        <Stack.Screen
          name="ProductDetails"
          component={ProductDetails}
          options={{
            headerShown: false,
          }}  
        />
        <Stack.Screen
          name="ProductList"
          component={NewArrivals}
          options={{
            headerShown: false,
          }}  
        />
        <Stack.Screen
          name="Login"
          component={LoginPage}
          options={{
            headerShown: false,
          }}  
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{
            headerShown: false,
          }}  
        />
        <Stack.Screen
          name="Orders"
          component={Orders}
          options={{
            headerShown: false,
          }}  
        />
        <Stack.Screen
          name="Favourites"
          component={Favourites}
          options={{
            headerShown: false,
          }}  
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import Topbar from './components/Topbar';
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import UserStackScreen from './screens/UserStackScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import GlobalProvider from './context/GlobalContext';

const Tab = createBottomTabNavigator();

const iconSize = wp('6%'); // 6% of the screen width

// Icons for the bottom tab - Home and Search
const HomeTabIcon = ({color, focused}: {color: string; focused: boolean}) => (
  <View style={styles.iconContainer}>
    <Icon name="home" size={iconSize} color={focused ? 'red' : color} />
    <Text style={[styles.label, {color: focused ? 'red' : 'gray'}]}>Home</Text>
  </View>
);

const SearchTabIcon = ({color, focused}: {color: string; focused: boolean}) => (
  <View style={styles.iconContainer}>
    <Icon name="search" size={iconSize} color={focused ? 'red' : color} />
    <Text style={[styles.label, {color: focused ? 'red' : 'gray'}]}>
      Search
    </Text>
  </View>
);

const UserTabIcon = ({color, focused}: {color: string; focused: boolean}) => (
  <View style={styles.iconContainer}>
    <Icon name="info" size={iconSize} color={focused ? 'red' : color} />
    <Text style={[styles.label, {color: focused ? 'red' : 'gray'}]}>
      Search
    </Text>
  </View>
);

//Main App component
function App({navigation}): React.JSX.Element {
  return (
    <GlobalProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle={'dark-content'} backgroundColor={'gray'} />
        <Topbar navigation={navigation}/>
        <Tab.Navigator screenOptions={{tabBarShowLabel: false}}>
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarIcon: HomeTabIcon,
              headerShown: false,
            }}
          />
          <Tab.Screen
            name="Search"
            component={SearchScreen}
            options={{
              tabBarIcon: SearchTabIcon,
              headerShown: false,
            }}
          />
          <Tab.Screen
            name="UserStack"
            component={UserStackScreen}
            options={{
              tabBarIcon: UserTabIcon,
              headerShown: false,
            }}
          />
        </Tab.Navigator>
      </SafeAreaView>
    </GlobalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  iconContainer: {
    margin: 8,
    width: wp('15%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    marginTop: 2,
    fontSize: wp('3%'),
  },
});

export default App;

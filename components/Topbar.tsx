import React from 'react';
import {View, Text, StyleSheet, Alert, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Topbar = ({navigation}) => {
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        accessibilityRole="button"
        onPress={() => {
          navigation.navigate('Camera');
        }}>
        <Icon name="camera" size={30} color="#900" />
      </TouchableOpacity>
      <View>
        <Text style={styles.center}>Post Feed</Text>
      </View>
      <TouchableOpacity
        accessibilityRole="button"
        onPress={() => {
          Alert.alert('You tapped the envelope icon!');
        }}>
        <Icon name="envelope" size={30} color="#900" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    color: 'red',
    fontSize: 20,
    fontWeight: 'bold',
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 70,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
  },
});

export default Topbar;

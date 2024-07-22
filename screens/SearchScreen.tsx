import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const SearchScreen = () => {
  return (
    <View style={styles.wrapper}>
      <TextInput
        style={styles.input}
        placeholder="Search"
        placeholderTextColor="gray"
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => Alert.alert('Search button pressed')}>
        <Icon name="search" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'black',
    margin: 10,
    padding: 10,
    borderRadius: 10,
    color: 'black',
  },
  button: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SearchScreen;

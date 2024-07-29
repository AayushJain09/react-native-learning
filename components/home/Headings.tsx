import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, SIZES } from '../../constants';
import { useNavigation } from '@react-navigation/native';

const Headings = () => {
  
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>New Arrivals</Text>
        <TouchableOpacity onPress={() => navigation.navigate('ProductList')}>
            <Ionicons name="grid" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: SIZES.small,
    marginHorizontal: SIZES.xSmall,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily : 'Poppins-SemiBold',
    fontSize: SIZES.xLarge,
    color: COLORS.primary,
  },
});

export default Headings;

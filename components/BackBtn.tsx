import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS, SIZES} from '../constants';

const BackBtn = ({OnPress}) => {
  return (
    <TouchableOpacity onPress={OnPress} style={styles.backBtn}>
      <Ionicons name="chevron-back-circle" size={32} color={COLORS.primary} />
    </TouchableOpacity>
  );
};

export default BackBtn;

const styles = StyleSheet.create({
  backBtn: {
    alignItems: 'flex-start',
    position: 'absolute',
    zIndex: 999,
    top: SIZES.large-8,
  },
});

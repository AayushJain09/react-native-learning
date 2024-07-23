import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, SIZES} from '../../constants';
import ProductCardView from './ProductCardView';

const ProductRow = () => {
  const products = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return <View style={styles.container}>
    <FlatList 
        data={products}
        horizontal
        contentContainerStyle={{columnGap: SIZES.xSmall}}
        renderItem={({item}) => (<ProductCardView />)}
    />
  </View>;
};

export default ProductRow;

const styles = StyleSheet.create({
    container:{
        marginTop: SIZES.xSmall,
        marginLeft: SIZES.small,
    },
});

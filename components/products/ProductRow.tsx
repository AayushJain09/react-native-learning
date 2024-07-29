import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import { COLORS, SIZES } from '../../constants';
import ProductCardView from './ProductCardView';
import useFetch from '../../hooks/useFetch';

const ProductRow = () => {
  const { data, isLoading, error, refetch } = useFetch();
  
  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color={COLORS.primary} />
      ) : error ? (
        <Text>Something went wrong - {(error as Error).message}</Text>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item._id}
          horizontal
          contentContainerStyle={{ columnGap: SIZES.medium }}
          renderItem={({ item }) => <ProductCardView item={item} />}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: SIZES.xSmall,
    marginLeft: SIZES.small,
  },
});

export default ProductRow;

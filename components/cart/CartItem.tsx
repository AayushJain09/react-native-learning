// CartItem.tsx
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../constants';
import Fontisto from 'react-native-vector-icons/Fontisto';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

interface CartItemProps {
  image: string;
  name: string;
  brand: string;
  price: number | string; // Allow both number and string
  quantity: number;
  onIncrement: () => void; // Callback for increment action
  onDecrement: () => void; // Callback for decrement action
  onRemove: () => void; // Callback for removing item
}

const CartItem: React.FC<CartItemProps> = ({
  image,
  name,
  brand,
  price,
  quantity,
  onIncrement,
  onDecrement,
  onRemove,
}) => {
  // Convert price to a number, default to 0 if conversion fails
  const numericPrice = typeof price === 'number' ? price : parseFloat(price);
  const formattedPrice = isNaN(numericPrice) ? 0 : numericPrice;

  return (
    <View style={styles.itemContainer}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{name}</Text>
        <Text style={styles.itemBrand}>{brand}</Text>
        <Text style={styles.itemPrice}>
          ${formattedPrice.toFixed(2)} x {quantity}
        </Text>
      </View>
      <View style={styles.right}>
        <TouchableOpacity style={styles.trashButton} onPress={onRemove}>
          <Fontisto name="trash" color={COLORS.red} size={24} />
        </TouchableOpacity>
        <View style={styles.op}>
          <TouchableOpacity onPress={onIncrement}>
            <SimpleLineIcons name="plus" size={24} color={COLORS.black} />
          </TouchableOpacity>
          <Text style={styles.ratingText}>{quantity}</Text>
          <TouchableOpacity onPress={onDecrement}>
            <SimpleLineIcons name="minus" size={24} color={COLORS.black} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ratingText: {
    color: COLORS.gray,
    fontFamily: 'Poppins-Medium',
    paddingHorizontal: SIZES.xSmall,
  },
  op: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  right: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    gap: 15,
  },
  trashButton: {
    padding: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 5,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 10,
  },
  itemName: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemBrand: {
    fontSize: 14,
    color: '#666',
  },
  itemPrice: {
    fontSize: 14,
    color: '#333',
  },
  checkoutButton: {
    backgroundColor: '#004d40',
    color: 'white',
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
});

export default CartItem;

// Cart.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CartItem from '../components/cart/CartItem';
import { COLORS, SIZES } from '../constants';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Cart: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [cartData, setCartData] = useState([]);
  const [subtotal, setSubtotal] = useState<number>(0); // For subtotal
  const [total, setTotal] = useState<number>(0); // For total

  useEffect(() => {
    getCartData();
  }, []);

  const getCartData = async () => {
    try {
      const userId = await AsyncStorage.getItem('id');
      if (!userId) {
        throw new Error('User ID not found');
      }

      const response = await axios.get(
        `https://backend-furniture-seven.vercel.app/api/cart/find/${userId}`,
      );
      console.log('Cart data fetched successfully:', response.data);

      setCartData(response.data.products);

      const subtotalValue = response.data.products.reduce(
        (acc: number, item: any) =>
          acc + parseFloat(item.cartItem.price) * item.quantity,
        0,
      );
      setSubtotal(subtotalValue);
      setTotal(subtotalValue);

    } catch (error: any) {
      console.error('Error fetching cart data:', error.message);
      setError(error.message);
      Alert.alert('Error', `Failed to load cart data: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = async (
    index: number,
    newQuantity: number,
    cartItemId: string,
    action: 'increment' | 'decrement',
  ) => {
    try {
      const userId = await AsyncStorage.getItem('id');
      if (!userId) {
        throw new Error('User ID not found');
      }

      if (action === 'increment') {
        await axios.post(
          'https://backend-furniture-seven.vercel.app/api/cart/increment',
          { userId, cartItem: cartItemId },
        );
      } else {
        await axios.post(
          'https://backend-furniture-seven.vercel.app/api/cart/decrement',
          { userId, cartItem: cartItemId },
        );
      }

      const updatedCartData = [...cartData];
      updatedCartData[index].quantity = newQuantity;
      setCartData(updatedCartData);

      const subtotalValue = updatedCartData.reduce(
        (acc: number, item: any) =>
          acc + parseFloat(item.cartItem.price) * item.quantity,
        0,
      );
      setSubtotal(subtotalValue);
      setTotal(subtotalValue);
    } catch (error: any) {
      console.error(
        `Error ${
          action === 'increment' ? 'incrementing' : 'decrementing'
        } item quantity:`,
        error.message,
      );
      Alert.alert(
        'Error',
        `Failed to ${
          action === 'increment' ? 'increment' : 'decrement'
        } item quantity: ${error.message}`,
      );
    }
  };

  const handleIncrement = (index: number, cartItemId: string) => {
    const newQuantity = cartData[index].quantity + 1;
    handleQuantityChange(index, newQuantity, cartItemId, 'increment');
  };

  const handleDecrement = (index: number, cartItemId: string) => {
    const newQuantity = cartData[index].quantity - 1;
    if (newQuantity === 0) {
      handleRemoveItem(index);
    } else {
      handleQuantityChange(index, newQuantity, cartItemId, 'decrement');
    }
  };

  const handleRemoveItem = (index: number) => {
    const updatedCartData = cartData.filter((_, i) => i !== index);
    setCartData(updatedCartData);

    const subtotalValue = updatedCartData.reduce(
      (acc: number, item: any) =>
        acc + parseFloat(item.cartItem.price) * item.quantity,
      0,
    );
    setSubtotal(subtotalValue);
    setTotal(subtotalValue);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error: {error}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.upperRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              name="chevron-back-circle"
              size={30}
              color={COLORS.lightWhite}
            />
          </TouchableOpacity>
          <Text style={styles.heading}>Cart</Text>
        </View>
        <FlatList
          data={cartData}
          keyExtractor={item => item._id}
          renderItem={({ item, index }) => (
            <CartItem
              image={item.cartItem.imageUrl}
              name={item.cartItem.title}
              brand={item.cartItem.supplier}
              price={item.cartItem.price}
              quantity={item.quantity}
              onIncrement={() => handleIncrement(index, item.cartItem._id)}
              onDecrement={() => handleDecrement(index, item.cartItem._id)}
              onRemove={() => handleRemoveItem(index)}
            />
          )}
          style={styles.list}
        />
        <View style={{ backgroundColor: COLORS.gray }}>
          <View style={styles.orderInfo}>
            <Text style={styles.orderText}>Subtotal</Text>
            <Text style={styles.orderText}>${subtotal.toFixed(2)}</Text>
          </View>
          <View style={styles.orderInfo}>
            <Text style={styles.orderText}>Total</Text>
            <Text style={styles.orderText}>${total.toFixed(2)}</Text>
          </View>
          <View style={styles.checkoutButtonContainer}>
            <TouchableOpacity>
              <Text style={styles.checkoutButton}>
                CHECKOUT ${total.toFixed(2)}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: COLORS.red,
    fontSize: 18,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },

  wrapper: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
    padding: 8,
    paddingVertical: 8,
  },
  upperRow: {
    marginHorizontal: SIZES.large,
    width: SIZES.width - 50,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.large,
    top: SIZES.large,
    zIndex: 999,
  },
  heading: {
    color: COLORS.lightWhite,
    fontSize: SIZES.medium,
    fontFamily: 'Poppins-SemiBold',
    marginLeft: 110,
  },
  list: {
    paddingTop: SIZES.large * 2 + 20,
  },
  orderInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  orderText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  checkoutButtonContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  checkoutButton: {
    backgroundColor: COLORS.primary,
    color: 'white',
    padding: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    fontSize: 18,
  },
});

export default Cart;

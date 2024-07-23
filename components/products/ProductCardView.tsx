import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../../constants'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'


const ProductCardView = () => {
    const navigation = useNavigation()
    return (
    <TouchableOpacity onPress={() => {navigation.navigate("ProductDetails")}}>
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image 
                style={styles.image}
                    source={{ uri: "https://imgs.search.brave.com/FSty3BUDJTWRbNJbe5Zh082mmLoYFTZ6vyzGrrOchys/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAyLzEwLzExLzc0/LzM2MF9GXzIxMDEx/NzQ1OV9EZ2tNODVr/VW9ZRUl3bk5jMUNl/Nm01a2JTalhyNWtS/OC5qcGc"}}
                />
            </View>
            <View style={styles.details}>
                <Text style={styles.title} numberOfLines={1}>Producst abfga</Text>
                <Text style={styles.supplier} numberOfLines={1}>Product</Text>
                <Text style={styles.price}>$253</Text>
            </View>
            <TouchableOpacity style={styles.addBtn}>
                <Ionicons name="add-circle" size={40} color={COLORS.primary} />
            </TouchableOpacity>
        </View>
    </TouchableOpacity>
  )
}

export default ProductCardView

const styles = StyleSheet.create({
    container:{
        width: 182,
        height: 240,
        marginEnd: 22,
        borderRadius: SIZES.medium,
        backgroundColor: COLORS.secondary,
    },
    imageContainer:{
        flex: 1,
        width: 170,
        marginLeft: SIZES.small/2,
        marginTop: SIZES.small/2,
        borderRadius: SIZES.small,
        overflow: 'hidden',
    },
    image:{
        aspectRatio: 1,
        resizeMode: 'cover',
    },
    details:{
        padding: SIZES.small,
    },
    title:{
        fontSize: SIZES.large,
        fontWeight: 'bold',
        marginBottom: 2,
        color: COLORS.primary,
    },
    supplier: {
        fontFamily: 'Poppins-Regular',
        fontSize: SIZES.small,
        color: COLORS.gray,
    },
    price: {
        fontFamily: 'Poppins-Bold',
        fontSize: SIZES.medium,
        color: COLORS.primary,
    },
    addBtn: {
        position: 'absolute',
        bottom: SIZES.xSmall,
        right: SIZES.xSmall,
    },
})
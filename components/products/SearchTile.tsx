import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS, SHADOWS, SIZES } from '../../constants'
import { useNavigation } from '@react-navigation/native'

const SearchTile = ({item}:any) => {
    const navigation = useNavigation()
    return (
    <View>
      <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('ProductDetails', {item})}>
        <View style={styles.image}>
            <Image source={{uri :item.imageUrl}}
            style={styles.productImg}/>
        </View>
        <View style={styles.textContainer}>
            <Text style={styles.productTitle}>{item.title}</Text>
            <Text style={styles.supplier}>{item.supplier}</Text>
            <Text style={styles.supplier}>{item.price}</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default SearchTile

const styles = StyleSheet.create({
    supplier: {
        fontSize: SIZES.small+2,
        fontFamily: 'Poppins-Regular',
        color: COLORS.gray,
        marginTop: 3,
    },
    productTitle: {
        fontSize: SIZES.medium,
        fontFamily: 'Poppins-Bold',
        color: COLORS.primary,
    },
    textContainer: {
        flex: 1,
        marginHorizontal: SIZES.medium,
    },
    productImg: {
        width: "100%",
        height: 65,
        borderRadius: SIZES.small,
        resizeMode: 'cover',
    },
    container:{
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        padding: SIZES.medium,
        marginBottom: SIZES.small,
        borderRadius: SIZES.small,
        backgroundColor: 'white',
        ...SHADOWS.medium,
        shadowColor: COLORS.lightWhite
    },
    image: {
        width: 70,
        backgroundColor: COLORS.secondary,
        borderRadius: SIZES.medium,
        justifyContent: 'center',
        alignContent: 'center',
    }
})
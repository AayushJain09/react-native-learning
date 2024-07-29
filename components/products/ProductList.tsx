import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import useFetch from '../../hooks/useFetch'
import { COLORS, SIZES } from '../../constants';
import ProductCardView from './ProductCardView';

const ProductList = () => {
    const{data,isLoading, error} = useFetch();
    if(isLoading){
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size={SIZES.xxLarge} color={COLORS.primary} />
            </View>
        )
    }

    if(error){
        return (
            <View style={styles.loadingContainer}>
                <Text style={{color: COLORS.black}}>{error.message}</Text>
            </View>
        )
    }

    return(
        <View style={styles.container}>
            <FlatList 
                data={data}
                numColumns={2}
                contentContainerStyle={styles.container}
                keyExtractor={(item) => item._id}
                renderItem={({item}) => (
                    <ProductCardView item={item}/>
                )}
                ItemSeparatorComponent={() => <View style={styles.separator}/>}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    loadingContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        alignContent:'center'
    },
    container:{
        alignItems:'center',
        paddingTop: SIZES.xxLarge,
        paddingLeft: SIZES.small/2,
    },
    separator:{
        height: SIZES.large,
    }
})

export default ProductList
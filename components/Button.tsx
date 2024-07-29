import { StyleSheet, Text, TouchableOpacity,ActivityIndicator } from 'react-native'
import React from 'react'
import { COLORS } from '../constants'

const Button = ({title,onPress, isValid,loader}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.btnStyle(isValid ? COLORS.primary : COLORS.red)}>
        {!loader ? (<Text style={styles.btnText}>{title}</Text>) : (<ActivityIndicator size="small" color={COLORS.white} />)}
        
        {/* <Text style={styles.btnText}>{title}</Text> */}
    </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create({
    btnText:{
        fontFamily: 'Poppins-Bold',
        color: COLORS.white,
        fontSize: 18,

    },
    btnStyle: (backgroundColor) => ({
        height: 50,
        width: '100%',
        marginVertical: 20,
        backgroundColor: backgroundColor,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
    }),
})
import {FlatList, FlatListComponent, Image, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import styles from '../Styles/search.style'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import axios from 'axios'
import SearchTile from '../components/products/SearchTile'
import { SIZES } from '../constants'

const Search = () => {
  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState([])

  const handleSearch = async () => {
    // Call API to search for products
    try{
      const response = await axios.get(`https://backend-furniture-one.vercel.app/api/products/search/${search}`)
      setSearchResults(response.data)
    } catch (error) {
      console.log(" error in fetch search results" +error)
    } finally{

    }
  }

  return (
    <SafeAreaView>
      <View style={styles.searchContainer}>
        <TouchableOpacity>
          <Ionicons name="camera-outline" size={28}  style={styles.searchIcon} />
        </TouchableOpacity>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
            placeholder="Search"
            placeholderTextColor="gray"
          />
        </View>
        <View>
          <TouchableOpacity style={styles.searchBtn} onPress={() => handleSearch()}>
            <Feather name="search" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      {searchResults.length === 0 ?(
        <View style={{flex:1}}>
          <Image source={require('../assets/images/Pose23.png')} style={styles.searchImage} />
        </View>
      ) : (
        <FlatList 
                data={searchResults}
                keyExtractor={(item) => item._id}
                renderItem={({item}) => (
                    <SearchTile item={item}/>
                )}
                style={{marginHorizontal: SIZES.small}}
                ItemSeparatorComponent={() => <View style={styles.separator}/>}
            />
      )}
    </SafeAreaView>
  )
}

export default Search
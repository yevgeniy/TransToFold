import React, {useState, useEffect} from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import * as MediaLibrary from 'expo-media-library';

function Item({id, isSelected, toggleSelected}) {

    const[uri, seturi]=useState()

    const getUri=async (id)=> {
        console.log('getting id', id)                
        const asset = await MediaLibrary.getAssetInfoAsync(id);

        return asset?.localUri;
    }

    useEffect(()=> {
        
        getUri(id).then(seturi);
    },[id])



    if (!uri)
        return null;

    return <TouchableOpacity onPress={() => toggleSelected(id)} style={styles.photoContainer}>
        <Image source={{ uri }} style={styles.photo} />
        {isSelected && (
            <View style={styles.checkmarkContainer}>
                <Text style={styles.checkmark}>✔️</Text>
            </View>
        )}
    </TouchableOpacity>
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    photoContainer: {
      margin: 5,
      position: 'relative',
    },
    photo: {
      width: 100,
      height: 100,
      borderRadius: 5,
    },
    checkmarkContainer: {
      position: 'absolute',
      top: 5,
      right: 5,
      backgroundColor: 'rgba(10, 191, 25, .5)',
      borderRadius: 10,
      padding: 2,
    },
    checkmark: {
      color: 'white',
      fontSize: 16,
    },
  });

export default Item;
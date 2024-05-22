import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import Item from './Item'
import Header from './Header';
import MoreModal from './MoreModal';
import useConnect from './useConnect';

const App = () => {
  const [photos, setPhotos] = useState([]);
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [isOpen, setIsOpen]=useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status === 'granted') {
        try {
          let allAssets = [];
          let assets = await MediaLibrary.getAssetsAsync({ mediaType: 'photo' });

          while (assets.assets.length > 0) {
            allAssets = allAssets.concat(assets.assets);
            if (assets.hasNextPage) {
              assets = await MediaLibrary.getAssetsAsync({ mediaType: 'photo', after: assets.endCursor });
            } else {
              break;
            }
          }

          setPhotos(allAssets);
        } catch (error) {
          console.error('Error fetching assets:', error);
        }
      } else {
        console.log('Permission denied for accessing media library');
      }
    })();
  }, []);

  const toggleSelected = (id) => {
    setSelectedPhotos((selected) => {
      if (selectedPhotos.includes(id)) {
        return selected.filter((photoId) => photoId !== id);
      } else {
        return [...selected, id];
      }
    });
  };

  const doReset=()=> {
    setSelectedPhotos(()=>[])
  }
  const doSelectAllAfter=()=> {
    setSelectedPhotos(cursel=> {
      
      const [first]=cursel;
      if (!first)
        return [];
      
      const ind = photos.findIndex(v=>v.id===first);
      const ids = photos.slice(ind).map(v=>v.id);
      return Array.from(new Set([...cursel, ...ids]));
    })
  }

  return (
    <View style={styles.container}>
      <Header setIsOpen={setIsOpen} />
      <FlatList
        data={photos}
        keyExtractor={(item) => item.id}
        renderItem={({item})=>{
          console.log(item)
          return <Item 
            {...item} 
            toggleSelected={toggleSelected}  
            isSelected={selectedPhotos.includes(item.id)}
          />
        }}
        numColumns={3} 
      />
      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >

        <MoreModal {...{setIsOpen, doReset, doSelectAllAfter}} />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 10,
    padding: 2,
  },
  checkmark: {
    color: 'white',
    fontSize: 16,
  },
});

export default App;


// import React, { useEffect, useState } from 'react';
// import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
// import * as MediaLibrary from 'expo-media-library';

// const PhotosScreen = () => {
//   const [photos, setPhotos] = useState([]);

//   useEffect(() => {
//     (async () => {
//       const { status } = await MediaLibrary.requestPermissionsAsync();
//       if (status === 'granted') {
//         var photos=[]
//         let assets
//         do {
//           assets = await MediaLibrary.getAssetsAsync({ mediaType: 'photo', ...(assets && {after:assets.endCursor}  ) });
//           photos.push(...assets.assets)
//         } while(assets.hasNextPage)
        
        
//         setPhotos(photos);
//       }

//     })();
//   }, []);


//   let c=0;
//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={photos}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item}) => {
//           //console.log(item);
//           return <Img item={item} cnt={c++} />
//         }}
//       />
//     </View>
//   );
// };

// function Img(props) {
//   const[img, setimg]=useState()

//   const fetchImageFromUri = async (id) => {
//     const asset = await MediaLibrary.getAssetInfoAsync(id);
//     return asset?.localUri;
//   };


//   useEffect(()=> {
    
//     fetchImageFromUri(props.item.id).then(setimg);
//   },[])

//   if (!img)
//     return <Text>fetching</Text>;

//   return <View style={styles.photoContainer}>
    
//   <Image
//     source={{ uri: img }} 
//     style={{
//         width: 200,
//         height: 200,
//         resizeMode: 'contain',
//       }}
//     onError={error=>console.log(error)}
//   />
//   <Text>{props.cnt}</Text>
// </View>
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   photoContainer: {
//     margin: 5,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 5,
//   },
//   photo: {
//     width: 100,
//     height: 100,
//   },
// });

// export default PhotosScreen;



// // import React, { useState } from 'react';
// // import { Button, Image, View, Dimensions } from 'react-native';
// // import * as ImagePicker from 'expo-image-picker';
// // import * as MediaLibrary from 'expo-media-library';
// // import * as FileSystem from 'expo-file-system';

// // export default function App() {
// //   // const [image, setImage] = useState(null);

// //   // const pickImage = async () => {
// //   //   // Request media library permissions
// //   //   const { status } = await MediaLibrary.requestPermissionsAsync();
// //   //   if (status !== 'granted') {
// //   //     alert('Sorry, we need camera roll permissions to make this work!');
// //   //     return;
// //   //   }

// //   //   // Launch the image picker without any resizing options
// //   //   let result = await ImagePicker.launchImageLibraryAsync({
// //   //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
// //   //     allowsEditing: false,
// //   //     quality: 1,
// //   //   });

// //   //   // If the user did not cancel the picker
// //   //   if (!result.canceled) {
// //   //     setImage(result.assets[0].uri);
// //   //   }
// //   // };

// //   // const uploadImage = async () => {
// //   //   if (!imageUri) {
// //   //     Alert.alert('No image selected', 'Please pick an image first.');
// //   //     return;
// //   //   }

// //   //   const apiUrl = 'https://your-api-endpoint.com/upload'; // Replace with your API endpoint

// //   //   let filename = imageUri.split('/').pop();
// //   //   let match = /\.(\w+)$/.exec(filename);
// //   //   let type = match ? `image/${match[1]}` : `image`;

// //   //   let formData = new FormData();
// //   //   formData.append('photo', { uri: imageUri, name: filename, type });

// //   //   try {
// //   //     let response = await fetch(apiUrl, {
// //   //       method: 'POST',
// //   //       body: formData,
// //   //       headers: {
// //   //         'Content-Type': 'multipart/form-data',
// //   //       },
// //   //     });
// //   //     let responseJson = await response.json();
// //   //     if (response.ok) {
// //   //       Alert.alert('Success', 'Image uploaded successfully!');
// //   //     } else {
// //   //       Alert.alert('Upload failed', responseJson.message);
// //   //     }
// //   //   } catch (error) {
// //   //     console.error('Error uploading image:', error);
// //   //     Alert.alert('Error', 'There was an error uploading the image.');
// //   //   }
// //   // };

// //   // const deleteImage = async () => {
// //   //   if (imageUri) {
// //   //     try {
// //   //       // Request media library permissions
// //   //       const { status } = await MediaLibrary.requestPermissionsAsync();
// //   //       if (status !== 'granted') {
// //   //         alert('Sorry, we need camera roll permissions to make this work!');
// //   //         return;
// //   //       }

// //   //       // Get the asset info using the image URI
// //   //       const asset = await MediaLibrary.getAssetInfoAsync(imageUri);
// //   //       if (asset && asset.id) {
// //   //         await MediaLibrary.deleteAssetsAsync([asset.id]);
// //   //         setImage(null);
// //   //         setImageUri(null);
// //   //         Alert.alert('Image Deleted', 'The image has been deleted successfully.');
// //   //       }
// //   //     } catch (error) {
// //   //       console.error('Error deleting image:', error);
// //   //       Alert.alert('Error', 'There was an error deleting the image.');
// //   //     }
// //   //   }
// //   // };

// //   return (
// //     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
// //       <Button title="Pick an image from camera roll" onPress={pickImage} />
// //       {image && (
// //         <Image
// //           source={{ uri: image }}
// //           style={{
// //             width: Dimensions.get('window').width,
// //             height: Dimensions.get('window').height,
// //             resizeMode: 'contain',
// //           }}
// //         />
// //       )}
// //     </View>
// //   );
// // }


// // /*
// //   const connectWebSocket = async () => {
// //     const ws = new WebSocket('ws://your-server-endpoint.com/upload');
// //     ws.onopen = () => {
// //       setSocket(ws);
// //       console.log('WebSocket connection established');
// //     };
// //     ws.onclose = () => {
// //       console.log('WebSocket connection closed');
// //     };
// //     ws.onerror = (error) => {
// //       console.error('WebSocket error:', error);
// //     };
// //   };

// //   const disconnectWebSocket = () => {
// //     if (socket) {
// //       socket.close();
// //       setSocket(null);
// //     }
// //   };

// //   const uploadPhoto = async () => {
// //     try {
// //       const result = await ImagePicker.launchImageLibraryAsync({
// //         mediaTypes: ImagePicker.MediaTypeOptions.Images,
// //         allowsEditing: false,
// //         quality: 1,
// //       });

// //       if (!result.cancelled && socket) {
// //         const imageUri = result.uri;
// //         const response = await fetch(imageUri);
// //         const blob = await response.blob();
// //         const reader = new FileReader();
// //         reader.onloadend = () => {
// //           socket.send(reader.result);
// //           Alert.alert('Photo uploaded successfully!');
// //         };
// //         reader.onerror = (error) => {
// //           console.error('Photo reading error:', error);
// //           Alert.alert('Error', 'There was an error reading the photo.');
// //         };
// //         reader.readAsArrayBuffer(blob);
// //       } else {
// //         Alert.alert('WebSocket connection not established or photo selection cancelled');
// //       }
// //     } catch (error) {
// //       console.error('Error uploading photo:', error);
// //       Alert.alert('Error', 'There was an error uploading the photo.');
// //     }
// //   };
// // */
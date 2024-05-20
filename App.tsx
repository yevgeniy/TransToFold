import React, { useState, useEffect } from 'react';
import { Button, View, Text, Image } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';

const App = () => {
  const [permission, setPermission] = useState<boolean|null>(null);
  const [image, setImage] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      setPermission(status === 'granted');
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const saveImage = async () => {
    if (image) {
      try {
        const asset = await MediaLibrary.createAssetAsync(image);
        const album = await MediaLibrary.getAlbumAsync('Expo');
        if (album == null) {
          await MediaLibrary.createAlbumAsync('Expo', asset, false);
        } else {
          await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
        }
        //@ts-ignore
        alert('Photo saved!');
      } catch (e) {
        console.log(e);
        //@ts-ignore
        alert('Failed to save photo');
      }
    } else {
      //@ts-ignore
      alert('No image selected');
    }
  };

  if (permission === null) {
    return <View />;
  }
  if (permission === false) {
    return <Text>No access to camera roll</Text>;
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      {image && <Button title="Save this image" onPress={saveImage} />}
    </View>
  );
};

export default App;

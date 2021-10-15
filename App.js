import { StatusBar } from 'expo-status-bar';

import { Camera } from 'expo-camera';

import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';

export default function App() {
  /**
   * @type {Camera}
   */
  let camera;

  const [hasPermission, setPermission] = useState(false);

  const checkPermission = async () => {
    const { status } = await Camera.getCameraPermissionsAsync();
    if (status === 'granted') {
      setPermission(true);
    }
  };

  useEffect(() => {
    checkPermission();
  }, []);

  const getPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status === 'granted') {
      setPermission(true);
    } else {
      Alert.alert('access denied');
    }
  };

  const [preview, setPreview] = useState(null);

  const takePicture = async () => {
    if (!hasPermission) {
      return getPermission();
    }

    if (!camera) {
      return;
    }

    const photo = await camera.takePictureAsync();
    setPreview(photo);
  };

  return (
    <View style={styles.container}>
      { preview ?
        <Image source={preview} /> : (
        <Camera style={styles.camera} ref={r => camera = r}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={takePicture}>
              <Text style={styles.buttonText}>Take a picture</Text>
            </TouchableOpacity>
          </View>
        </Camera>
      )}
      <StatusBar style="auto" />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flex: 1, // this is cool
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#000',
  },
  buttonText: {
    color: '#fff',
    padding: 10,
  },
  camera: {
    flex: 1,
    width: "100%",
  },
});

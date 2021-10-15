import { StatusBar } from 'expo-status-bar';

import { Camera } from 'expo-camera';

import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';

export default function App() {
  let camera;

  const [hasPermission, setPermission] = useState(false);

  const getPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status === 'granted') {
      setPermission(true);
    } else {
      Alert.alert('access denied');
    }
  };

  const takePicture = async () => {
    if (!hasPermission) {
      return getPermission();
    }

    if (!camera) {
      return;
    }
  };

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} ref={r => camera = r}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={takePicture}>
            <Text style={styles.buttonText}>Take a picture</Text>
          </TouchableOpacity>
        </View>
      </Camera>
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

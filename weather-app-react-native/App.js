import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const BASE_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?';
export default function App() {
  const [errorMessage, setErrorMessage] = useState(null);
  
  useEffect(() => {
    load();
  }, []);

  async function load() {
    setErrorMessage(null);
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
          setErrorMessage('Access to location is needed to run the app')
          return
      }
      const location = await Location.getCurrentPositionAsync();
      const {latitude, longitude} = location.coords; //coords is property of location object from async function
      const weatherURL = `${BASE_WEATHER_URL}lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}`;
    }
    catch (error) {
      console.log('error with try catch location')
    }
  }

  return (
    <View style={styles.container}>
      <Text>Hello from react native</Text>
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
});


import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';
const BASE_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?';
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
import Weatherinfo from './components/Weatherinfo';
import UnitsPicker from './components/UnitsPicker';

export default function App() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [unitsSystem, setUnitsSystem] = useState('metric'); //metric => C imperial => F
  useEffect(() => {
    load();
  }, [unitsSystem]);

  async function load() {
    setCurrentWeather(null); //just in case
    setErrorMessage(null);
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
          setErrorMessage('Access to location is needed to run the app')
          return
      }
      const location = await Location.getCurrentPositionAsync();
      const {latitude, longitude} = location.coords; //coords is property of location object from async function
      const weatherURL = `${BASE_WEATHER_URL}lat=${latitude}&lon=${longitude}&units=${unitsSystem}&appid=${WEATHER_API_KEY}`;
      const response = await fetch(weatherURL);
      const result = await response.json();
      response.ok ? setCurrentWeather(result) : setErrorMessage(result.message); //if 200 else server message
    
    }
    catch (error) {
      setErrorMessage(error.message);
    }
  }

  if (currentWeather) {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.main}>
          <UnitsPicker unitsSystem={unitsSystem} setUnitsSystem={setUnitsSystem} />
          <Weatherinfo currentWeather={currentWeather}/>
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text>{errorMessage}</Text>
        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  main: {
    justifyContent: 'center',
    flex: 1,
  }
});


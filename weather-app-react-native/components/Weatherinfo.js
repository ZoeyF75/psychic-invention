import React from 'react'
import { View, Text } from 'react-native'

export default function Weatherinfo({ currentWeather }) {
  const { main : { temp }} = currentWeather;
  return (
    <View>
      <Text>{temp}</Text>
    </View>
  )
}

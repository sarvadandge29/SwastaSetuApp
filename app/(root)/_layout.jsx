import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import Header from '../../components/Header'

const RootLayout = () => {
  return (
    <View className="flex-1">
      <Header />
      <Tabs>
        <Tabs.Screen name="doctorPost" options={{ headerShown: false }} />
        <Tabs.Screen name="nearbyResources" options={{ headerShown: false }} />
        <Tabs.Screen name="selfDiagonosis" options={{ headerShown: false }} />
        <Tabs.Screen name="socialCampaign" options={{ headerShown: false }} />
      </Tabs>
    </View>
  )
}

export default RootLayout
import { View } from 'react-native';
import React, { useEffect } from 'react';
import { Tabs } from 'expo-router';
import Header from '../../components/Header';
import useStore from '../../service/store';
import { Ionicons, Fontisto } from '@expo/vector-icons';
import { getCurrentUser, getLocalStorage } from '../../service/Storage';

const RootLayout = () => {
  const { currentUser, updateCurrentUser } = useStore();

  useEffect(() => {
    const fetchUserDetails = async () => {
      const userSession = await getLocalStorage('user');
      if(userSession){
        const user = await getCurrentUser(userSession?.user_metadata?.sub);
        updateCurrentUser(user);
      }
    };

    fetchUserDetails();
  })

  return (
    <View className="flex-1">
      <Header user={currentUser} />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#22c55e',
          tabBarInactiveTintColor: '#9ca3af',
          tabBarStyle: {
            backgroundColor: '#ffffff',
          },
        }}>
        <Tabs.Screen
          name="doctorPost"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Fontisto name="doctor" size={size} color={color} />

            ),
            tabBarLabel: 'Doctor Post',
          }}
        />
        <Tabs.Screen
          name="nearbyResources"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="location" color={color} size={size} />
            ),
            tabBarLabel: 'Nearby Resources',
          }}
        />
        <Tabs.Screen
          name="selfDiagonosis"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="body" color={color} size={size} />
            ),
            tabBarLabel: 'Self Diagnosis',
          }}
        />
        <Tabs.Screen
          name="socialCampaign"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="people" color={color} size={size} />
            ),
            tabBarLabel: 'Social Campaign',
          }}
        />
      </Tabs>
    </View>
  );
};

export default RootLayout;
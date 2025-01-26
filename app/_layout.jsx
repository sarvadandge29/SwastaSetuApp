import React, { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import '../global.css';
import { getLocalStorage } from '../service/Storage';

const HomeLayout = () => {
  const router = useRouter();
  const [fontsLoaded, error] = useFonts({
    'IBMPlexSans-Regular': require('../assets/fonts/IBMPlexSans-Regular.ttf'),
    'IBMPlexSans-Medium': require('../assets/fonts/IBMPlexSans-Medium.ttf'),
    'IBMPlexSans-SemiBold': require('../assets/fonts/IBMPlexSans-SemiBold.ttf'),
    'IBMPlexSans-Bold': require('../assets/fonts/IBMPlexSans-Bold.ttf'),
    'bebasNeueRegular': require('../assets/fonts/BebasNeue-Regular.ttf'),
  });

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }

    const checkUserLoggedIn = async () => {
      const user = await getLocalStorage('user');
      if (user) {
        router.push('/doctorPost');
      }
    };

    checkUserLoggedIn();

  }, [fontsLoaded, error, router]);

  if (!fontsLoaded) {
    return null;
  }

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <>
      <StatusBar style="light" backgroundColor="#22c55e" />
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(common)" options={{ headerShown: false }} />
        <Stack.Screen name="(root)" options={{ headerShown: false }} />
      </Stack>
    </>
  );
};

export default HomeLayout;

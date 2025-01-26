import React, { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import '../global.css';
import { UserProvider } from '../context/UserContext';
import { getLocalStorage } from '../service/Storage'; // Import localStorage utility

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
      // Check if the user is already logged in
      const user = await getLocalStorage('user');
      if (user) {
        // If user data exists in localStorage, navigate to the main page (DoctorPost)
        router.push('/doctorPost');
      } else {
        // If no user data, stay on the sign-in page
        router.push('/signIn');
      }
    };

    checkUserLoggedIn();  // Check user login status when fonts are loaded

  }, [fontsLoaded, error, router]);

  if (!fontsLoaded) {
    return null;  // Return null while fonts are loading
  }

  if (!fontsLoaded && !error) {
    return null;  // Return null if fonts are not loaded or there is an error
  }

  return (
    <UserProvider>
      <StatusBar style="light" backgroundColor="#22c55e" />
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(common)" options={{ headerShown: false }} />
        <Stack.Screen name="(root)" options={{ headerShown: false }} />
      </Stack>
    </UserProvider>
  );
};

export default HomeLayout;

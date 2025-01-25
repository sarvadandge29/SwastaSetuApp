import React, { useEffect } from 'react'
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router'
import "../global.css";


const HomeLayout = () => {
    const [fontsLoaded, error] = useFonts({
        "IBMPlexSans-Regular": require("../assets/fonts/IBMPlexSans-Regular.ttf"),
        "IBMPlexSans-Medium": require("../assets/fonts/IBMPlexSans-Medium.ttf"),
        "IBMPlexSans-SemiBold": require("../assets/fonts/IBMPlexSans-SemiBold.ttf"),
        "IBMPlexSans-Bold": require("../assets/fonts/IBMPlexSans-Bold.ttf"),
        "bebasNeueRegular": require("../assets/fonts/BebasNeue-Regular.ttf"),
    });

    useEffect(() => {
        if (error) throw error;

        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded, error]);

    if (!fontsLoaded) {
        return null;
    }

    if (!fontsLoaded && !error) {
        return null;
    }
    return (
        <Stack>
            <Stack.Screen name='index' options={{ headerShown: false }} />
        </Stack>
    )
}

export default HomeLayout
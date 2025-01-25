import React from 'react'
import { Stack } from 'expo-router'

const CommonLayout = () => {
    return (
        <Stack>
            <Stack.Screen name='profileEdit' options={{ headerShown: false }} />
            <Stack.Screen name='inbox' options={{ headerShown: false }} />
        </Stack>
    )
}

export default CommonLayout
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import * as Location from 'expo-location';

export default function signUp() {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState({ latitude: null, longitude: null });

  const handleGetLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
    Alert.alert('Location fetched successfully!');
  };

  // const handlesignUp = () => {
  //   if (!username || !email || !phone || !password || !location.latitude || !location.longitude) {
  //     Alert.alert('Please fill all fields and fetch your location');
  //     return;
  //   }

  //   // Handle sign-up logic here (e.g., API call to register user)
  //   console.log('User signed up:', { username, email, phone, password, location });
  //   Alert.alert('Sign up successful!');
  //   router.replace('signIn'); // Redirect to sign-in page after successful sign-up
  // };

  return (
    <View className="p-6">
      {/* Header */}
      <Text className="text-3xl font-bold mt-4">Create Your Account</Text>
      <Text className="text-lg text-gray-500 mt-2">Join us and get started!</Text>

      {/* Username Input */}
      <View className="mt-6">
        <Text className="text-base">Username</Text>
        <TextInput
          placeholder="Username"
          className="p-3 border border-gray-300 rounded-lg mt-1 bg-white"
          onChangeText={(value) => setUsername(value)}
        />
      </View>

      {/* Email Input */}
      <View className="mt-6">
        <Text className="text-base">Email</Text>
        <TextInput
          placeholder="Email"
          className="p-3 border border-gray-300 rounded-lg mt-1 bg-white"
          onChangeText={(value) => setEmail(value)}
        />
      </View>

      {/* Phone Number Input */}
      <View className="mt-6">
        <Text className="text-base">Phone Number</Text>
        <TextInput
          placeholder="Phone Number"
          className="p-3 border border-gray-300 rounded-lg mt-1 bg-white"
          onChangeText={(value) => setPhone(value)}
          keyboardType="phone-pad"
        />
      </View>

      {/* Password Input */}
      <View className="mt-6">
        <Text className="text-base">Password</Text>
        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          className="p-3 border border-gray-300 rounded-lg mt-1 bg-white"
          onChangeText={(value) => setPassword(value)}
        />
      </View>

      {/* Get Location Button */}
      <TouchableOpacity
        className="p-4 bg-blue-500 rounded-lg mt-6 border-spacing-0"
        onPress={handleGetLocation}
      >
        <Text className="text-sm text-white text-center">Get Location</Text>
      </TouchableOpacity>

      {/* Display Location */}
      {location.latitude && location.longitude && (
        <View className="mt-4">
          <Text className="text-base">Latitude: {location.latitude}</Text>
          <Text className="text-base">Longitude: {location.longitude}</Text>
        </View>
      )}

      {/* Sign Up Button */}
      <TouchableOpacity
        className="p-4 bg-primary rounded-lg mt-8"
        // onPress={handlesignUp}
      >
        <Text className="text-sm text-white text-center">Sign Up</Text>
      </TouchableOpacity>

      {/* Already have an account? Sign In */}
      <TouchableOpacity
        className="mt-4"
        onPress={() => router.push('signIn')}
      >
        <Text className="text-sm text-primary text-center">
          Already have an account? <Text className="font-bold">Sign In</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}
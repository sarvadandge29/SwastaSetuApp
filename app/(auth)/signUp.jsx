import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import * as Location from 'expo-location';
import { supabase } from '../../utils/supabase/client';

export default function SignUp() {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleGetLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Location permission required', 'Please enable location services to continue');
        return;
      }

      setLoading(true);
      const location = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      const cityName = await reverseGeocode(location.coords.latitude, location.coords.longitude);
      setCity(cityName);
      Alert.alert('Location fetched successfully!');
    } catch (err) {
      Alert.alert('Location Error', 'Unable to fetch location details. Please try again.');
      console.error('Location error:', err);
    } finally {
      setLoading(false);
    }
  };

  const reverseGeocode = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
        {
          headers: {
            'User-Agent': 'Your-App-Name' // IMPORTANT: Replace with your app name
          }
        }
      );
      
      if (!response.ok) throw new Error('Geocoding failed');
      
      const data = await response.json();
      
      // Enhanced location parsing for Greater Noida
      const address = data.address || {};
      return address.county || address.state_district || address.village ||  address.state || "Unknown Location";
    } catch (err) {
      console.error('Geocoding error:', err);
      throw new Error('Failed to determine location');
    }
  };

  const handleSignUp = async () => {
    if (phoneNumber.length !== 10 || !/^[\d]+$/.test(phoneNumber)) {
      setError("Phone number must be exactly 10 digits.");
      return;
    }

    if (!city) {
      setError("Location is required. Please enable location services.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const { data, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) {
        throw authError;
      }

      const user = data?.user;
      const { error: updateError } = await supabase.auth.updateUser({
        data: {
          display_name: username,
        },
      });

      const { error: insertError } = await supabase.from("user").insert([
        {
          userId: user?.id,
          userName: username,
          email: user?.email,
          phoneNumber: phoneNumber,
          location: city,
        },
      ]);

      if (insertError) {
        throw insertError;
      }

      setSuccessMessage("Sign up successful! Redirecting...");
      setTimeout(() => {
        router.replace('/doctorPost');
      }, 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

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
          keyboardType='email-address'
        />
      </View>

      {/* Phone Number Input */}
      <View className="mt-6">
        <Text className="text-base">Phone Number</Text>
        <TextInput
          placeholder="Phone Number"
          className="p-3 border border-gray-300 rounded-lg mt-1 bg-white"
          onChangeText={(value) => setPhoneNumber(value)}
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
          <Text className="text-base">City: {city}</Text>
        </View>
      )}

      {/* Error Message */}
      {error && (
        <View className="mt-4">
          <Text className="text-base text-red-500">{error}</Text>
        </View>
      )}

      {/* Success Message */}
      {successMessage && (
        <View className="mt-4">
          <Text className="text-base text-green-500">{successMessage}</Text>
        </View>
      )}

      {/* Sign Up Button */}
      <TouchableOpacity
        className="p-4 bg-primary rounded-lg mt-8"
        onPress={handleSignUp}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="text-sm text-white text-center">Sign Up</Text>
        )}
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
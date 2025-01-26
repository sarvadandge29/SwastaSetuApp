import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { supabase } from '../../utils/supabase/client';
import { setLocalStorage } from '../../service/Storage'; // Import local storage helper

export default function SignIn() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const checkLoginStatus = async () => {
      const userData = await getLocalStorage('user');
      if (userData) {
        router.push('/doctorPost');
      }
    };
    checkLoginStatus();
  }, []);

  const handleSignIn = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        Alert.alert('Error', error.message);
      } else {
        await setLocalStorage('user', data.user);
        Alert.alert('Success', 'You are signed in!');
        router.push('/doctorPost');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View className="p-6">
      {/* Header */}
      <Text className="text-3xl font-bold mt-4">Let's Sign You In</Text>
      <Text className="text-3xl font-bold mt-2 text-gray-500">Welcome Back</Text>
      <Text className="text-3xl font-bold mt-2 text-gray-500">You've been missed!</Text>

      {/* Email Input */}
      <View className="mt-6">
        <Text className="text-base">Email</Text>
        <TextInput
          placeholder="Email"
          className="p-3 border border-gray-300 rounded-lg mt-1 bg-white"
          keyboardType='email-address'
          onChangeText={(value) => setEmail(value)}
          value={email}
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
          value={password}
        />
      </View>

      {/* Login Button */}
      <TouchableOpacity
        className="p-4 bg-primary rounded-lg mt-8"
        onPress={handleSignIn}
      >
        <Text className="text-sm text-white text-center">Login</Text>
      </TouchableOpacity>

      {/* Create Account Button */}
      <TouchableOpacity
        className="p-4 bg-white border border-primary rounded-lg mt-4"
        onPress={() => router.push('signUp')}
      >
        <Text className="text-sm text-primary text-center">Create Account</Text>
      </TouchableOpacity>
    </View>
  );
}

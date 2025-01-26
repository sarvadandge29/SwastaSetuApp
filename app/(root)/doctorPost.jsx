import { View, Text, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import { removeLocalStorage } from '../../service/Storage'; // Use the correct function name

const DoctorPost = () => {
  const router = useRouter();

  // Logout handler
  const handleLogout = async () => {
    try {
      console.log('Attempting to log out...');
      await removeLocalStorage(); // Clear the local storage
      Alert.alert('Success', 'Logged out successfully!');
      router.push('/signIn'); // Redirect to sign-in page
    } catch (error) {
      console.error('Logout Error:', error);
      Alert.alert('Error', `An error occurred while logging out: ${error.message}`);
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="items-center justify-center flex-1">
        <Text className="text-xl font-bold">DoctorPost</Text>

        {/* Logout Button */}
        <TouchableOpacity
          className="mt-6 p-4 bg-red-500 rounded-lg"
          onPress={handleLogout}
        >
          <Text className="text-sm text-white text-center">Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default DoctorPost;

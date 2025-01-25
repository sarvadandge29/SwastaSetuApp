import { SafeAreaView, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const Header = () => {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-row h-16 justify-end items-end mt-2 bg-gray-50 border-b border-gray-200">
      <Text className="text-lg font-bold flex-1"></Text>
      <TouchableOpacity
        className="px-3 py-2 bg-blue-500 rounded flex-row items-center"
        onPress={() => router.push('/inbox')}
      >
        <Ionicons name="mail" size={20} color="black" />
        <Text className="text-white font-bold ml-2">Inbox</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Header;
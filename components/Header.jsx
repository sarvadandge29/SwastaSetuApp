import { Image, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const Header = ({ user }) => {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-row h-20 justify-end items-end mt-2 bg-gray-50 border-b border-gray-200">
      <TouchableOpacity
        className="text-lg flex-1 px-3 py-2 justify-center rounded-full"
        onPress={() => router.push('/profileEdit')}>
        <Ionicons name="person" size={25} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        className="px-3 py-2 bg-blue-500 rounded flex-row items-center"
        onPress={() => router.push('/inbox')}
      >
        <Ionicons name="mail" size={25} color="black" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Header;
import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, Image, TouchableOpacity, SafeAreaView } from 'react-native';

const Index = () => {
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-white">
      {/* Main Container */}
      <View className="w-full max-w-4xl px-5">
        {/* Content Container */}
        <View className="flex-col justify-center items-center">
          {/* Left Section */}
          <View className="w-full items-center">
            <Text className="text-4xl font-bold leading-tight text-center">
              Swastya Setu {'\n'}
              <Text className="text-primary">समृद्ध आयु</Text>
            </Text>
            <Text className="mt-6 text-gray-700 text-lg text-center">
              Swasth Setu combines real-time disease tracking, AI-driven predictions, and geospatial analysis to empower communities and authorities. With multilingual support and localized alerts, we provide actionable insights, enabling proactive measures and resource management to prevent disease spread and build a resilient health ecosystem.
            </Text>

            <TouchableOpacity 
            className="mt-10 px-6 py-3 border rounded-md items-center justify-center"
              onPress={() => router.push('/signIn')}
            >
              <Text className="text-primary hover:text-white">Continue With Email</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </SafeAreaView>
  );
};

export default Index;
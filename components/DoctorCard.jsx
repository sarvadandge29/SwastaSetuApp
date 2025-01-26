import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

const DoctorCard = ({ title, content, imageLink, location, userName, onPress }) => {
    return (
        <View className="bg-white rounded-lg shadow-md m-3 overflow-hidden">
            <View className="px-3">
                <View className="p-4 border-b border-gray-200">
                    <Text className="text-lg font-bold">{title}</Text>
                </View>
                <View className="p-4">
                    <Text className="text-gray-600">{content}</Text>
                    {imageLink && (
                        <Image
                            source={{ uri: imageLink }}
                            className="w-full h-48 rounded-lg mt-4"
                            resizeMode="contain"
                        />
                    )}
                    <Text className="mt-4 text-sm text-gray-500">
                        <Text className="font-bold">Location:</Text> {location}
                    </Text>
                    <Text className="text-sm text-gray-500">
                        <Text className="font-bold">Posted by:</Text> {userName}
                    </Text>
                </View>
                <TouchableOpacity
                    className="p-4 border-t border-gray-200 items-center"
                    onPress={onPress}
                >
                    <Text className="text-blue-500 font-bold">View Details</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default DoctorCard;
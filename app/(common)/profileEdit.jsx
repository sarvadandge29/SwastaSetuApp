import { View, Text, Button, Alert, TouchableOpacity } from 'react-native';
import React from 'react';
import { removeLocalStorage } from '../../service/Storage';
import { useRouter } from 'expo-router';
import useStore from '../../service/store';

const ProfileEdit = () => {
    const router = useRouter();
  const { updateCurrentUser } = useStore();

    const handleSignOut = async () => {
        try {
            await removeLocalStorage();
            updateCurrentUser(null);
            Alert.alert('Success', 'Logged out successfully!');
            router.push('/signIn');
        } catch (error) {
            console.error('Logout Error:', error);
            Alert.alert('Error', `An error occurred while logging out: ${error.message}`);
        }
    };

    return (
        <View className="items-center justify-center flex-1">
            <TouchableOpacity
                className="bg-primary p-4 rounded-full"
                onPress={handleSignOut}
            >
                <Text className="font-bold text-white">Sign Out</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ProfileEdit;
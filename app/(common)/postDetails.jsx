import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router'; // For accessing route params
import { supabase } from '@/utils/supabase/client'; // Import Supabase client

const PostDetails = () => {
  const { id } = useLocalSearchParams(); // Get the post ID from the URL
  const [post, setPost] = useState(null); // State to store the post details
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch the specific post from Supabase
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data, error } = await supabase
          .from('posts') // Use the correct table name
          .select('*')
          .eq('id', id) // Filter by the post ID
          .single(); // Fetch a single record

        if (error) throw error;

        setPost(data); // Set the post data
      } catch (error) {
        setError(error.message); // Set error message
      } finally {
        setLoading(false); // Set loading to false
      }
    };

    fetchPost();
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Error state
  if (error) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-500">{error}</Text>
      </View>
    );
  }

  // If no post is found
  if (!post) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-gray-500">Post not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 p-4 bg-white">
      <View className="w-full h-64 rounded-lg overflow-hidden mb-4">
        <Image
          source={{ uri: post.imageLink }}
          className="w-full h-full"
          resizeMode="contain"
        />
      </View>

      {/* Post Title */}
      <Text className="text-2xl font-bold text-primary mb-2">
        {post.title}
      </Text>

      {/* Post Description */}
      <Text className="text-gray-700 text-base mb-4">
        {post.userName}
      </Text>

      {/* Raised Amount */}
      {/* <View className="flex-row justify-between items-center mb-4">
        <Text className="text-sm font-semibold">
          Raised: {post.currentAmount}{' '}
          <Text className="text-gray-600">of {post.targetAmount}</Text>
        </Text>
      </View> */}

    </ScrollView>
  );
};

export default PostDetails;
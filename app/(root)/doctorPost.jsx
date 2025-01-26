import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, ActivityIndicator, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '../../utils/supabase/client';
import DoctorCard from '../../components/DoctorCard'; 

const DoctorPost = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data, error } = await supabase
          .from("posts")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;

        setPosts(data || []);
      } catch (error) {
        setError("Failed to fetch posts.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-500">{error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1">
      <ScrollView>
        <View className="p-3">
          {posts.map((post) => (
            <DoctorCard
              key={post.id}
              title={post.title}
              content={post.content}
              imageLink={post.imageLink}
              location={post.location}
              userName={post.userName}
              onPress={() => {
                router.push({pathname :"/postDetails" , params:{id : post.id}})
              }}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DoctorPost;
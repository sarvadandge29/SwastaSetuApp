import React, { useEffect, useState, useCallback } from "react";
import { View, SafeAreaView, ActivityIndicator, ScrollView, RefreshControl, Text } from "react-native";
import { useRouter } from "expo-router";
import { supabase } from "../../utils/supabase/client";
import DoctorCard from "../../components/DoctorCard";

const DoctorPost = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    try {
      setError(null);
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

  useEffect(() => {
    fetchPosts();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchPosts();
    setRefreshing(false);
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
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
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
                router.push({ pathname: "/postDetails", params: { id: post.id } });
              }}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DoctorPost;

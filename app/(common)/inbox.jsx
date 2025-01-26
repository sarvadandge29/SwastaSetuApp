import { View, Text, ActivityIndicator, ScrollView, RefreshControl } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { supabase } from '../../utils/supabase/client';

const Inbox = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchAlerts = async () => {
    try {
      const { data, error } = await supabase
        .from("alerts")
        .select("*")
        .order("id", { ascending: false });

      if (error) throw error;

      setAlerts(data || []);
    } catch (error) {
      console.error("Failed to fetch Alerts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchAlerts();
    setRefreshing(false);
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50">
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50 mt-7">
      {/* Header */}
      <View className="bg-white py-4 px-6 shadow-sm border-b border-gray-100">
        <Text className="text-2xl font-bold text-gray-900">Alerts</Text>
      </View>
      {/* Alerts List */}
      <ScrollView
        className="flex-1 px-4 pt-4"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {alerts.map((alert) => (
          <View
            key={alert.id}
            className="bg-white rounded-lg p-4 mb-3 shadow-sm border border-gray-100"
          >
            <View className="flex-row justify-between items-start mb-2">
              <Text className="text-lg font-semibold text-gray-900 flex-1">
                {alert.title}
              </Text>
            </View>
            <Text className="text-base text-gray-600 leading-5">
              {alert.message}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Inbox;

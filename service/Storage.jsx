import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../utils/supabase/client';

export const setLocalStorage = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error saving data to local storage', error);
  }
};

export const getLocalStorage = async (key) => {
  try {
    const result = await AsyncStorage.getItem(key);
    return JSON.parse(result);
  } catch (error) {
    console.error('Error retrieving data from local storage', error);
    return null;
  }
};

export const removeLocalStorage = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error('Error clearing local storage', error);
  }
};

export const getCurrentUser = async (userId) => {
  try {
    const { data: userDetails, error } = await supabase
      .from("user")
      .select("*")
      .eq("userId", userId)
      .single();

    if (error) {
      console.error('Error fetching user details', error.message);
    }
    // if (userDetails?.userType === "doctors") {
    //   const { data: doctorDetails, error } = await supabase
    //     .from("doctors")
    //     .select("*")
    //     .eq("userId", userId)
    //     .single();

    //   return doctorDetails;
    // }
    return userDetails;
  } catch (error) {
    console.error('Error fetching user', error.message);
  }
}

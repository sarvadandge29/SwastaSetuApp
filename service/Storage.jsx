import AsyncStorage from '@react-native-async-storage/async-storage';

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

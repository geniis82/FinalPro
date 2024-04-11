import AsyncStorage from "@react-native-async-storage/async-storage"

export const setItemOnAsyncStorage = async (key, value) => {

    if (typeof value !== "string") {
        value = JSON.stringify(value)
    }
    await AsyncStorage.setItem(key, value);
}

export const getItemFromAsyncStorage =async  (key) => {
    return await AsyncStorage.getItem(key)
    // return value;
}
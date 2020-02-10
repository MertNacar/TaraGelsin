import AsyncStorage from "@react-native-community/async-storage";

export const getTokenStorage = async () => {
  try {
    let value;
    value = await AsyncStorage.getItem("tokenJWT");
    if (value !== null) return { value, err: false }
    else throw new Error()
  } catch {
    return { err: true };
  }
};

/**
 * @param {JsonWebKey} token - UserToken
 */
export const storeTokenStorage = async token => {
  try {
    await AsyncStorage.setItem("tokenJWT", token);
    return { err: false };
  } catch {
    return { err: true };
  }
};

export const removeTokenStorage = async () => {
  try {
    await AsyncStorage.removeItem("tokenJWT");
    return { err: false };
  } catch {
    return { err: true };
  }
};

export const getPhoneStorage = async () => {
  try {
    let value;
    value = await AsyncStorage.getItem("phone");
    if (value !== null) return { value, err: false }
    else throw new Error()
  } catch {
    return { err: true };
  }
};

/**
 * @param {string} phone - UserToken
 */
export const storePhoneStorage = async phone => {
  try {
    await AsyncStorage.setItem("phone", phone);
    return { err: false };
  } catch {
    return { err: true };
  }
};

export const removePhoneStorage = async () => {
  try {
    await AsyncStorage.removeItem("phone");
    return { err: false };
  } catch {
    return { err: true };
  }
};

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

export const storeTokenStorage = async token => {
    try {
        await AsyncStorage.setItem("tokenJWT", token);
        return { err: false };
    } catch {
        return { err: true };
    }
};

export const getUserStorage = async () => {
    try {
        let value;
        value = await AsyncStorage.getItem("username");
        if (value !== null) return { value, err: false }
        else throw new Error()
    } catch {
        return { err: true };
    }
};

export const storeUserStorage = async username => {
    try {
        await AsyncStorage.setItem("username", username);
        return { err: false };
    } catch {
        return { err: true };
    }
};

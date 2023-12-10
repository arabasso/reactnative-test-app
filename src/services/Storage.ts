import AsyncStorage from '@react-native-async-storage/async-storage';

export interface IStorageService {
    setItem<T>(key: string, value: T): Promise<void>;
    getItem<T>(key: string): Promise<T | null>;
    removeItem(key: string): Promise<void>;
}

export class StorageService implements IStorageService {
    public async removeItem(key: string): Promise<void> {
        await AsyncStorage.removeItem(key);
    }

    public async setItem<T>(key: string, value: T): Promise<void> {
        await AsyncStorage.setItem(key, JSON.stringify(value));
    }

    public async getItem<T>(key: string): Promise<T | null> {
        const jsonValue = await AsyncStorage.getItem(key);

        return jsonValue != null ? JSON.parse(jsonValue) : null;
    }
}

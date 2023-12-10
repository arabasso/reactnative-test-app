import { IStorageService, SecureStorageService, StorageService } from "@services/Storage";
import { useState } from "react";

type StorageHook = {
    storageService: IStorageService,
    secureStorageService: IStorageService;
}

export function useStorage(): StorageHook {
    const [ storageService ] = useState(new StorageService());
    const [ secureStorageService ] = useState(new SecureStorageService());

    return {
        storageService,
        secureStorageService,
    }
}
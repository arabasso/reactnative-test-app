import { IStorageService, StorageService } from "@services/Storage";
import { useState } from "react";

type StorageHook = {
    storageService: IStorageService,
}

export function useStorage(): StorageHook {
    const [ storageService ] = useState(new StorageService());

    return {
        storageService
    }
}
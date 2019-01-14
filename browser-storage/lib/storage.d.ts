interface StorageProps {
    localStorage?: any;
    sessionStorage?: any;
}
export declare class Storage {
    private localStorage;
    private sessionStorage;
    private isLocalStorageAvailable;
    private isSessionStorageAvailable;
    private areCookiesAvailable;
    constructor({ localStorage, sessionStorage }?: StorageProps);
    setItem(key: string, value: string, isSession?: boolean): boolean;
    getItem(key: string): string | null | undefined;
    removeItem(key: string): boolean;
    private getDecoratedKey;
    private setLocalStorageItem;
    private getLocalStorageItem;
    private removeLocalStorageItem;
    private setCookieItem;
    private getCookieItem;
    private removeCookieItem;
    private setSessionStorageItem;
    private getSessionStorageItem;
    private removeSessionStorageItem;
}
export declare const StorageInstance: Storage;
export {};

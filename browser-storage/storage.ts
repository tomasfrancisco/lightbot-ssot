import * as Cookie from "js-cookie";

const PREFIX = "$browser-storage-";
const SUFIX = "#";

interface StorageProps {
  localStorage?: any;
  sessionStorage?: any;
}

export class Storage {
  private localStorage = window.localStorage;
  private sessionStorage = window.sessionStorage;
  private isLocalStorageAvailable: boolean = true;
  private isSessionStorageAvailable: boolean = true;
  private areCookiesAvailable: boolean = navigator.cookieEnabled;

  constructor({ localStorage, sessionStorage }: StorageProps = {}) {
    if (localStorage) {
      this.localStorage = localStorage;
    }

    if (sessionStorage) {
      this.sessionStorage = sessionStorage;
    }
  }

  public setItem(key: string, value: string, isSession?: boolean): boolean {
    const decoratedKey = this.getDecoratedKey(key);

    let saved: boolean = false;
    if (isSession) {
      saved = this.setSessionStorageItem(decoratedKey, value);
      // TODO: if not, let's save within cookies with limited time
    } else {
      saved = this.setLocalStorageItem(decoratedKey, value);
      if (!saved) {
        saved = this.setCookieItem(decoratedKey, value);
      }
    }

    return saved;
  }

  public getItem(key: string): string | null | undefined {
    const decoratedKey = this.getDecoratedKey(key);

    let item = this.getSessionStorageItem(decoratedKey);
    if (!item) {
      item = this.getLocalStorageItem(decoratedKey);
      if (!item) {
        item = this.getCookieItem(decoratedKey);
      }
    }

    return item;
  }

  public removeItem(key: string): boolean {
    const decoratedKey = this.getDecoratedKey(key);

    return (
      !!this.removeSessionStorageItem(decoratedKey) ||
      !!this.removeLocalStorageItem(decoratedKey) ||
      !!this.removeCookieItem(decoratedKey)
    );
  }

  private getDecoratedKey(key: string) {
    return `${PREFIX}${key}${SUFIX}`;
  }

  private setLocalStorageItem(key: string, value: string): boolean {
    if (!this.isLocalStorageAvailable) {
      return false;
    }
    try {
      this.localStorage.setItem(key, value);
      return true;
    } catch (err) {
      console.warn("Storage:setItem: LocalStorage is not available");
      this.isLocalStorageAvailable = false;
      return false;
    }
  }

  private getLocalStorageItem(key: string): string | null | undefined {
    if (!this.isLocalStorageAvailable) {
      return null;
    }
    try {
      return this.localStorage.getItem(key);
    } catch (err) {
      console.warn("Storage:getItem: LocalStorage is not available");
      this.isLocalStorageAvailable = false;
      return null;
    }
  }

  private removeLocalStorageItem(key: string): boolean {
    if (!this.isLocalStorageAvailable) {
      return false;
    }

    try {
      if (this.localStorage.getItem(key)) {
        this.localStorage.removeItem(key);
        return true;
      }
      return false;
    } catch (err) {
      console.warn("Storage:removeItem: LocalStorage is not available");
      this.isLocalStorageAvailable = false;
      return false;
    }
  }

  private setCookieItem(key: string, value: string): boolean {
    if (!this.areCookiesAvailable) {
      return false;
    }
    if (navigator.cookieEnabled) {
      Cookie.set(key, value);
      return true;
    }

    console.warn("Storage:setItem: Cookies are not available");
    this.areCookiesAvailable = false;
    return false;
  }

  private getCookieItem(key: string): string | null | undefined {
    if (!this.areCookiesAvailable) {
      console.warn("Storage:getItem: Cookies are not available");
      return null;
    }

    return Cookie.get(key);
  }

  private removeCookieItem(key: string): boolean {
    if (!this.areCookiesAvailable) {
      return false;
    }

    if (Cookie.get(key)) {
      Cookie.remove(key);
      return true;
    }
    return false;
  }

  private setSessionStorageItem(key: string, value: string): boolean {
    if (!this.isSessionStorageAvailable) {
      return false;
    }
    try {
      this.sessionStorage.setItem(key, value);
      return true;
    } catch (err) {
      console.warn("Storage:setItem: SessionStorage is not available");
      this.isSessionStorageAvailable = false;
      return false;
    }
  }

  private getSessionStorageItem(key: string): string | null | undefined {
    if (!this.isSessionStorageAvailable) {
      return null;
    }
    try {
      return this.sessionStorage.getItem(key);
    } catch (err) {
      console.warn("Storage:getItem: SessionStorage is not available");
      this.isSessionStorageAvailable = false;
      return null;
    }
  }

  private removeSessionStorageItem(key: string): boolean {
    if (!this.isSessionStorageAvailable) {
      return false;
    }

    try {
      if (this.sessionStorage.getItem(key)) {
        this.sessionStorage.removeItem(key);
        return true;
      }
      return false;
    } catch (err) {
      console.warn("Storage:getItem: SessionStorage is not available");
      this.isSessionStorageAvailable = false;
      return false;
    }
  }
}

export const StorageInstance = new Storage();

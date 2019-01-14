import * as Cookie from "js-cookie";
var PREFIX = "$browser-storage-";
var SUFIX = "#";
var Storage = /** @class */ (function () {
    function Storage(_a) {
        var _b = _a === void 0 ? {} : _a, localStorage = _b.localStorage, sessionStorage = _b.sessionStorage;
        this.localStorage = window.localStorage;
        this.sessionStorage = window.sessionStorage;
        this.isLocalStorageAvailable = true;
        this.isSessionStorageAvailable = true;
        this.areCookiesAvailable = navigator.cookieEnabled;
        if (localStorage) {
            this.localStorage = localStorage;
        }
        if (sessionStorage) {
            this.sessionStorage = sessionStorage;
        }
    }
    Storage.prototype.setItem = function (key, value, isSession) {
        var decoratedKey = this.getDecoratedKey(key);
        var saved = false;
        if (isSession) {
            saved = this.setSessionStorageItem(decoratedKey, value);
            // TODO: if not, let's save within cookies with limited time
        }
        else {
            saved = this.setLocalStorageItem(decoratedKey, value);
            if (!saved) {
                saved = this.setCookieItem(decoratedKey, value);
            }
        }
        return saved;
    };
    Storage.prototype.getItem = function (key) {
        var decoratedKey = this.getDecoratedKey(key);
        var item = this.getSessionStorageItem(decoratedKey);
        if (!item) {
            item = this.getLocalStorageItem(decoratedKey);
            if (!item) {
                item = this.getCookieItem(decoratedKey);
            }
        }
        return item;
    };
    Storage.prototype.removeItem = function (key) {
        var decoratedKey = this.getDecoratedKey(key);
        return (!!this.removeSessionStorageItem(decoratedKey) ||
            !!this.removeLocalStorageItem(decoratedKey) ||
            !!this.removeCookieItem(decoratedKey));
    };
    Storage.prototype.getDecoratedKey = function (key) {
        return "" + PREFIX + key + SUFIX;
    };
    Storage.prototype.setLocalStorageItem = function (key, value) {
        if (!this.isLocalStorageAvailable) {
            return false;
        }
        try {
            this.localStorage.setItem(key, value);
            return true;
        }
        catch (err) {
            console.warn("Storage:setItem: LocalStorage is not available");
            this.isLocalStorageAvailable = false;
            return false;
        }
    };
    Storage.prototype.getLocalStorageItem = function (key) {
        if (!this.isLocalStorageAvailable) {
            return null;
        }
        try {
            return this.localStorage.getItem(key);
        }
        catch (err) {
            console.warn("Storage:getItem: LocalStorage is not available");
            this.isLocalStorageAvailable = false;
            return null;
        }
    };
    Storage.prototype.removeLocalStorageItem = function (key) {
        if (!this.isLocalStorageAvailable) {
            return false;
        }
        try {
            if (this.localStorage.getItem(key)) {
                this.localStorage.removeItem(key);
                return true;
            }
            return false;
        }
        catch (err) {
            console.warn("Storage:removeItem: LocalStorage is not available");
            this.isLocalStorageAvailable = false;
            return false;
        }
    };
    Storage.prototype.setCookieItem = function (key, value) {
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
    };
    Storage.prototype.getCookieItem = function (key) {
        if (!this.areCookiesAvailable) {
            console.warn("Storage:getItem: Cookies are not available");
            return null;
        }
        return Cookie.get(key);
    };
    Storage.prototype.removeCookieItem = function (key) {
        if (!this.areCookiesAvailable) {
            return false;
        }
        if (Cookie.get(key)) {
            Cookie.remove(key);
            return true;
        }
        return false;
    };
    Storage.prototype.setSessionStorageItem = function (key, value) {
        if (!this.isSessionStorageAvailable) {
            return false;
        }
        try {
            this.sessionStorage.setItem(key, value);
            return true;
        }
        catch (err) {
            console.warn("Storage:setItem: SessionStorage is not available");
            this.isSessionStorageAvailable = false;
            return false;
        }
    };
    Storage.prototype.getSessionStorageItem = function (key) {
        if (!this.isSessionStorageAvailable) {
            return null;
        }
        try {
            return this.sessionStorage.getItem(key);
        }
        catch (err) {
            console.warn("Storage:getItem: SessionStorage is not available");
            this.isSessionStorageAvailable = false;
            return null;
        }
    };
    Storage.prototype.removeSessionStorageItem = function (key) {
        if (!this.isSessionStorageAvailable) {
            return false;
        }
        try {
            if (this.sessionStorage.getItem(key)) {
                this.sessionStorage.removeItem(key);
                return true;
            }
            return false;
        }
        catch (err) {
            console.warn("Storage:getItem: SessionStorage is not available");
            this.isSessionStorageAvailable = false;
            return false;
        }
    };
    return Storage;
}());
export { Storage };
export var StorageInstance = new Storage();

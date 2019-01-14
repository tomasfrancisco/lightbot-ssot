"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ActionTypeEnum;
(function (ActionTypeEnum) {
    ActionTypeEnum["CREATE"] = "CREATE";
    ActionTypeEnum["UPDATE"] = "UPDATE";
    ActionTypeEnum["DELETE"] = "DELETE";
})(ActionTypeEnum = exports.ActionTypeEnum || (exports.ActionTypeEnum = {}));
var ErrorCode;
(function (ErrorCode) {
    // INVALID_<TYPE> used when <TYPE> does not exist or is not accessible by the user
    // Auth
    ErrorCode["INVALID_AUTH"] = "INVALID_AUTH";
    // Intents
    ErrorCode["INVALID_INTENT"] = "INVALID_INTENT";
    ErrorCode["INVALID_UNKNOWN_TRIGGER"] = "INVALID_UNKNOWN_TRIGGER";
    // Agents
    ErrorCode["INVALID_AGENT"] = "INVALID_AGENT";
})(ErrorCode = exports.ErrorCode || (exports.ErrorCode = {}));

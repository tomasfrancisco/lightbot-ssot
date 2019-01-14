export enum ActionTypeEnum {
  CREATE = "CREATE",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
}

export enum ErrorCode {
  // INVALID_<TYPE> used when <TYPE> does not exist or is not accessible by the user
  // Auth
  INVALID_AUTH = "INVALID_AUTH",
  // Intents
  INVALID_INTENT = "INVALID_INTENT",
  INVALID_UNKNOWN_TRIGGER = "INVALID_UNKNOWN_TRIGGER",
  // Agents
  INVALID_AGENT = "INVALID_AGENT",
}

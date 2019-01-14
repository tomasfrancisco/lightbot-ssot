import { IntentErrorIdentifierEnum } from "./intent.enums";

export type IntentBaseError = {
  type: IntentErrorIdentifierEnum;
};

export type IntentWithDependantsError = IntentBaseError & {
  type: IntentErrorIdentifierEnum.INTENT_WITH_DEPENDENTS;
  dependents: string[];
};

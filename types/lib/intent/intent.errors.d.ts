import { IntentErrorIdentifierEnum } from "./intent.enums";
export declare type IntentBaseError = {
    type: IntentErrorIdentifierEnum;
};
export declare type IntentWithDependantsError = IntentBaseError & {
    type: IntentErrorIdentifierEnum.INTENT_WITH_DEPENDENTS;
    dependents: string[];
};

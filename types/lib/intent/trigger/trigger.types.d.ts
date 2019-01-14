import { ActionTypeEnum } from "../../enums";
import { IntentTriggerTypeEnum } from "./trigger.enums";
export declare type CreateIntentTriggerType = {
    type: IntentTriggerTypeEnum;
    value: string[];
};
export declare type UpdateIntentTriggerType = {
    id?: string;
    type?: IntentTriggerTypeEnum;
    value?: string[];
    actionType: ActionTypeEnum;
};
export declare type SearchIntentTriggerType = {
    id?: string;
    value?: string;
    type?: string | IntentTriggerTypeEnum;
};

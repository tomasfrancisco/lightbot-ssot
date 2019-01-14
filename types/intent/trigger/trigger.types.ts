import { ActionTypeEnum } from "../../enums";
import { IntentTriggerTypeEnum } from "./trigger.enums";

export type CreateIntentTriggerType = {
  type: IntentTriggerTypeEnum;
  value: string[];
};

export type UpdateIntentTriggerType = {
  id?: string;
  type?: IntentTriggerTypeEnum;
  value?: string[];
  actionType: ActionTypeEnum;
};

export type SearchIntentTriggerType = {
  id?: string;
  value?: string;
  type?: string | IntentTriggerTypeEnum;
};

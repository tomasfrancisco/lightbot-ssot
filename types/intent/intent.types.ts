import { IntentOutputType } from "./output";
import { CreateIntentTriggerType, UpdateIntentTriggerType } from "./trigger";

export type SearchIntentType = {
  id?: string;
  name?: string;
  agentId?: string;
  isTopLevel?: boolean;
  isFallback?: boolean;
};

export type CreateIntentType = {
  agentId: string;
  name: string;
  parentId?: string;
  triggers: CreateIntentTriggerType[];
  outputs: IntentOutputType[];
};

export type UpdateIntentType = {
  id: string;
  name?: string;
  isTopLevel?: boolean;
  parentId?: string | null;
  triggers?: UpdateIntentTriggerType[];
  outputs?: IntentOutputType[];
};

export type DeleteIntentType = {
  id: string;
  withChildren: boolean;
};

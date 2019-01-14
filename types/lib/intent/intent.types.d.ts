import { IntentOutputType } from "./output";
import { CreateIntentTriggerType, UpdateIntentTriggerType } from "./trigger";
export declare type SearchIntentType = {
    id?: string;
    name?: string;
    agentId?: string;
    isTopLevel?: boolean;
    isFallback?: boolean;
};
export declare type CreateIntentType = {
    agentId: string;
    name: string;
    parentId?: string;
    triggers: CreateIntentTriggerType[];
    outputs: IntentOutputType[];
};
export declare type UpdateIntentType = {
    id: string;
    name?: string;
    isTopLevel?: boolean;
    parentId?: string | null;
    triggers?: UpdateIntentTriggerType[];
    outputs?: IntentOutputType[];
};
export declare type DeleteIntentType = {
    id: string;
    withChildren: boolean;
};

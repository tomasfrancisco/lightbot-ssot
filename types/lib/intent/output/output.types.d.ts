import { IntentOutputTypeEnum } from "./output.enums";
export interface IntentOutputBaseType {
    type: IntentOutputTypeEnum;
}
export interface IntentPlainOutputType extends IntentOutputBaseType {
    value: {
        label: string;
    };
}
export interface IntentChoicesOutputType extends IntentOutputBaseType {
    value: {
        choices: string[];
    };
}
export interface IntentLinkOutputType extends IntentOutputBaseType {
    value: {
        label: string;
        link: string;
    };
}
export declare type IntentJumpOutputType = {
    label: string;
    intentId: string;
};
export interface IntentJumpsOutputType extends IntentOutputBaseType {
    value: {
        jumps: IntentJumpOutputType[];
    };
}
export interface IntentDecoratedOutputType extends IntentOutputBaseType {
    value: {
        label: string;
        objects: IntentOutputType[];
    };
}
export declare type IntentOutputType = IntentPlainOutputType | IntentChoicesOutputType | IntentLinkOutputType | IntentJumpsOutputType | IntentDecoratedOutputType;
export declare type SearchIntentOutputType = {
    id?: string;
    value?: string;
    type?: string | IntentOutputTypeEnum;
};
export declare type SwapIntentOutputType = {
    intentId: string;
    firstOutputId: string;
    secondOutputId: string;
};

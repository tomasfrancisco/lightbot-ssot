import * as Joi from "joi";
export declare const CreateIntentValidation: Joi.ObjectSchema;
export declare const UpdateIntentValidation: Joi.ObjectSchema;
export declare const DeleteIntentValidation: Joi.ObjectSchema;
export interface ValidationResult<T> {
    error?: Joi.ValidationError;
    value: T;
}
export declare function validateAndCast<T>(schema: Joi.AnySchema, data: any): ValidationResult<T>;

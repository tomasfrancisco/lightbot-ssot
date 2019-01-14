import * as Joi from "joi";

import { ActionTypeEnum } from "../enums";
import { IntentOutputTypeEnum } from "./output";
import { IntentTriggerTypeEnum } from "./trigger";

// ===========
// HELPERS
// ===========

const createEnumValidation = (enumClass: any, required: boolean) => {
  const schema = Joi.string().valid(...Object.values(enumClass));
  if (required) {
    schema.required();
    return schema;
  }
  return schema.allow(null);
};

const createUuidValidation = (required: boolean = true) => {
  const schema = Joi.string().uuid({ version: "uuidv4" });
  if (required) {
    schema.required();
    return schema;
  }
  return schema.allow(null);
};

// ===========
// VALIDATION
// ===========

const CreateTriggerValidation = Joi.object({
  type: createEnumValidation(IntentTriggerTypeEnum, true),
  value: Joi.array()
    .items(Joi.string())
    .min(1)
    .required(),
});

const OutputDataSchema: Joi.ObjectSchema = Joi.object({
  label: Joi.string(),
  choices: Joi.array()
    .items(Joi.string())
    .min(2),
  link: Joi.string(),
  jumps: Joi.array().items(
    Joi.object({
      label: Joi.string(),
      intentId: Joi.string().required(),
    }),
  ),
  objects: Joi.lazy(() => OutputDataSchema),
})
  .with("link", "label")
  .with("objects", "label")
  .xor("label", "jumps", "choices");

const OutputValidation = Joi.object({
  type: createEnumValidation(IntentOutputTypeEnum, true),
  value: OutputDataSchema.required(),
});

export const CreateIntentValidation = Joi.object({
  agentId: createUuidValidation(),
  name: Joi.string().required(),
  parentId: createUuidValidation(false),
  triggers: Joi.array().items(CreateTriggerValidation),
  outputs: Joi.array()
    .items(OutputValidation)
    .required(),
});

const UpdateTriggerValidation = Joi.object({
  id: createUuidValidation(false),
  type: createEnumValidation(IntentTriggerTypeEnum, false),
  value: Joi.array().items(Joi.string()),
  actionType: createEnumValidation(ActionTypeEnum, true),
})
  .when("actionType", {
    is: ActionTypeEnum.CREATE,
    then: Joi.object({
      type: createEnumValidation(IntentTriggerTypeEnum, true),
      value: Joi.array()
        .items(Joi.string())
        .min(1)
        .required(),
    }),
  })
  .when("actionType", {
    is: [ActionTypeEnum.UPDATE, ActionTypeEnum.DELETE],
    then: Joi.object({
      id: createUuidValidation(),
      type: createEnumValidation(IntentTriggerTypeEnum, false),
      value: Joi.array().items(Joi.string()),
    }),
  });

export const UpdateIntentValidation: Joi.ObjectSchema = Joi.object({
  id: Joi.string()
    .uuid({ version: "uuidv4" })
    .required(),
  name: Joi.string(),
  isTopLevel: Joi.boolean(),
  parentId: Joi.string()
    .uuid({ version: "uuidv4" })
    .allow(null),
  triggers: Joi.array().items(UpdateTriggerValidation),
  outputs: Joi.array().items(OutputValidation),
}).and("isTopLevel", "parentId");

export const DeleteIntentValidation: Joi.ObjectSchema = Joi.object({
  id: createUuidValidation(),
  withChildren: Joi.boolean().required(),
});

export interface ValidationResult<T> {
  error?: Joi.ValidationError;
  value: T;
}

export function validateAndCast<T>(schema: Joi.AnySchema, data: any): ValidationResult<T> {
  return schema.validate(data) as ValidationResult<T>;
}

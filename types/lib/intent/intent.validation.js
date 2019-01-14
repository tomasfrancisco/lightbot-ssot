"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Joi = require("joi");
var enums_1 = require("../enums");
var output_1 = require("./output");
var trigger_1 = require("./trigger");
// ===========
// HELPERS
// ===========
var createEnumValidation = function (enumClass, required) {
    var _a;
    var schema = (_a = Joi.string()).valid.apply(_a, Object.values(enumClass));
    if (required) {
        schema.required();
        return schema;
    }
    return schema.allow(null);
};
var createUuidValidation = function (required) {
    if (required === void 0) { required = true; }
    var schema = Joi.string().uuid({ version: "uuidv4" });
    if (required) {
        schema.required();
        return schema;
    }
    return schema.allow(null);
};
// ===========
// VALIDATION
// ===========
var CreateTriggerValidation = Joi.object({
    type: createEnumValidation(trigger_1.IntentTriggerTypeEnum, true),
    value: Joi.array()
        .items(Joi.string())
        .min(1)
        .required(),
});
var OutputDataSchema = Joi.object({
    label: Joi.string(),
    choices: Joi.array()
        .items(Joi.string())
        .min(2),
    link: Joi.string(),
    jumps: Joi.array().items(Joi.object({
        label: Joi.string(),
        intentId: Joi.string().required(),
    })),
    objects: Joi.lazy(function () { return OutputDataSchema; }),
})
    .with("link", "label")
    .with("objects", "label")
    .xor("label", "jumps", "choices");
var OutputValidation = Joi.object({
    type: createEnumValidation(output_1.IntentOutputTypeEnum, true),
    value: OutputDataSchema.required(),
});
exports.CreateIntentValidation = Joi.object({
    agentId: createUuidValidation(),
    name: Joi.string().required(),
    parentId: createUuidValidation(false),
    triggers: Joi.array().items(CreateTriggerValidation),
    outputs: Joi.array()
        .items(OutputValidation)
        .required(),
});
var UpdateTriggerValidation = Joi.object({
    id: createUuidValidation(false),
    type: createEnumValidation(trigger_1.IntentTriggerTypeEnum, false),
    value: Joi.array().items(Joi.string()),
    actionType: createEnumValidation(enums_1.ActionTypeEnum, true),
})
    .when("actionType", {
    is: enums_1.ActionTypeEnum.CREATE,
    then: Joi.object({
        type: createEnumValidation(trigger_1.IntentTriggerTypeEnum, true),
        value: Joi.array()
            .items(Joi.string())
            .min(1)
            .required(),
    }),
})
    .when("actionType", {
    is: [enums_1.ActionTypeEnum.UPDATE, enums_1.ActionTypeEnum.DELETE],
    then: Joi.object({
        id: createUuidValidation(),
        type: createEnumValidation(trigger_1.IntentTriggerTypeEnum, false),
        value: Joi.array().items(Joi.string()),
    }),
});
exports.UpdateIntentValidation = Joi.object({
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
exports.DeleteIntentValidation = Joi.object({
    id: createUuidValidation(),
    withChildren: Joi.boolean().required(),
});
function validateAndCast(schema, data) {
    return schema.validate(data);
}
exports.validateAndCast = validateAndCast;

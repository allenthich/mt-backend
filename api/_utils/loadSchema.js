"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadSchema = void 0;
const loadSchema = (schema, requiredProperties) => {
    const getSchema = () => {
        if (schema !== undefined) {
            schema.required = requiredProperties;
        }
        return schema;
    };
    return getSchema;
};
exports.loadSchema = loadSchema;
//# sourceMappingURL=loadSchema.js.map
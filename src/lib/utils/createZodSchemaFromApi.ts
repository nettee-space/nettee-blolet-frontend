import { z } from 'zod';

type ValidationRule = {
  type: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  regexp?: {
    pattern: string;
    flags?: string;
  };
  messages?: Record<string, string>;
};

export type ApiValidations = {
  validations: Record<string, ValidationRule>;
};

export function createZodSchemaFromApi(apiValidations: ApiValidations) {
  const schemaShape: Record<string, z.ZodTypeAny> = {};

  Object.entries(apiValidations.validations).forEach(([fieldName, rules]) => {
    let fieldSchema: z.ZodTypeAny;

    if (rules.type === 'string') {
      fieldSchema = z.string({
        message: rules.messages?.required,
      });

      if (rules.minLength) {
        fieldSchema = (fieldSchema as z.ZodString).min(rules.minLength, {
          message: rules.messages?.minLength,
        });
      }

      if (rules.maxLength) {
        fieldSchema = (fieldSchema as z.ZodString).max(rules.maxLength, {
          message: rules.messages?.maxLength,
        });
      }

      if (rules.regexp) {
        const regex = new RegExp(rules.regexp.pattern, rules.regexp.flags);
        fieldSchema = (fieldSchema as z.ZodString).regex(regex, {
          message: rules.messages?.regexp,
        });
      }

      if (!rules.required) {
        fieldSchema = fieldSchema.optional();
      }
    }

    schemaShape[fieldName] = fieldSchema!;
  });

  return z.object(schemaShape);
}

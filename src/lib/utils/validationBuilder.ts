import { z } from 'zod';

interface ValidationRule {
  type: 'string';
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  regexp?: {
    pattern: string;
    flags?: string;
  };
  messages?: {
    required?: string;
    minLength?: string;
    maxLength?: string;
    regexp?: string;
  };
}

type Validations = Record<string, ValidationRule>;

export function buildSchemaFromApi(validations: Validations) {
  const shape: Record<string, z.ZodTypeAny> = {};

  for (const [field, rules] of Object.entries(validations)) {
    let schema = z.string();

    // required
    if (rules.required) {
      schema = schema.min(1, rules.messages?.required);
    }

    // minLength
    if (rules.minLength) {
      schema = schema.min(rules.minLength, rules.messages?.minLength);
    }

    // maxLength
    if (rules.maxLength) {
      schema = schema.max(rules.maxLength, rules.messages?.maxLength);
    }

    // 정규식
    if (rules.regexp) {
      const regex = new RegExp(rules.regexp.pattern, rules.regexp.flags);
      schema = schema.regex(regex, rules.messages?.regexp);
    }

    shape[field] = schema;
  }

  return z.object(shape);
}

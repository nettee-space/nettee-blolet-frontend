import { z } from 'zod';
import { ZodTypeAny } from 'zod/v3';

interface ValidationRule {
  [key: string]: {
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
  };
}

export function buildSchemaFromApi(rules: ValidationRule) {
  const shape: { [key: string]: ZodTypeAny } = {};

  for (const field in rules) {
    const rule = rules[field];
    let schema: z.ZodString | z.ZodNumber;

    if (rule.type === 'string') {
      schema = z.string();
    } else if (rule.type === 'number') {
      schema = z.number();
    } else {
      continue;
    }

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

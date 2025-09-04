import { useState } from 'react';

interface ValidationRule {
  type?: 'string' | 'number';
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

interface ValidationSchema {
  [field: string]: ValidationRule;
}

interface ValidationResult {
  isValid: boolean;
  message?: string | null;
}

export function useValidation(schema: ValidationSchema) {
  const [errors, setErrors] = useState<{ [field: string]: string | null }>({});

  const validateField = (field: string, value: string): ValidationResult => {
    const rule = schema[field];
    if (!rule) return { isValid: true, message: null };

    // required
    if (rule.required && (!value || value === '')) {
      return { isValid: false, message: rule.messages?.required };
    }

    // string 길이
    if (rule.type === 'string') {
      if (rule.minLength && value.length < rule.minLength) {
        return { isValid: false, message: rule.messages?.minLength };
      }
      if (rule.maxLength && value.length > rule.maxLength) {
        return { isValid: false, message: rule.messages?.maxLength };
      }
    }

    // 정규식
    if (rule.regexp) {
      const regex = new RegExp(rule.regexp.pattern, rule.regexp.flags || '');
      if (!regex.test(value)) {
        return { isValid: false, message: rule.messages?.regexp };
      }
    }

    return { isValid: true, message: null };
  };

  const validateAll = (values: { [field: string]: string }) => {
    const newErrors: { [field: string]: string | null } = {};
    let formValid = true;

    for (const field in schema) {
      const { isValid, message } = validateField(field, values[field]);
      newErrors[field] = message ?? null;
      if (!isValid) formValid = false;
    }

    setErrors(newErrors);
    return formValid;
  };

  return {
    errors,
    validateField,
    validateAll,
    setErrors,
  };
}

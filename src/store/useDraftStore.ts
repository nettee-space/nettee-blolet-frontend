// src/store/publishStore.ts

import { create } from 'zustand';

interface DraftValues {
  blogId: string;
  path: string;
  title: string;
  entryBlockId: string;
}

interface ValidationRules {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

interface DraftStore {
  values: DraftValues;
  errors: Partial<Record<keyof DraftValues, string>>;
  validationRules: ValidationRules | null;
  setValidationRules: (rules: ValidationRules) => void;
  setField: <K extends keyof DraftValues>(field: K, value: DraftValues[K]) => void;
  validateField: <K extends keyof DraftValues>(field: K, value: DraftValues[K]) => void;
  validateAllFields: () => boolean;
  reset: () => void;
}

export const useDraftStore = create<DraftStore>((set, get) => ({
  values: {
    blogId: '',
    path: '',
    title: '',
    entryBlockId: '',
  },
  errors: {},
  validationRules: null,

  setValidationRules: (rules) => set({ validationRules: rules }),

  setField: (field, value) => {
    set((state) => ({
      values: { ...state.values, [field]: value },
    }));
    get().validateField(field, value);
  },

  validateField: (field, value) => {
    const rules = get().validationRules?.[field];
    if (!rules) return;

    let error = '';

    // 필수 항목 검사
    if (rules.required && !value) {
      error = rules.messages.required;
    }
    // 정규식 검사
    else if (rules.regexp && !new RegExp(rules.regexp.pattern, rules.regexp.flags).test(value)) {
      error = rules.messages.regexp;
    }
    // minLength, maxLength 검사
    else if (rules.minLength && value.length < rules.minLength) {
      error = rules.messages.minLength;
    } else if (rules.maxLength && value.length > rules.maxLength) {
      error = rules.messages.maxLength;
    }
    // min, max 숫자 검사
    else if (rules.min !== undefined && value < rules.min) {
      error = rules.messages.min;
    } else if (rules.max !== undefined && value > rules.max) {
      error = rules.messages.max;
    }

    set((state) => ({
      errors: {
        ...state.errors,
        [field]: error,
      },
    }));
  },

  validateAllFields: () => {
    const { values, validateField, validationRules } = get();
    if (!validationRules) return false;

    let hasErrors = false;
    Object.keys(validationRules).forEach((field) => {
      // API 응답에 존재하는 필드만 검사
      validateField(field as keyof DraftValues, values[field as keyof DraftValues]);
      if (get().errors[field as keyof DraftValues]) {
        hasErrors = true;
      }
    });
    return !hasErrors;
  },

  reset: () =>
    set({
      values: {
        blogId: '',
        path: '',
        title: '',
        entryBlockId: '',
      },
      errors: {},
    }),
}));

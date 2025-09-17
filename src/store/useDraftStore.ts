// src/store/publishStore.ts

import { ZodObject, ZodRawShape } from 'zod';
import { create } from 'zustand';

import { buildSchemaFromApi } from '@/lib/utils/validationBuilder';
import { fetchValidationRules } from '@/sevices/validationService';

interface FormData {
  blogId: string;
  path: string;
  title: string;
  entryBlockId: string;
}

type FormErrors = {
  [key in keyof FormData]?: string;
};

interface FormState {
  formData: FormData;
  errors: FormErrors;
  isLoading: boolean;
  validationSchema: ZodObject<ZodRawShape> | null;
  setFormData: (field: keyof FormData, value: string) => void;
  fetchAndSetSchema: () => Promise<void>;
  validateAndSubmit: () => boolean;
}

export const useDraftStore = create<FormState>((set, get) => ({
  formData: {
    blogId: '',
    path: '',
    title: '',
    entryBlockId: '',
  },
  errors: {},
  isLoading: false,
  validationSchema: null,
  setFormData: (field, value) => {
    set((state) => ({
      formData: { ...state.formData, [field]: value },
      errors: { ...state.errors, [field]: undefined },
    }));
  },
  fetchAndSetSchema: async () => {
    set({ isLoading: true });
    try {
      const rules = await fetchValidationRules();
      const schema = buildSchemaFromApi(rules);
      set({ validationSchema: schema, isLoading: false });
    } catch (error) {
      console.error('스키마 생성 실패', error);
      set({ isLoading: false });
    }
  },
  validateAndSubmit: () => {
    const { formData, validationSchema } = get();
    if (!validationSchema) {
      console.error('유효성 검사 스키마가 로드되지 않았습니다.');
      return false;
    }
    const result = validationSchema.safeParse(formData);

    if (!result.success) {
      const formattedErrors = result.error.flatten().fieldErrors;
      set({ errors: formattedErrors as FormErrors });
      console.error('유효성 검사 실패', formattedErrors);
      return false;
    }
    set({ errors: {} });
    console.log('유효성 검사 성공! 제출할 데이터', result.data);
    return true;
  },
}));

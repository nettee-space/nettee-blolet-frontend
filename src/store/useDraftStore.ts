// store/useFormStore.ts
import { z } from 'zod';
import { create } from 'zustand';

import { getValidationSchema } from '@/sevices/getValidationSchema';

type FormStore = {
  // 상태
  path: string;
  title: string;
  entryBlockId: string;
  blogId: string;

  // 검증 스키마 (동적으로 로드)
  validationSchema: z.ZodObject<Record<string, z.ZodTypeAny>> | null;
  // 검증 에러
  errors: Record<string, string>;
  isValidating: boolean;

  // 액션
  setPath: (path: string) => void;
  setTitle: (title: string) => void;
  setEntryBlockId: (entryBlockId: string) => void;
  setBlogId: (blogId: string) => void;

  // 검증 관련
  initializeValidation: () => Promise<void>;
  validate: () => Promise<{ success: boolean; errors?: Record<string, string> }>;
  validateField: (fieldName: string, value?: string) => Promise<string | null>;
  clearErrors: () => void;
};

export const useDraftStore = create<FormStore>((set, get) => ({
  // 초기 상태
  path: '',
  title: '',
  entryBlockId: '',
  blogId: '',
  validationSchema: null,
  errors: {},
  isValidating: false,

  // 액션
  setPath: (path) => {
    set({ path });
    // 실시간 검증 (선택사항)
    get().validateField('path', path);
  },

  setTitle: (title) => {
    set({ title });
    get().validateField('title', title);
  },

  setEntryBlockId: (entryBlockId) => {
    set({ entryBlockId });
    get().validateField('entryBlockId', entryBlockId);
  },

  setBlogId: (blogId) => {
    set({ blogId });
    get().validateField('blogId', blogId);
  },

  // 검증 스키마 초기화
  initializeValidation: async () => {
    const schema = await getValidationSchema();
    set({ validationSchema: schema });
  },

  // 전체 폼 검증
  validate: async () => {
    const { path, title, entryBlockId, blogId, validationSchema } = get();

    if (!validationSchema) {
      await get().initializeValidation();
    }

    const schema = get().validationSchema;

    if (!schema) {
      return { success: false, errors: { _form: '검증 스키마를 불러올 수 없습니다' } };
    }

    set({ isValidating: true });

    try {
      schema.parse({
        path,
        title,
        entryBlockId,
        blogId,
      });

      set({ errors: {}, isValidating: false });
      return { success: true };
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: Record<string, string> = {};
        error.issues.forEach((err) => {
          const fieldName = err.path[0] as string;
          errors[fieldName] = err.message;
        });

        set({ errors, isValidating: false });
        return { success: false, errors };
      }

      set({ isValidating: false });
      return { success: false, errors: { _form: '알 수 없는 오류가 발생했습니다' } };
    }
  },

  // 개별 필드 검증
  validateField: async (fieldName: string, value?: string) => {
    const state = get();
    const schema = state.validationSchema;

    if (!schema) {
      return null;
    }

    try {
      // value가 제공되면 사용, 아니면 현재 상태에서 가져오기
      const fieldValue = value;

      // 개별 필드만 검증
      const fieldSchema = schema.shape[fieldName];

      if (!fieldSchema) {
        console.warn(`⚠️ No schema found for field: ${fieldName}`);
        return null;
      }

      fieldSchema.parse(fieldValue);

      // 해당 필드의 에러 제거
      const newErrors = { ...state.errors };
      delete newErrors[fieldName];
      set({ errors: newErrors });

      return null;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessage = error.issues[0]?.message || '유효하지 않은 값입니다';

        set({
          errors: {
            ...state.errors,
            [fieldName]: errorMessage,
          },
        });
        return errorMessage;
      }
    }

    return null;
  },

  clearErrors: () => set({ errors: {} }),
}));

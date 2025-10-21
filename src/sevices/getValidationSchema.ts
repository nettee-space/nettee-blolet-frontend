import z from 'zod';

import { createZodSchemaFromApi } from '@/lib/utils/createZodSchemaFromApi';

export const getValidationSchema = async (): Promise<z.ZodObject<
  Record<string, z.ZodTypeAny>
> | null> => {
  try {
    const response = await fetch('http://localhost:8080/api/validations/draft?context=patch');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();

    const schema = createZodSchemaFromApi(data); // ✅ JSON → Zod 스키마 변환
    return schema;
  } catch (error) {
    console.error('Failed to fetch validation rules:', error);
    return null;
  }
};

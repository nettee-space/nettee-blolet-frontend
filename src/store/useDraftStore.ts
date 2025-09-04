// src/store/publishStore.ts
import { create } from 'zustand';

interface DraftValues {
  blogId: string;
  path: string;
  title: string;
  entryBlockId: string;
}

interface DraftStore {
  values: DraftValues;
  setField: <K extends keyof DraftValues>(field: K, value: DraftValues[K]) => void;
  reset: () => void;
}

export const useDraftStore = create<DraftStore>((set) => ({
  values: {
    blogId: '',
    path: 'https://www.naver.com',
    title: '',
    entryBlockId: '',
  },
  setField: (field, value) =>
    set((state) => ({
      values: { ...state.values, [field]: value },
    })),
  reset: () =>
    set({
      values: {
        blogId: '',
        path: 'https://kimnaebipumpitup.com/blolet',
        title: '',
        entryBlockId: '',
      },
    }),
}));

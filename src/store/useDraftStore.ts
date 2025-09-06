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
  updateTitle: (newTitle: string) => void;
  updatePath: (newPath: string) => void;
  updateBlogId: (newBlogId: string) => void;
  updateEntryBlockId: (newEntryBlockId: string) => void;
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
  updateTitle: (newTitle: string) => {
    set((state) => ({
      values: { ...state.values, title: newTitle },
    }));
  },
  updatePath: (newPath: string) => {
    set((state) => ({
      values: { ...state.values, path: newPath },
    }));
  },
  updateBlogId: (newBlogId: string) => {
    set((state) => ({
      values: { ...state.values, blogId: newBlogId },
    }));
  },
  updateEntryBlockId: (newEntryBlockId: string) => {
    set((state) => ({
      values: { ...state.values, entryBlockId: newEntryBlockId },
    }));
  },
}));

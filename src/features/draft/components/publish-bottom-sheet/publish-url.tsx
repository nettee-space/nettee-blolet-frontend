'use client';
import { useDraftStore } from '@/store/useDraftStore';

interface InputChangeEvent {
  target: {
    value: string;
    name: string;
  };
}
export default function PublishUrl() {
  const { values, errors, setField } = useDraftStore();

  const handleInputChange = (e: InputChangeEvent) => {
    setField('path', e.target.value);
  };
  return (
    <>
      <input
        type='text'
        name='path'
        value={values.path}
        onChange={handleInputChange}
        onBlur={handleInputChange}
      />
      {errors.path && <p style={{ color: 'red' }}>{errors.path}</p>}
    </>
  );
}

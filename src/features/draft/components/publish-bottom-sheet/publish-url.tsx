'use client';
import { useDraftStore } from '@/store/useDraftStore';

export default function PublishUrl() {
  const url = useDraftStore((state) => state.values.path);
  const setUrl = useDraftStore((state) => state.setField);
  return (
    <input
      required
      type='url'
      className='bg-transparent text-inherit'
      value={url}
      onChange={(e) => setUrl('path', e.target.value)}
      maxLength={2000}
      pattern='^[\p{L}\p{N}\p{M}\p{S}](?:[\p{L}\p{N}\p{M}\p{S}_-]*[\p{L}\p{N}\p{M}\p{S}])?$'
    />
  );
}

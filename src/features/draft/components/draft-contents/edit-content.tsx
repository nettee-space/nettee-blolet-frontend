'use client';

import { useState } from 'react';

import ContentsTag from './contents-tag';
import ContentsTitle from './contents-title';
import FieldWrapper from '../field-wrapper';
import ContentsBannerToggleButton from './media-upload-modal/contents-banner-toggle-button';
import SeriesSelect from '../publish-bottom-sheet/series-select';

export default function EditContent() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [tags, setTags] = useState(['프론트엔드', 'React', 'Javascript']);
  return (
    <div className='flex h-fit w-full flex-col items-center justify-center gap-15 px-25 pt-20 pb-15'>
      <ContentsTitle />
      <div className='flex w-full flex-col items-start gap-6 leading-[30px] font-normal'>
        <FieldWrapper className='gap-[50px]' label='대표 이미지 설정'>
          <ContentsBannerToggleButton />
        </FieldWrapper>
        <FieldWrapper className='gap-[50px]' label='시리즈'>
          <SeriesSelect />
        </FieldWrapper>
        <FieldWrapper className='gap-[50px]' label='Tag'>
          <ContentsTag tags={tags} />
        </FieldWrapper>
      </div>
    </div>
  );
}

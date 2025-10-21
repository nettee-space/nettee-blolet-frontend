'use client';

import { useState } from 'react';

import ContentTag from './content-tag';
import ContentTitle from './content-title';
import { BannerUploadInput } from './draft-main';
import FieldWrapper from '../field-wrapper';
import ContentBannerToggleButton from './content-banner-toggle-button';
import ContentSeriesTrigger from './content-series-trigger';

interface EditContentProps {
  handleBannerUpload: (input: BannerUploadInput) => void;
}

export default function ContentMetaForm({ handleBannerUpload }: EditContentProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [tags, setTags] = useState(['프론트엔드', 'React', 'Javascript']);

  return (
    <section className='flex h-fit w-full flex-col items-center justify-center gap-15 px-25 pt-20 pb-15'>
      <ContentTitle />
      <div className='flex w-full flex-col items-start gap-6 leading-[30px] font-normal'>
        <FieldWrapper className='gap-[50px]' label='대표 이미지 설정'>
          <ContentBannerToggleButton handleBannerUpload={handleBannerUpload} />
        </FieldWrapper>
        <FieldWrapper className='gap-[50px]' label='시리즈'>
          <ContentSeriesTrigger />
        </FieldWrapper>
        <FieldWrapper className='gap-[50px]' label='Tag'>
          <ContentTag tags={tags} />
        </FieldWrapper>
      </div>
    </section>
  );
}

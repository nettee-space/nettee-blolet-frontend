'use client';

import Image from 'next/image';

interface ContentsBannerProps {
  bannerImg?: string;
  alt?: string;
  priority?: boolean;
}

export default function ContentsBanner({
  bannerImg,
  alt = 'Main Banner',
  priority = false,
}: ContentsBannerProps) {
  if (!bannerImg) {
    return null;
  }

  return (
    <div className='relative aspect-video h-66 w-full'>
      <Image
        src={bannerImg}
        alt={alt}
        fill
        sizes='(max-width: 640px) 100vw, (max-width: 1280px) 100vw, (max-width: 1440px) 100vw, (max-width: 1920px) 100vw, 100vw'
        className='object-cover'
        priority={priority}
        quality={100}
        {...(!priority && { loading: 'lazy' })}
      />
    </div>
  );
}

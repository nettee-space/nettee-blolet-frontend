import Image from 'next/image';

interface MainBannerProps {
  bannerImg?: string;
  alt?: string;
  className?: string;
  priority?: boolean;
}

export default function MainBanner({
  bannerImg,
  alt = 'Main Banner',
  className = '',
  priority = false,
}: MainBannerProps) {
  if (!bannerImg) {
    return null;
  }

  return (
    <div className={`relative aspect-video w-full ${className}`}>
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

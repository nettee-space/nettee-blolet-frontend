import { ContentSection } from './content-section';
import { TitleSection } from './title-section';

export function DetailContent() {
  return (
    <article className='mx-auto min-h-screen max-w-320 bg-white'>
      <TitleSection />
      <ContentSection />
    </article>
  );
}

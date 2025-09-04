'use client';
import { useState } from 'react';

import PublishForm from './publish-form';

export default function PublishBottomSheet() {
  const [selectedSeries, setSelectedSeries] = useState<string>('');
  return (
    <section
      className='fixed bottom-0 left-0 z-70 w-screen bg-white'
      role='dialog'
      aria-modal='true'
    >
      <PublishForm selectedSeries={selectedSeries} onSeriesChange={setSelectedSeries} />
    </section>
  );
}

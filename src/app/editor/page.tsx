import { Toaster } from 'sonner';

import { PlateEditor } from '@/components/plate-editor';

export default function Page() {
  return (
    <div className="h-screen w-full">
      <PlateEditor />

      <Toaster />
    </div>
  );
}

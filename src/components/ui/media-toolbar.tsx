'use client';

import {
  FloatingMedia as FloatingMediaPrimitive,
  FloatingMediaStore,
  useFloatingMediaValue,
  useImagePreviewValue,
} from '@platejs/media/react';
import { cva } from 'class-variance-authority';
import { Link, Trash2Icon } from 'lucide-react';
import type { WithRequiredKey } from 'platejs';
import {
  useEditorRef,
  useEditorSelector,
  useElement,
  useFocused,
  useReadOnly,
  useRemoveNodeButton,
  useSelected,
} from 'platejs/react';

import Image from 'next/image';
import * as React from 'react';

import { Popover, PopoverAnchor, PopoverContent } from '@/components/ui/popover';

import { CaptionButton } from './caption';

const inputVariants = cva(
  'flex h-[28px] w-full rounded-[10px] border-none bg-transparent px-1.5 py-1 text-base placeholder:text-muted-foreground focus-visible:ring-transparent focus-visible:outline-none md:text-sm',
);

export function MediaToolbar({
  children,
  plugin,
}: {
  children: React.ReactNode;
  plugin: WithRequiredKey;
}) {
  const editor = useEditorRef();
  const readOnly = useReadOnly();
  const selected = useSelected();
  const isFocusedLast = useFocused();
  const selectionCollapsed = useEditorSelector((editor) => !editor.api.isExpanded(), []);
  const isImagePreviewOpen = useImagePreviewValue('isOpen', editor.id);
  const open = isFocusedLast && !readOnly && selected && selectionCollapsed && !isImagePreviewOpen;
  const isEditing = useFloatingMediaValue('isEditing');

  React.useEffect(() => {
    if (!open && isEditing) {
      FloatingMediaStore.set('isEditing', false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const element = useElement();
  const { props: buttonProps } = useRemoveNodeButton({ element });

  return (
    <Popover open={open} modal={false}>
      <PopoverAnchor>{children}</PopoverAnchor>

      <PopoverContent
        className='w-fit overflow-hidden rounded-[10px] p-0'
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        {isEditing ? (
          <div className='flex w-[330px] flex-col'>
            <div className='flex items-center'>
              <div className='text-muted-foreground flex items-center pr-1 pl-2'>
                <Link className='size-4' />
              </div>

              <FloatingMediaPrimitive.UrlInput
                className={inputVariants()}
                placeholder='Paste the embed link...'
                options={{ plugin }}
              />
            </div>
          </div>
        ) : (
          <div className='box-content flex h-fit items-center gap-5 divide-x px-5 py-3 text-[#4D4D4D]'>
            <div className='flex gap-5 pr-5'>
              <FloatingMediaPrimitive.EditButton className='hover:rounded-[5px] hover:bg-[#f2f2f2]'>
                <Image src={'/icons/link.svg'} alt='link' width={24} height={24} />
              </FloatingMediaPrimitive.EditButton>
              <CaptionButton
                className='h-6 p-0 hover:rounded-[5px] hover:bg-[#f2f2f2]'
                size='default'
                variant='link'
              >
                <Image src={'/icons/caption.svg'} alt='caption' width={24} height={24} />
              </CaptionButton>
            </div>

            <button className='hover:rounded-[5px] hover:bg-[#f2f2f2]' {...buttonProps}>
              <Image src={'/icons/trash.svg'} alt='delete' height={24} width={24} />
            </button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}

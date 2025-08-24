import { getLinkAttributes } from '@platejs/link';
import type { SlateElementProps, TLinkElement } from 'platejs';
import { SlateElement } from 'platejs';

import * as React from 'react';

export function LinkElementStatic(props: SlateElementProps<TLinkElement>) {
  return (
    <SlateElement
      {...props}
      as='a'
      className='text-primary decoration-primary font-medium underline underline-offset-4'
      attributes={{
        ...props.attributes,
        ...getLinkAttributes(props.editor, props.element),
      }}
    >
      {props.children}
    </SlateElement>
  );
}

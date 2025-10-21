'use client';

import React from 'react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { SidebarGroup, SidebarGroupContent, SidebarMenu } from '@/components/ui/sidebar';

interface DraftListWrapperProps {
  label: string;
  children: React.ReactNode;
}

export default function DraftListWrapper({ label, children }: DraftListWrapperProps) {
  return (
    <SidebarGroup className='p-0'>
      <Accordion type='single' collapsible>
        <AccordionItem value='item-1'>
          <AccordionTrigger className='text-lg font-semibold'>{label}</AccordionTrigger>
          <AccordionContent>
            <SidebarGroupContent>
              <SidebarMenu>{children}</SidebarMenu>
            </SidebarGroupContent>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </SidebarGroup>
  );
}

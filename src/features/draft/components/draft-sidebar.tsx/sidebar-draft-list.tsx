'use client';

import DraftListWrapper from './draft-list-wrapper';
import SidebarDraftItem from './sidebar-draft-item';

export default function SidebarDraftList() {
  return (
    <DraftListWrapper label='My Draft'>
      <SidebarDraftItem draftName='드래프트 01' />
      <SidebarDraftItem draftName='드래프트 02' />
      <SidebarDraftItem draftName='드래프트 03' />
    </DraftListWrapper>
  );
}

import DraftListWrapper from './draft-list-wrapper';
import SidebarDraftItem from './sidebar-draft-item';

export default function SideBarPublishedList() {
  return (
    <DraftListWrapper label='Published'>
      <SidebarDraftItem draftName='드래프트 01' />
      <SidebarDraftItem draftName='드래프트 02' />
      <SidebarDraftItem draftName='드래프트 03' />{' '}
    </DraftListWrapper>
  );
}

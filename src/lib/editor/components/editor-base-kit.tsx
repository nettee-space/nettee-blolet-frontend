import { BaseAlignKit } from './align-base-kit';
import { BaseBasicBlocksKit } from './basic-blocks-base-kit';
import { BaseBasicMarksKit } from './basic-marks-base-kit';
import { BaseCalloutKit } from './callout-base-kit';
import { BaseCodeBlockKit } from './code-block-base-kit';
import { BaseFontKit } from './font-base-kit';
import { BaseLinkKit } from './link-base-kit';
import { BaseListKit } from './list-base-kit';
import { MarkdownKit } from './markdown-kit';
import { BaseMediaKit } from './media-base-kit';
import { BaseTableKit } from './table-base-kit';
import { BaseToggleKit } from './toggle-base-kit';

export const BaseEditorKit = [
  ...BaseBasicBlocksKit,
  ...BaseCodeBlockKit,
  ...BaseTableKit,
  ...BaseToggleKit,
  ...BaseMediaKit,
  ...BaseCalloutKit,
  ...BaseLinkKit,
  ...BaseBasicMarksKit,
  ...BaseFontKit,
  ...BaseListKit,
  ...BaseAlignKit,
  ...MarkdownKit,
];

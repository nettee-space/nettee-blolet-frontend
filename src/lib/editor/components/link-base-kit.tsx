import { BaseLinkPlugin } from '@platejs/link';

import { LinkElementStatic } from '@/lib/editor/components/ui/link-node-static';

export const BaseLinkKit = [BaseLinkPlugin.withComponent(LinkElementStatic)];

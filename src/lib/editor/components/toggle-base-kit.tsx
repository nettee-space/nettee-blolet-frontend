import { BaseTogglePlugin } from '@platejs/toggle';

import { ToggleElementStatic } from '@/lib/editor/components/ui/toggle-node-static';

export const BaseToggleKit = [BaseTogglePlugin.withComponent(ToggleElementStatic)];

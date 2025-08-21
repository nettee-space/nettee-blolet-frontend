'use client';

import { TogglePlugin } from '@platejs/toggle/react';

import { IndentKit } from '@/lib/editor/components/indent-kit';
import { ToggleElement } from '@/lib/editor/components/ui/toggle-node';

export const ToggleKit = [...IndentKit, TogglePlugin.withComponent(ToggleElement)];

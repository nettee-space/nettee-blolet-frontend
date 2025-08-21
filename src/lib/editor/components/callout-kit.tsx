'use client';

import { CalloutPlugin } from '@platejs/callout/react';

import { CalloutElement } from '@/lib/editor/components/ui/callout-node';

export const CalloutKit = [CalloutPlugin.withComponent(CalloutElement)];

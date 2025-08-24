'use client';

import {
  FontBackgroundColorPlugin,
  FontColorPlugin,
  FontFamilyPlugin,
  FontSizePlugin,
} from '@platejs/basic-styles/react';
import { KEYS } from 'platejs';
import type { PlatePluginConfig } from 'platejs/react';

const options = {
  inject: {
    targetPlugins: [KEYS.p, KEYS.h1, KEYS.h2, KEYS.h3, KEYS.h4, KEYS.h5, KEYS.h6, KEYS.callout],
  },
} satisfies PlatePluginConfig;

export const FontKit = [
  FontColorPlugin.configure({
    inject: {
      ...options.inject,
      nodeProps: {
        defaultNodeValue: 'black',
      },
    },
  }),
  FontBackgroundColorPlugin.configure(options),
  FontSizePlugin.configure(options),
  FontFamilyPlugin.configure(options),
];

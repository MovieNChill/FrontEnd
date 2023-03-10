import { DefaultMantineColor, Tuple } from '@mantine/core';

type ExtendedCustomColors = 'primary' | DefaultMantineColor;

declare module '@mantine/core' {
  export interface MantineThemeColorsOverride {
    colors: Record<ExtendedCustomColors, Tuple<string, 10>>;
  }
}

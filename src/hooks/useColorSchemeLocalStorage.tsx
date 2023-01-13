import { ColorScheme } from '@mantine/core';
import { useColorScheme, useLocalStorage } from '@mantine/hooks';

type ColorSchemeWithSystem = ColorScheme | 'system';

export const useColorSchemeLocalStorage = () => {
  const [colorSchemeWithSystem, setColorSchemeWithSystem] =
    useLocalStorage<ColorSchemeWithSystem>({
      key: 'mantine-color-scheme',
      defaultValue: 'system',
      getInitialValueInEffect: true,
    });

  const preferredColorScheme = useColorScheme();

  const toggleColorScheme = (value: ColorSchemeWithSystem) =>
    setColorSchemeWithSystem(
      colorSchemeWithSystem === 'dark'
        ? 'system'
        : colorSchemeWithSystem === 'system'
        ? 'light'
        : 'dark',
    );

  const colorScheme =
    colorSchemeWithSystem === 'system'
      ? preferredColorScheme
      : colorSchemeWithSystem;

  return { colorSchemeWithSystem, colorScheme, toggleColorScheme };
};

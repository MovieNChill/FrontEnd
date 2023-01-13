import { Box, createPolymorphicComponent } from '@mantine/core';
import { useMantineTheme } from '@mantine/styles';
import { forwardRef } from 'react';
import { Icon, IconProps } from 'tabler-icons-react';
import { useColorSchemeLocalStorage } from '../hooks/useColorSchemeLocalStorage';

interface Props extends Omit<IconProps, 'display'> {
  component: Icon;
  themed?: boolean;
}

const _ThemeColoredIcon = forwardRef<Icon, Props>(
  ({ component, themed = true, ...others }: Props, ref) => {
    const { colorScheme } = useColorSchemeLocalStorage();
    const theme = useMantineTheme();
    return (
      <Box
        component={component}
        ref={ref}
        {...others}
        color={
          themed
            ? colorScheme === 'light'
              ? theme.black
              : theme.white
            : undefined
        }
      />
    );
  },
);

const ThemeColoredIcon = createPolymorphicComponent<Icon, Props>(
  _ThemeColoredIcon,
);

export default ThemeColoredIcon;

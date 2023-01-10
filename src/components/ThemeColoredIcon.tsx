import {
  Box,
  createPolymorphicComponent,
  useMantineColorScheme,
} from '@mantine/core';
import { useMantineTheme } from '@mantine/styles';
import { forwardRef } from 'react';
import { Icon, IconProps } from 'tabler-icons-react';

interface Props extends Omit<IconProps, 'display'> {
  component: Icon;
  themed?: boolean;
}

const _ThemeColoredIcon = forwardRef<Icon, Props>(
  ({ component, themed = true, ...others }: Props, ref) => {
    const { colorScheme } = useMantineColorScheme();
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

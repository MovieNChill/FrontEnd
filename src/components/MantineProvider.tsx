import { MantineProvider as MProvider } from '@mantine/core';
import { ReactNode } from 'react';
import { useColorSchemeLocalStorage } from '../hooks/useColorSchemeLocalStorage';

interface Props {
  children: ReactNode;
}

const MantineProvider = ({ children }: Props) => {
  const { colorScheme } = useColorSchemeLocalStorage();

  return (
    <MProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: colorScheme,
        colors: {
          primary: [
            '#E0F2F1',
            '#A7FFEB',
            '#64FFDA',
            '#4DB6AC',
            '#1DE9B6',
            '#009688',
            '#00897B',
            '#00796B',
            '#00695C',
            '#00BFA5',
          ],
          dark: [
            '#E8E8E8',
            '#C1C2C5',
            '#A6A7AB',
            '#5C5F66',
            '#373A40',
            '#2C2E33',
            '#25262B',
            '#1A1B1E',
            '#191919',
            '#101113',
          ],
        },
        primaryColor: 'primary',
        white: '#E8E8E8',
        black: '#191919',
        fontFamily: 'Poppins, Arial, sans-serif',
        headings: {
          fontFamily: 'Orelega One, Roboto, Arial, sans-serif',
        },
        cursorType: 'pointer',
      }}>
      {children}
    </MProvider>
  );
};

export default MantineProvider;

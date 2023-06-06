'use client';
import { NextUIProvider, createTheme } from '@nextui-org/react';
import styles from '@styles/_colors.module.scss';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import localFont from 'next/font/local';
import * as React from 'react';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import './globals.scss';

const larsseitFont = localFont({
  src: [
    {
      path: '../assets/fonts/Larsseit/Larsseit-Thin.otf',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Larsseit/Larsseit-Light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Larsseit/Larsseit.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Larsseit/Larsseit-Bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Larsseit/Larsseit-ExtraBold.otf',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Larsseit/Larsseit-BoldItalic.otf',
      weight: '700',
      style: 'italic',
    },
  ],
});

const lightTheme = createTheme({
  type: 'light',
  theme: {
    colors: {
      primaryLight: '$green200',
      primaryLightHover: styles.primaryLight,
      primaryLightActive: styles.secondaryLight,
      primaryLightContrast: '$green600',
      primary: styles.primary,
      primaryBorder: '$green500',
      primaryBorderHover: '$green600',
      primarySolidHover: '$green700',
      primarySolidContrast: '$white',
      primaryShadow: '$green500',

      gradient:
        'linear-gradient(112deg, $blue100 -25%, $pink500 -10%, $purple500 80%)',
      link: '#5E1DAD',
    },
    space: {},
    fonts: {},
  },
});

const darkTheme = createTheme({
  type: 'dark',
  theme: {
    colors: {
      primaryLight: '$green200',
      primaryLightHover: '$green300',
      primaryLightActive: '$green400',
      primaryLightContrast: '$green600',
      primary: '#b91919',
      primaryBorder: '$green500',
      primaryBorderHover: '$green600',
      primarySolidHover: '$green700',
      primarySolidContrast: '$white',
      primaryShadow: '$green500',

      gradient:
        'linear-gradient(112deg, $blue100 -25%, $pink500 -10%, $purple500 80%)',
      link: '#5E1DAD',

      myColor: '#ff4ecd',
    },
    space: {},
    fonts: {},
  },
});

type RootLayoutProps = {
  children: React.ReactNode;
};

const queryClient = new QueryClient();

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="fr">
      <body className={larsseitFont.className} style={{ minHeight: '100vh' }}>
        <QueryClientProvider client={queryClient}>
          <NextThemesProvider
            defaultTheme="light"
            attribute="class"
            value={{
              light: lightTheme.className,
              dark: darkTheme.className,
            }}
          >
            <Toaster
              position="bottom-left"
              reverseOrder={false}
              gutter={8}
              containerClassName=""
              containerStyle={{}}
              toastOptions={{
                className: '',
                duration: 5000,
              }}
            />
            <NextUIProvider theme={lightTheme}>{children}</NextUIProvider>
          </NextThemesProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </body>
    </html>
  );
}

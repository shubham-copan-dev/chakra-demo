import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  fonts: {
    body: 'Poppins, sans-serif',
  },
  colors: {
    bgClr: {
      Grey100: '#F7F8FC',
      Grey200: '#EBF1FA',
      Grey300: '#DCE3EE',
      Grey400: '#C4CCD8',
      Grey500: '#A4ABB5',
      Grey600: '#394256',
      Grey700: '#040B1B',
      Grey800: '#3478F64D',
      PrimaryActions: '#3478F6',
      Gray1: '#333333', 
      Greys1: '#F6F6F6',
      Greys5: '#ACACAC',           
      Greys6: '#898989',           
      Greys7: '#666666',           
      Greys8: '#444444',           
      Greys9: '#222222', 
      NeutralColorWhite: '#FFFFFF',
      NeutralColorBlack:'#000000'          
    },
    alertClr: {
      AlertMedium200:'#FDF4E5',
      AlertHigh200: '#FDEDEA',
      AlertHigh500: '#F29580',
      AlertHigh700: '#E05B3E',
      AlertInformation100: '#F2F7FD',
      AlertInformation600: '#3586DF',
    },
    typoClr: {
      Grey200: '#EBF1FA',
      Grey300: '#DCE3EE',
      Grey400: '#C4CCD8',
      Grey500: '#A4ABB5',
      Grey600: '#394256',
      Grey700: '#040B1B',
      PrimaryActions: '#3478F6',
      Gray1: '#333333', 
      Greys1: '#F6F6F6',
      Greys5: '#ACACAC',           
      Greys6: '#898989',           
      Greys7: '#666666',           
      Greys8: '#444444',           
      Greys9: '#222222', 
      NeutralColorWhite: '#FFFFFF',
      NeutralColorBlack:'#000000'
    },
    sucessClr: {
      Success200:'#ECF9EF',
      Success500:'#8CD9A1',
      SuccessEarth:'#40BF63',
    },
  },
  fontSizes: {
    xs: '12px',
    sm: '14px',
    md: '16px',
    lg: '20px',
    xl: '24px',
    xxl: '32px',
    '3xl': '36px',
    '4xl': '46px',
  },
  fontWeights: {
    lightThin:100,
    thin: 200,
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    strong: 900,
  },
  breakPoints: {
    base: '0px',
    sm: '480px',
    md: '768px',
    lg: '1024px',
    xl: '1300px',
  },
  sizes: {
    full: '100%',
    '1xs':'13px',
    '3xs': '14px',
    '2xs': '16px',
    xs: '20px',
    sm: '24px',
    md: '28px',
    lg: '32px',
    xl: '40px',
    '2xl': '60px',
    rem: (value:number) => `${value / 16}rem`, 
    em: (value:number) => `${value}em`,
    vh: (value:number) => `${value}vh`, 
    vw: (value:number) => `${value}vw`,
    percent: (value:number) => `${value}%`,
  },
  space: {
    0: '0px',
    0.1: '2px',
    0.3: '4px',
    0.5: '6px',
    1: '8px',
    1.5: '10px',
    2: '12px',
    2.5: '14px',
    3: '16px',
    3.5: '18px',
    4: '20px',
    5: '24px',
    6: '26px',
    7: '28px',
    8: '32px',
    9: '36px',
    10: '40px',
    11: '50px',
    12: '80px',
    rem: (value:number) => `${value / 16}rem`, 
    em: (value:number) => `${value}em`,
    vh: (value:number) => `${value}vh`, 
    vw: (value:number) => `${value}vw`,
    percent: (value:number) => `${value}%`,
  },
});
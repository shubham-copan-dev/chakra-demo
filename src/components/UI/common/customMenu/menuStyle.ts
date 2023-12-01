import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system';

// This function creates a set of function that helps us create multipart component styles.
const helpers = createMultiStyleConfigHelpers(['menu', 'items']);

const menuStyle = helpers.defineMultiStyleConfig({
  baseStyle: {
    menu: {
      boxShadow: 'lg',
      rounded: 'lg',
      flexDirection: 'column',
      py: '2',
    },
    items: {
      fontWeight: 'medium',
      lineHeight: 'normal',
      color: 'gray.600',
    },
  },
  sizes: {
    sm: {
      items: {
        fontSize: '0.75rem',
        px: 2,
        py: 1,
      },
    },
    md: {
      items: {
        fontSize: '0.875rem',
        px: 3,
        py: 2,
      },
    },
  },
  variants: {
    bold: {
      items: {
        fontWeight: 'bold',
      },
      menu: {
        boxShadow: 'xl',
      },
    },
    colorful: {
      items: {
        color: 'orange.600',
      },
      menu: {
        bg: 'orange.100',
      },
    },
  },
  defaultProps: {
    size: 'md',
  },
});

export default menuStyle;

import { Menu, MenuButton, MenuItem, MenuList, useMultiStyleConfig } from '@chakra-ui/react';

function CustomMenu({ buttonContent, menuItems, onClickMenuItem, variant }: any) {
  // Apply styles for 'menu' and 'item' based on the multi-style configuration
  const styles = useMultiStyleConfig('CustomMenu', { variant });

  return (
    <Menu>
      <MenuButton>{buttonContent}</MenuButton>
      <MenuList __css={styles.menu}>
        {menuItems.map((item: any, index: any) => (
          // eslint-disable-next-line react/no-array-index-key
          <MenuItem __css={styles.items} key={index} onClick={() => onClickMenuItem(item)}>
            {item}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}

export default CustomMenu;

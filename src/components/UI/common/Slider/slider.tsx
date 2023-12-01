import {
  Box,
  Drawer as ChakraDrawer,
  DrawerBody, //   DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
} from '@chakra-ui/react';
import React from 'react';

interface SliderProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

function Slider({ isOpen, onClose, children }: SliderProps) {
  return (
    <Box>
      <ChakraDrawer isOpen={isOpen} onClose={onClose} size="xl" placement="left">
        <DrawerOverlay />
        <DrawerContent>
          {/* <DrawerCloseButton /> */}
          <DrawerBody className="navbar_offcanvas" maxW="400px">
            {children}
          </DrawerBody>
        </DrawerContent>
      </ChakraDrawer>
    </Box>
  );
}

export default Slider;

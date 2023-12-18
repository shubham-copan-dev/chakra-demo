import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Button,
  Portal,
} from "@chakra-ui/react";

const Logout = ({ isOpen, ref }: any) => {
  return (
    <Popover isOpen={isOpen}>
      <PopoverAnchor>{ref}</PopoverAnchor>
      <Portal>
        <PopoverContent>
          <PopoverArrow />
          <PopoverHeader>Click to logout session</PopoverHeader>
          <PopoverCloseButton />
          <PopoverBody>
            <Button>Logout</Button>
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
};

export default Logout;

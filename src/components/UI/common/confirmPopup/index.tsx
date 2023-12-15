import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { customVariant } from "@/utilities/constants";

const ConfirmPopup = ({ isOpen, onClose, handleClick }: any) => {
  const { onOpen } = useDisclosure();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent minWidth="25rem">
        <ModalHeader>Are You Sure</ModalHeader>
        <ModalCloseButton />
        <ModalBody fontSize="13px">
          Are you sure you want to delete this view? This process cannot be
          undone
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={onClose}
            fontWeight="100"
            fontSize="13px"
            _hover={{}}
            bg="transparent"
            color="bgClr.PrimaryActions"
            border="1px solid #DCE3EE"
          >
            Cancel
          </Button>
          <Button
            variant="ghost"
            onClick={handleClick}
            backgroundColor="#BB3E23"
            color="white"
            fontWeight="400"
            sx={customVariant}
            fontSize="13px"
          >
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmPopup;
// backgroundColor="#BB3E23"
//                               onClick={handleTabDelete}
//                               color="white"
//                               fontWeight="400"
//                               sx={customVariant}

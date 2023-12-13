import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  useDisclosure,
  Box,
  CloseButton,
  Button,
} from "@chakra-ui/react";

function CustomAlertPopuop() {
  const {
    isOpen: isVisible,
    onClose,
    onOpen,
  } = useDisclosure({ defaultIsOpen: true });

  return isVisible ? (
    <Alert status="success" justifyContent="space-between">
      <Box>
        <AlertTitle>Note</AlertTitle>
        <AlertDescription>
          This will update the field for all the selected records
        </AlertDescription>
      </Box>
      <CloseButton
        alignSelf="flex-start"
        position="relative"
        right={-1}
        top={-1}
        onClick={onClose}
      />
    </Alert>
  ) : (
    <Button onClick={onOpen}>Show Alert</Button>
  );
}

export default CustomAlertPopuop;

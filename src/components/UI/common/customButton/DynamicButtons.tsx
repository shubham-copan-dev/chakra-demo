import { Flex, Button, Text } from "@chakra-ui/react";
import { SettingsIcon } from "@chakra-ui/icons"; // Assuming SettingsIcon is from Chakra UI icons

const DynamicButtons = ({ buttonData }: { buttonData: { text: string }[] }) => {
  return (
    <Flex gap="2px" marginBottom="3rem">
      {buttonData.map((item, index) => (
        <Button
          key={index}
          color="var(--grey-600, #394256)"
          textAlign="center"
          fontFamily="Poppins"
          fontSize="12px"
          fontStyle="normal"
          fontWeight="500"
          lineHeight="120%"
          display="flex"
          padding="5px"
          flexDirection="column"
          alignItems="flex-start"
          gap="10px"
          backgroundColor="bgClr.NeutralColorWhite"
        >
          <Flex alignItems="center" gap="5px">
            <SettingsIcon />
            <Text>{item.text}</Text>
          </Flex>
        </Button>
      ))}
    </Flex>
  );
};

export default DynamicButtons;

import { BackIcon, HomeIcon, LeadIcon } from "@/chakraConfig/icons";
import { Avatar, Flex, Text } from "@chakra-ui/react";
import React from "react";

const Sidenav = () => {
  const styles = {
    color: "bgClr.Grey400", // Set color to black
    textAlign: "center",
    fontSize: "11px",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "130%",
  };

  return (
    <Flex
      direction="column"
      bg="bgClr.Grey600"
      h="100vh"
      justifyContent="space-between"
      py={5}
      px={1}
      color="typoClr.NeutralColorWhite"
    >
      <Flex direction="column" gap="50px" alignItems="center">
        <Flex
          height="2rem"
          width="2rem"
          borderRadius="50%"
          bg="bgClr.Grey500"
          justifyContent="center"
          alignItems="center"
          cursor="pointer"
        >
          <BackIcon />
        </Flex>
        <Flex direction="column" gap="20px">
          <Flex direction="column" gap="20px">
            <Flex direction="column" gap="10px" cursor="pointer">
              <Flex
                height="2rem"
                width="2rem"
                borderRadius="50%"
                bg="bgClr.Grey500"
                justifyContent="center"
                alignItems="center"
                direction="column"
              >
                <HomeIcon />
              </Flex>
              <Text sx={styles}>Home</Text>
            </Flex>
          </Flex>
          <Flex direction="column" gap="20px">
            <Flex direction="column" gap="10px" cursor="pointer">
              <Flex
                height="2rem"
                width="2rem"
                borderRadius="50%"
                bg="bgClr.Grey500"
                justifyContent="center"
                alignItems="center"
                direction="column"
              >
                <LeadIcon />
              </Flex>
              <Text sx={styles}>Lead</Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Text>
        <Avatar size="md" name="Kent Dodds" src="https://bit.ly/kent-c-dodds" />{" "}
      </Text>
    </Flex>
  );
};

export default Sidenav;

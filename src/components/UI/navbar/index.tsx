import React from "react";
import ReuseButton from "../common/ReuseButton";
import { useForm } from "react-hook-form";
import { Box, Flex, Image, Input, Text } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

const Navbar = () => {
  const { control } = useForm();
  return (
    <Flex
      justifyContent="space-between"
      padding="5px 5px 3px 19px"
      py={4}
      backgroundColor="bgClr.Grey100"
    >
      <Flex>
        <Image src="/assets/images/logo.png" alt="Logo" boxSize="40px" />
        <Flex direction="column">
          <Text
            color="typoClr.Grey600"
            fontSize="md"
            fontStyle="normal"
            fontWeight="semibold"
            lineHeight="normal"
          >
            SalesBoost
          </Text>
          <Text
            fontSize="8.537px"
            fontWeight="fontWeights.bold"
            color="typoClr.Grey600"
            lineHeight="normal"
            textAlign="right"
          >
            by Copan Digital
          </Text>
        </Flex>
      </Flex>
      <Flex gap="15px" alignItems="center">
        <Flex
          px={15}
          py={1}
          textAlign="center"
          fontSize="sizes.1xs"
          fontStyle="normal"
          fontWeight="fontWeights.medium"
          lineHeight="120%"
        >
          <Flex
            fontSize="13px"
            color="typoClr.PrimaryActions"
            gap="5px"
            alignItems="center"
          >
            <Image src="/assets/images/icon-notes.png" alt="download"></Image>
            <Text>Notes</Text>
          </Flex>
        </Flex>
        <Box position="relative">
          <Text
            position="absolute"
            left="5px"
            top="50%"
            zIndex="9999"
            transform="translateY(-50%)"
          >
            <Image src="/assets/images/search-icon.png" alt="download"></Image>
          </Text>
          <Input
            variant="filled"
            placeholder="Search"
            pl={10}
            width="22vw"
            background="#EBF1FA"
          />
        </Box>
        <ReuseButton
          fs={13}
          px={15}
          py={1}
          h={8}
          variantType="primary"
          text="Create new"
          mx="auto"
          mt={0}
        />
      </Flex>
    </Flex>
  );
};

export default Navbar;

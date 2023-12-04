import {
  BackIcon,
  HomeIcon,
  LeadIcon,
  PipelineIcon,
  UserIcon,
} from "@/chakraConfig/icons";
import { Avatar, Flex, Text, FlexProps, Box } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

const Sidenav = () => {
  const iconStyles: FlexProps = {
    height: "2rem",
    width: "2rem",
    borderRadius: "50%",
    bg: "bgClr.Grey500",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    flexDirection: ["column", "row"], // Setting 'column' for mobile and 'row' for larger screens
  };

  const textStyle = {
    color: "bgClr.Grey400",
    textAlign: "center",
    fontSize: "11px",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "130%",
  };

  const renderMenuItem = (
    IconComponent: React.ComponentType<any>,
    label: string
  ): JSX.Element => (
    <>
      <Flex {...iconStyles}>
        <IconComponent />
      </Flex>
      <Text sx={textStyle}>{label}</Text>
    </>
  );

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
        <Flex {...iconStyles}>
          <BackIcon />
        </Flex>
        <Flex direction="column" gap="15px">
          <Link href="/dashboard">
            <Flex direction="column" alignItems="center" gap="5px">
              {renderMenuItem(HomeIcon, "Home")}
            </Flex>
          </Link>
          <Link href="/dashboard/lead">
            <Flex direction="column" alignItems="center" gap="5px">
              {renderMenuItem(LeadIcon, "Lead")}
            </Flex>
          </Link>
          <Link href="/dashboard/account">
            <Flex direction="column" alignItems="center" gap="5px">
              {renderMenuItem(UserIcon, "Account")}
            </Flex>
          </Link>
          <Link href="/dashboard/pipeline">
            <Flex direction="column" alignItems="center" gap="5px">
              {renderMenuItem(PipelineIcon, "Pipeline")}
            </Flex>
          </Link>
        </Flex>
      </Flex>
      <Text>
        <Avatar size="md" name="Kent Dodds" src="https://bit.ly/kent-c-dodds" />
      </Text>
    </Flex>
  );
};

export default Sidenav;

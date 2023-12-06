import {
  BackIcon,
  ContactIcon,
  HomeIcon,
  LeadIcon,
  PipelineIcon,
  UserIcon,
} from "@/chakraConfig/icons";
import { Avatar, Flex, Text, FlexProps, Box } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { fetchSalesforceData } from "@/redux/slices/salesForce";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { usePathname } from "next/navigation";

const Sidenav = () => {
  const dispatch = useAppDispatch();
  const path = usePathname();
  const page = path.split("/");
  const dashboard = page[2];

  const iconStyles: FlexProps = {
    height: "2rem",
    width: "2rem",
    borderRadius: "50%",
    bg: "bgClr.Grey500",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    flexDirection: ["column", "row"],
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
      <Flex {...iconStyles} backgroundColor="transparent" fontSize="23px">
        <IconComponent />
      </Flex>
      <Text sx={textStyle}>{label}</Text>
    </>
  );
  const handleClick = (dashboard: string) => {
    dispatch(
      fetchSalesforceData({
        method: "GET",
        url: `object/${dashboard}/views`,
        params: { view: "tab" },
      })
    );
    dispatch(
      fetchSalesforceData({
        method: "GET",
        url: `object/${dashboard}/views`,
        params: { view: "grid" },
      })
    );
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
          {...iconStyles}
          fontSize="25px"
          justifyContent="center"
          alignItems="center"
        >
          <BackIcon />
        </Flex>
        <Flex direction="column" gap="20px">
          <Link href="/dashboard">
            <Flex
              direction="column"
              alignItems="center"
              gap="5px"
              // onClick={handleClick}
            >
              {renderMenuItem(HomeIcon, "Home")}
            </Flex>
          </Link>
          <Link href="/dashboard/Opportunity">
            <Flex
              direction="column"
              alignItems="center"
              gap="5px"
              onClick={() => handleClick("Opportunity")}
            >
              {renderMenuItem(PipelineIcon, "Opportunity")}
            </Flex>
          </Link>
          <Link href="/dashboard/Account">
            <Flex
              direction="column"
              alignItems="center"
              gap="5px"
              onClick={() => handleClick("Account")}
            >
              {renderMenuItem(UserIcon, "Account")}
            </Flex>
          </Link>
          <Link href="/dashboard/lead">
            <Flex
              direction="column"
              alignItems="center"
              gap="5px"
              onClick={() => handleClick("lead")}
            >
              {renderMenuItem(LeadIcon, "Lead")}
            </Flex>
          </Link>
          <Link href="/dashboard/contact">
            <Flex
              direction="column"
              alignItems="center"
              gap="5px"
              onClick={() => handleClick("contact")}
            >
              {renderMenuItem(ContactIcon, "Contact")}
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

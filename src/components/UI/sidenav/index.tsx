import { BackIcon } from "@/chakraConfig/icons";
import { Avatar, Flex, Text, FlexProps, Box } from "@chakra-ui/react";
import Link from "next/link";
import React, { useEffect } from "react";
import { fetchSalesforceData, setGridId } from "@/redux/slices/salesForce";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { usePathname } from "next/navigation";
import { setRecordData } from "@/redux/slices/gridrecords";
import { setMetaData } from "@/redux/slices/gridmetadata";
import { dashboards, iconStyles, textStyle } from "@/utilities/constants";
import { setSelectedNav } from "@/redux/slices/common";

const Sidenav = () => {
  const dispatch = useAppDispatch();
  const path = usePathname();
  const page = path.split("/");
  const dashboard = page[2];
  const { selectedNav } = useAppSelector((state: any) => state.common);

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
    if (dashboard === selectedNav);
    console.log(selectedNav, "jhvhj");
    dispatch(setSelectedNav(dashboard));
    dispatch(setRecordData(null));
    dispatch(setMetaData(null));
    dispatch(setGridId(null));

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
  useEffect(() => {
    console.log(selectedNav, "nav");
  }, [selectedNav]);

  return (
    <Flex
      direction="column"
      bg="bgClr.Grey600"
      h="100vh"
      justifyContent="space-between"
      py={5}
      px={0}
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
          {dashboards.map((item: any, index: any) => (
            <Link key={index} href={item.href}>
              <Flex
                direction="column"
                alignItems="center"
                gap="5px"
                onClick={() => handleClick(item.label)}
                backgroundColor={
                  item.label === selectedNav ? "bgClr.Grey800" : ""
                }
                py={1}
              >
                {/* {console.log(item.label, "sujhbsc")} */}
                {renderMenuItem(item.icon, item.label)}
              </Flex>
            </Link>
          ))}
        </Flex>
      </Flex>
      <Text>
        <Avatar size="md" name="Kent Dodds" src="https://bit.ly/kent-c-dodds" />
      </Text>
    </Flex>
  );
};

export default Sidenav;

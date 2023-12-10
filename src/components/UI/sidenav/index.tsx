import { BackIcon, HomeIcon } from "@/chakraConfig/icons";
import { Avatar, Flex, Text, FlexProps, Box, Spinner } from "@chakra-ui/react";
import Link from "next/link";
import React, { useEffect } from "react";
import { fetchSalesforceData, setGridId } from "@/redux/slices/salesForce";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { usePathname } from "next/navigation";
import { fetchRecords, setRecordData } from "@/redux/slices/gridrecords";
import { fetchMetaData, setMetaData } from "@/redux/slices/gridmetadata";
import {
  staticDashboards,
  iconStyles,
  textStyle,
  icons,
} from "@/utilities/constants";
import { setSelectedNav } from "@/redux/slices/dashboard";
import { updateUrl } from "@/utilities/constants";

const Sidenav = () => {
  const dispatch = useAppDispatch();
  const path = usePathname();
  const page = path.split("/");
  const dashboard = page[2];
  const { dashboards, selectedNav } = useAppSelector(
    (state: any) => state.navdata
  );
  const { isSucess, defaultGridViewId, viewGridData, gridViewId, defaultGrid } =
    useAppSelector((state: any) => state.salesforce);

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

  // onclick functionality on navigation click
  const handleClick = (dashboard: string) => {
    dispatch(setSelectedNav(dashboard));
    dispatch(setRecordData(null));
    dispatch(setMetaData(null));
    dispatch(setGridId(null));

    dispatch(
      fetchSalesforceData({
        method: "GET",
        url: `object/${dashboard}/views`,
        params: { view: "grid" },
      })
    );
  };

  useEffect(() => {
    if (isSucess) {
      dispatch(
        fetchMetaData({
          method: "GET",
          url: `sf/object/metadata`,
          params: { id: defaultGridViewId, filter: true },
        })
      );
      dispatch(
        fetchRecords({
          method: "POST",
          url: `sf/object/records`,
          params: {
            id: defaultGridViewId,
            page: 1,
            perPage: defaultGrid?.query?.limit,
          },
        })
      );
      updateUrl(defaultGrid._id, { page: 1, limit: defaultGrid.query.limit });
    }
  }, [isSucess]);

  console.log(dashboards, "dash");

  return (
    <Flex
      direction="column"
      bg="bgClr.Grey600"
      h="100vh"
      justifyContent="space-between"
      py={5}
      px={0}
      color="typoClr.NeutralColorWhite"
      position="fixed"
      zIndex={999}
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
              onClick={() => handleClick("Home")}
              backgroundColor={"Home" === selectedNav ? "bgClr.Grey800" : ""}
              py={1}
            >
              {/* {console.log(item.label, "sujhbsc")} */}
              {renderMenuItem(HomeIcon, "Home")}
            </Flex>
          </Link>
          {dashboards?.length ? (
            dashboards.map((item: any, index: any) => (
              <Link key={item._id} href={`/dashboard/${item.objectType}`}>
                <Flex
                  direction="column"
                  alignItems="center"
                  gap="5px"
                  onClick={() => handleClick(item.objectType)}
                  backgroundColor={
                    item.objectType === selectedNav ? "bgClr.Grey800" : ""
                  }
                  py={1}
                >
                  {renderMenuItem(icons[index], item.objectType)}
                </Flex>
              </Link>
            ))
          ) : (
            <Flex justifyContent="center">
              <Spinner />
            </Flex>
          )}

          {staticDashboards.map((item: any, index: any) => (
            <Link key={index} href={item.href}>
              <Flex
                direction="column"
                alignItems="center"
                gap="5px"
                onClick={() => handleClick(item.action)}
                backgroundColor={
                  item.action === selectedNav ? "bgClr.Grey800" : ""
                }
                py={1}
              >
                {/* {console.log(item.label, "sujhbsc")} */}
                {renderMenuItem(item.icon, item.action)}
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

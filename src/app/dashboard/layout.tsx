"use client";

import Navbar from "@/components/UI/navbar";
import Sidenav from "@/components/UI/sidenav";
import React, { useEffect, useState, useCallback } from "react";
import { fetchSalesforceData } from "@/redux/slices/salesForce";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { Box, Flex, Button, Text } from "@chakra-ui/react";
import useGetUrlParams from "@/hooks/queryParams";
import ReuseButton from "@/components/UI/common/ReuseButton";
import { setGridId } from "@/redux/slices/salesForce";
import { btnStyle } from "@/components/UI/common/customButton/buttonStyle";
import { fetchRecords, setRecordData } from "@/redux/slices/gridrecords";
import { fetchMetaData, setMetaData } from "@/redux/slices/gridmetadata";
import GridDemo from "@/components/aggrid";
import { setSelectedGridTab } from "@/redux/slices/salesForce";
import { SettingsIcon } from "@chakra-ui/icons";
import { buttonData, updateUrl } from "@/utilities/constants";
import DynamicButtons from "@/components/UI/common/customButton/DynamicButtons";
import { RightArrowIcon, RowIcon } from "@/chakraConfig/icons";
import { fetchNavData } from "@/redux/slices/dashboard";
import { useRouter } from "next/navigation";
import useIsHome from "@/hooks/isHome";
import "../page.module.css";
import "./dashboard.css";
import AddNewTab from "@/components/Grid/AddNewTab";
import { salesforce } from "@/axios/actions/salesforce";
import { useQuery } from "react-query";
import { setShowAddPanel } from "@/redux/slices/common";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const urlParams = useGetUrlParams();
  const router = useRouter();
  const isHome = useIsHome();
  const { showAddPanel } = useAppSelector((state) => state.common);

  const { viewGridData, selectedGridTab } = useAppSelector(
    (state: any) => state.salesforce
  );
  const { metadata } = useAppSelector((state: any) => state.metadata);
  const { selectedNav } = useAppSelector((state: any) => state.navdata);
  const { isFullScreen } = useAppSelector((state: any) => state.common);
  console.log(viewGridData, "grid");

  //handling click event on Grid tab click
  const handleTabClick = (item: any) => {
    console.log(item, "any");
    if (item._id === selectedGridTab) return;
    dispatch(setSelectedGridTab(item._id));
    dispatch(setGridId(item._id));
    dispatch(setRecordData(null));

    dispatch(
      fetchMetaData({
        method: "GET",
        url: `sf/object/metadata`,
        params: { id: item._id, filter: true },
      })
    );
    dispatch(
      fetchRecords({
        method: "POST",
        url: `sf/object/records`,
        params: { id: item._id, page: 1, perPage: item.query.limit },
      })
    );
    updateUrl(item._id, { page: 1, limit: item.query.limit });
  };

  const {
    data: tabData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["nav", selectedNav],
    queryFn: () => {
      return salesforce({
        method: "GET",
        url: `object/${selectedNav}/views`,
        params: { view: "grid" },
      }).then((resp) => {
        return resp?.data?.data;
      });
    },
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    //fetch user dashboards data
    dispatch(fetchNavData({ method: "GET", url: "objects" }));
  }, [dispatch]);

  useEffect(() => {
    router.push("/dashboard");
  }, []);

  return (
    <html lang="en">
      <body>
        <Flex>
          {!isFullScreen && <Sidenav />}
          <Box w="100%" paddingLeft={isFullScreen ? "" : "4.1rem"}>
            {!isHome && !isFullScreen && <Navbar />}
            {/* grid tab buttons */}
            <Flex
              alignItems="flex-start"
              gap="10px"
              flex="1 0 0"
              flexWrap="wrap"
              px={5}
              bg="#F7F8FC"
            >
              {!isHome &&
                metadata?.length &&
                viewGridData?.length &&
                viewGridData?.map((item: any) => {
                  return (
                    <Button
                      sx={btnStyle}
                      key={item.label}
                      onClick={() => handleTabClick(item)}
                      id={item._id}
                      backgroundColor={
                        selectedGridTab === item._id
                          ? "bgClr.NeutralColorWhite"
                          : ""
                      }
                    >
                      {item.label}
                    </Button>
                  );
                })}
              {metadata?.length && selectedNav !== "Home" && (
                <Button
                  sx={btnStyle}
                  onClick={() => dispatch(setShowAddPanel(true))}
                >
                  +
                </Button>
              )}
            </Flex>
            {/* grid button navigation */}
            {selectedNav !== "Home" && metadata?.length && (
              <DynamicButtons buttonData={buttonData} />
            )}
            {selectedNav !== "Home" && metadata?.length && (
              <Flex marginBottom="1rem" gap="5px" px={5}>
                <RowIcon fontSize={12} />
                <Text
                  color="var(--grey-600, #394256)"
                  textAlign="center"
                  fontFamily="Poppins"
                  fontSize="12px"
                  fontStyle="normal"
                  fontWeight="500"
                  lineHeight="120%"
                >
                  Drag here to set row groups
                </Text>
              </Flex>
            )}
            {children}
          </Box>
        </Flex>
        {showAddPanel && (
          <AddNewTab
            show={showAddPanel}
            onHide={() => dispatch(setShowAddPanel(false))}
            refetch={() => console.log("hello")}
          />
        )}
      </body>
    </html>
  );
}

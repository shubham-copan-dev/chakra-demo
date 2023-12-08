"use client";

import Navbar from "@/components/UI/navbar";
import Sidenav from "@/components/UI/sidenav";
import React, { useEffect, useState, useCallback } from "react";
import { fetchSalesforceData } from "@/redux/slices/salesForce";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  Box,
  Flex,
  ButtonGroup,
  Container,
  Button,
  Text,
} from "@chakra-ui/react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import ReuseButton from "@/components/UI/common/ReuseButton";
import { setGridId } from "@/redux/slices/salesForce";
import { btnStyle } from "@/components/UI/common/customButton/buttonStyle";
import { fetchRecords, setRecordData } from "@/redux/slices/gridrecords";
import { fetchMetaData, setMetaData } from "@/redux/slices/gridmetadata";
import GridDemo from "@/components/aggrid";
import { setSelectedGridTab } from "@/redux/slices/salesForce";
import { SettingsIcon } from "@chakra-ui/icons";
import { buttonData } from "@/utilities/constants";
import DynamicButtons from "@/components/UI/common/customButton/DynamicButtons";
import { RightArrowIcon, RowIcon } from "@/chakraConfig/icons";

export const updateUrl = (id: string, queryParamsObject: any) => {
  const urlParams = new URLSearchParams(window.location.search);
  urlParams.set("id", id);
  Object.entries(queryParamsObject).forEach(([key, value]: any) => {
    urlParams.set(key, value);
  });
  const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
  window.history.replaceState({}, "", newUrl);
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const path = usePathname();
  const searchParams = useSearchParams()!;
  const page = path.split("/");
  const dashboard = page[2];

  const { viewGridData, selectedGridTab } = useAppSelector(
    (state: any) => state.salesforce
  );
  const { records } = useAppSelector((state: any) => state.records);
  const { metadata } = useAppSelector((state: any) => state.metadata);
  const { selectedNav } = useAppSelector((state: any) => state.common);

  //API calls on Grid tab click
  const handleTabClick = (item: any) => {
    if (item._id === selectedGridTab) return;
    dispatch(setSelectedGridTab(item._id));
    dispatch(setGridId(item._id));
    dispatch(setRecordData(null));
    dispatch(setMetaData(null));
    dispatch(
      fetchRecords({
        method: "POST",
        url: `sf/object/records`,
        params: { id: item._id, page: 1, perPage: item.query.limit },
      })
    );
    dispatch(
      fetchSalesforceData({
        method: "GET",
        url: `sf/object/metadata`,
        params: { id: item._id, object: dashboard, filter: false },
      })
    );
    dispatch(
      fetchMetaData({
        method: "GET",
        url: `sf/object/metadata`,
        params: { id: item._id, filter: true },
      })
    );
    updateUrl(item._id, { page: 1, limit: item.query.limit });
  };

  useEffect(() => {
    if (page[2] !== undefined)
      dispatch(
        fetchSalesforceData({
          method: "GET",
          url: `object/${dashboard}/views`,
          params: { view: "grid" },
        })
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dashboard, dispatch]);

  useEffect(() => {
    console.log(selectedGridTab, "tabselected");
  }, [selectedGridTab]);

  return (
    <html lang="en">
      <body>
        <Flex>
          <Sidenav />
          <Box w="100%">
            <Navbar />
            {/* grid tab buttons */}
            <Flex
              alignItems="flex-start"
              gap="5px"
              flex="1 0 0"
              flexWrap="wrap"
              px={5}
            >
              {selectedNav !== "Home" &&
                metadata?.length &&
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
                <Button sx={btnStyle}>+</Button>
              )}
            </Flex>
            {/* grid button navigation */}
            {selectedNav !== "Home" && metadata?.length && (
              <DynamicButtons buttonData={buttonData} />
            )}
            {selectedNav !== "Home" && metadata?.length && (
              <Flex marginBottom="3rem" gap="5px" px={5}>
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
      </body>
    </html>
  );
}

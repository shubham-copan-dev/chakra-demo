"use client";

import Navbar from "@/components/UI/navbar";
import Sidenav from "@/components/UI/sidenav";
import React, { useEffect, useState, useCallback } from "react";
import { fetchSalesforceData } from "@/redux/slices/salesForce";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { Box, Flex, ButtonGroup, Container, Button } from "@chakra-ui/react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import ReuseButton from "@/components/UI/common/ReuseButton";
import { setGridId } from "@/redux/slices/salesForce";
import { btnStyle } from "@/components/UI/common/customButton/buttonStyle";
import { fetchRecords } from "@/redux/slices/gridrecords";
import { fetchMetaData } from "@/redux/slices/gridmetadata";
import GridDemo from "@/components/aggrid";

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

  const { viewGridData, gridViewId } = useAppSelector(
    (state: any) => state.salesforce
  );
  const { records } = useAppSelector((state: any) => state.records);
  const { metadata } = useAppSelector((state: any) => state.metadata);

  //API calls on Grid tab click
  const handleTabClick = (item: any) => {
    // dispatch(setGridId(item._id));
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
    console.log("columns::", metadata, "rows:", records);
  }, [records, metadata]);

  return (
    <html lang="en">
      <body>
        <Flex>
          <Sidenav />
          <Box w="100%" px={5}>
            <Navbar />
            <ButtonGroup
              display="flex"
              alignItems="flex-start"
              gap="1px"
              flex="1 0 0"
            >
              {viewGridData.length &&
                viewGridData?.map((item: any, index: number) => {
                  return (
                    <Button
                      sx={btnStyle}
                      key={item.label}
                      onClick={() => handleTabClick(item)}
                    >
                      {item.label}
                    </Button>
                  );
                })}
              {viewGridData.length && <Button sx={btnStyle}>View as...</Button>}
            </ButtonGroup>
            {/* <GridDemo rowData={records} colDefs={metadata} /> */}
            {children}
          </Box>
        </Flex>
      </body>
    </html>
  );
}

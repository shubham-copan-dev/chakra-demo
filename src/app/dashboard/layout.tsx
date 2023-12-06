"use client";

import Navbar from "@/components/UI/navbar";
import Sidenav from "@/components/UI/sidenav";
import React, { useEffect, useState, useCallback } from "react";
import { fetchSalesforceData } from "@/redux/slices/salesForce";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { Box, Flex, ButtonGroup } from "@chakra-ui/react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import ReuseButton from "@/components/UI/common/ReuseButton";
import { setGridId } from "@/redux/slices/salesForce";

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

  //API calls on Grid tab click
  const handleTabClick = (item: any) => {
    dispatch(setGridId(item._id));
    dispatch(
      fetchSalesforceData({
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
      fetchSalesforceData({
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

  return (
    <html lang="en">
      <body>
        <Flex>
          <Sidenav />
          <Box w="100%">
            <Navbar />
            <h1>this is common layout..</h1>
            <ButtonGroup gap="4">
              {viewGridData.length &&
                viewGridData?.map((item: any) => {
                  return (
                    <ReuseButton
                      key={item.label}
                      variantType="primary"
                      text={item.label}
                      mx="auto"
                      mt={2}
                      handleClick={() => handleTabClick(item)}
                    />
                  );
                })}
            </ButtonGroup>
            {children}
          </Box>
        </Flex>
      </body>
    </html>
  );
}

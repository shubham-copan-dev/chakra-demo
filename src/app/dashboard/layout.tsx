"use client";

import Navbar from "@/components/UI/navbar";
import Sidenav from "@/components/UI/sidenav";
import React, { useEffect, useState, useCallback } from "react";
import { fetchSalesforceData } from "@/redux/slices/salesForce";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  useToast,
  Spinner,
  Box,
  Flex,
  ButtonGroup,
  Button,
} from "@chakra-ui/react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import ReuseButton from "@/components/UI/common/ReuseButton";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const path = usePathname();
  const searchParams = useSearchParams()!;
  const paramsObj = Object.fromEntries(searchParams.entries());
  console.log(path, "router");

  const page = path.split("/");
  const dashboard = page[2];

  const { loading, error, viewGridData, gridViewId } = useAppSelector(
    (state: any) => state.salesforce
  );
  // const toast = useToast();

  const createQueryString = (
    searchString: string,
    params: { [key: string]: string },
    idString: string
  ): string => {
    const queryParams = new URLSearchParams(searchString);

    // Clear all existing parameters if needed
    queryParams.forEach((_, key) => {
      if (!(key in params)) {
        queryParams.delete(key);
      }
    });

    // Set new parameters
    Object.entries(params).forEach(([key, value]) => {
      queryParams.set(key, value);
    });

    return `${idString}?${queryParams.toString()}`;
  };

  const renderRecords = (item: any) => {
    console.log(item);
  };

  const handleSignIn = (item: any) => {
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
        params: { id: item._id, object: dashboard, filter: true },
      })
    );

    const queryParams = createQueryString(
      searchParams.toString(), // Use existing search parameters here
      { page: "50", limit: "30" },
      item._id // Replace item._id in the URL
    );

    const url = new URL(window.location.href);
    const pathSegments = url.pathname.split("/");

    // Replace the first ID in the URL path with the new ID
    pathSegments.splice(3, 1, item._id); // Assuming the first ID is at index 3 in the path

    url.pathname = pathSegments.join("/");
    url.search = queryParams;

    // Replace the entire URL
    window.history.replaceState({}, "", url.href);
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
  }, [dashboard, dispatch]);

  useEffect(() => {
    if (gridViewId !== null && !paramsObj.page) {
      const queryParams = createQueryString(
        searchParams.toString(), // Use existing search parameters here
        { page: "10", limit: "20" },
        gridViewId // Replace gridViewId in the URL
      );

      const url = new URL(window.location.href);
      const pathSegments = url.pathname.split("/");

      // Replace the first ID in the URL path with the gridViewId
      pathSegments.splice(3, 1, gridViewId); // Assuming the first ID is at index 3 in the path

      url.pathname = pathSegments.join("/");
      url.search = queryParams;

      // Replace the entire URL
      window.history.replaceState({}, "", url.href);
    }
  }, [gridViewId, paramsObj.page, searchParams]);

  return (
    <html lang="en">
      <body>
        <Flex>
          <Sidenav />
          <Box w="100%">
            <Navbar />
            <h1>this is common layout..</h1>
            <ButtonGroup gap="4">
              {viewGridData.map((item: any) => {
                return (
                  <ReuseButton
                    variantType="primary"
                    text={item.label}
                    mx="auto"
                    mt={2}
                    handleClick={() => handleSignIn(item)}
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

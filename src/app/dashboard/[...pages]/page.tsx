"use client";
import React, { useEffect, useState, useCallback } from "react";
import { fetchSalesforceData } from "@/redux/slices/salesForce";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useToast, Spinner, Box, Flex } from "@chakra-ui/react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

const DashboardPage = ({ params }: any) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const path = usePathname();
  const searchParams = useSearchParams()!;
  console.log(path, "router");

  const page = params.pages[0];
  const dashboard = page.charAt(0).toUpperCase() + page.slice(1);
  const { loading, error, viewGridData, gridViewId } = useAppSelector(
    (state: any) => state.salesforce
  );
  const toast = useToast();

  const createQueryString = useCallback(
    (params: { [key: string]: string }) => {
      const queryParams = new URLSearchParams(searchParams);
      Object.entries(params).forEach(([key, value]) => {
        queryParams.set(key, value);
      });
      return queryParams.toString();
    },
    [searchParams]
  );

  useEffect(() => {
    dispatch(
      fetchSalesforceData({
        method: "GET",
        url: `object/${dashboard}/views`,
        params: { view: "grid" },
      })
    );
  }, [dispatch]);

  useEffect(() => {
    // /63cf14a705e7ffa4f72e5fd1?page=1&limit=20
    if (gridViewId !== null) {
      router.push(
        path +
          "/" +
          createQueryString({ sort: "asc", page: "10" }) +
          "&tab=view"
      );
    }
  }, [gridViewId]);

  return (
    <div>
      <Box textAlign="center">{params.pages[0]} Page...</Box>
      {loading && (
        <Flex h="80vh" w="100%" justifyContent="center" alignItems="center">
          <Spinner />
        </Flex>
      )}
    </div>
  );
};

export default DashboardPage;

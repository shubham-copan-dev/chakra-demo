"use client";
import React, { useEffect, useState, useCallback } from "react";
import { fetchSalesforceData } from "@/redux/slices/salesForce";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useToast, Spinner, Box, Flex } from "@chakra-ui/react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { defaultGridView } from "@/utilities/constants";
import { updateUrl } from "../layout";

const DashboardPage = ({ params }: any) => {
  const dispatch = useAppDispatch();
  const { viewGridData, gridViewId } = useAppSelector(
    (state: any) => state.salesforce
  );
  const defaultGridId = defaultGridView._id;
  const path = usePathname();
  const page = path.split("/");
  const dashboard = page[2];

  //this useEffect will make all four API's (grid,tab,records,metadata), if gridTabId is null
  useEffect(() => {
    if (gridViewId !== null) return;
    if (gridViewId === null || gridViewId === undefined) {
      //API call for getting records
      dispatch(
        fetchSalesforceData({
          method: "POST",
          url: `sf/object/records`,
          params: {
            id: defaultGridId,
            page: 1,
            perPage: defaultGridView?.query.limit,
          },
        })
      );
      //API call for getting metadata
      dispatch(
        fetchSalesforceData({
          method: "GET",
          url: `sf/object/metadata`,
          params: {
            id: defaultGridId,
            object: dashboard,
            filter: false,
          },
        })
      );
      //API call for getting metadata
      dispatch(
        fetchSalesforceData({
          method: "GET",
          url: `sf/object/metadata`,
          params: { id: defaultGridId, filter: true },
        })
      );
      updateUrl(defaultGridId, {
        page: "1",
        limit: defaultGridView.query.limit,
      });
    }
  }, [dashboard, defaultGridId, dispatch, gridViewId, viewGridData]);

  return (
    <div>
      <Box textAlign="center">{params.pages[0]} Page...</Box>

      <Flex h="80vh" w="100%" justifyContent="center" alignItems="center">
        <Spinner />
      </Flex>
    </div>
  );
};

export default DashboardPage;

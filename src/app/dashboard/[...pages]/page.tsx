"use client";
import React, { useEffect, useState, useCallback } from "react";
import { fetchSalesforceData } from "@/redux/slices/salesForce";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useToast, Spinner, Box, Flex } from "@chakra-ui/react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { updateUrl } from "../layout";
import { fetchRecords } from "@/redux/slices/gridrecords";
import { fetchMetaData } from "@/redux/slices/gridmetadata";
import GridView from "@/components/UI/grid";
import GridDemo from "@/components/gridview";

const DashboardPage = ({ params }: any) => {
  const dispatch = useAppDispatch();
  const { defaultGridViewId, viewGridData, gridViewId, defaultGrid } =
    useAppSelector((state: any) => state.salesforce);
  const { records, recordLoading } = useAppSelector(
    (state: any) => state.records
  );
  const { metadata, metaLoader } = useAppSelector(
    (state: any) => state.metadata
  );
  const { selectedNav } = useAppSelector((state: any) => state.common);
  const path = usePathname();
  const page = path.split("/");
  const dashboard = page[2];

  function filterVisibleColumns(columns: any) {
    return columns
      .filter((column: any) => column.uiMetadata && column.uiMetadata.isVisible)
      .map((column: any) => {
        const {
          uiMetadata: { name, width, isGroupable },
          ...rest
        } = column;
        return {
          field: name,
          headerName: name,
          width,
          groupable: isGroupable,
          ...rest,
        };
      });
  }

  //this useEffect will make all four API's (grid,tab,records,metadata), if gridTabId is null
  useEffect(() => {
    if (gridViewId !== null) return;
    if (gridViewId === null || gridViewId === undefined) {
      //API call for getting records
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
      //API call for getting metadata
      dispatch(
        fetchSalesforceData({
          method: "GET",
          url: `sf/object/metadata`,
          params: {
            id: defaultGridViewId,
            object: dashboard,
            filter: false,
          },
        })
      );
      //API call for getting metadata
      dispatch(
        fetchMetaData({
          method: "GET",
          url: `sf/object/metadata`,
          params: { id: defaultGridViewId, filter: true },
        })
      );
      updateUrl(defaultGridViewId, {
        page: 1,
        limit: defaultGrid[0]?.query?.limit,
      });
    }
  }, [
    dashboard,
    defaultGrid,
    defaultGridViewId,
    dispatch,
    gridViewId,
    viewGridData,
  ]);

  useEffect(() => {
    console.log("column::", metadata, "records", records);
  }, [records, metadata]);

  return (
    <div>
      <Flex
        h="80vh"
        w="100%"
        justifyContent="center"
        alignItems="center"
        px={5}
      >
        {metadata?.length && selectedNav !== "Home" && (
          <GridDemo
            columnDefs={filterVisibleColumns(metadata)}
            records={records}
          />
        )}
        {!metadata?.length && (
          <Flex height="100vh" alignItems="center">
            <Spinner />
          </Flex>
        )}
      </Flex>
    </div>
  );
};

export default DashboardPage;

"use client";
import React, { useEffect, useState, useCallback } from "react";
import { fetchSalesforceData } from "@/redux/slices/salesForce";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useToast, Spinner, Box, Flex } from "@chakra-ui/react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { updateUrl } from "@/utilities/constants";
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

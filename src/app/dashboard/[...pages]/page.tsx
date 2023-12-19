"use client";
import React, { useEffect, useState, useCallback } from "react";
import { fetchSalesforceData } from "@/redux/slices/salesForce";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useToast, Spinner, Box, Flex } from "@chakra-ui/react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import {
  capsLetter,
  fieldTypes,
  updateUrl,
  // viewByMeta,
} from "@/utilities/constants";
import { fetchRecords, updateRecord } from "@/redux/slices/gridrecords";
import { fetchMetaData } from "@/redux/slices/gridmetadata";
import GridDemo from "@/components/gridview";
import { ValueSetterParams } from "ag-grid-community";
import { ActionView } from "@/components/Grid/ViewPanel/GridView/CustomColumnView";
import useIsHome from "@/hooks/isHome";
import AddNewTab from "@/components/Grid/AddNewTab";
import { setEditedFields } from "@/redux/slices/fieldUpdate";
import GridView from "@/components/gridview";
import KanbanView from "@/components/Grid/ViewPanel/KanbanView";

const DashboardPage = () => {
  const dispatch = useAppDispatch();
  const { fieldUpdateMode, selectedViewBy } = useAppSelector(
    (state: any) => state.fieldupdate
  );
  const { records,isRecordRejected } = useAppSelector((state: any) => state.records);
  const { metadata } = useAppSelector((state: any) => state.metadata);
  // const toast = useToast();
  const isHome = useIsHome();
  const path = usePathname();
  const [isGrouped, setIsGrouped] = useState<boolean>(false);
  const { viewByMeta }: any = useAppSelector((state) => state.Viewmetadata);
  const { panelView } = useAppSelector((state) => state.fieldupdate);
console.log(isRecordRejected,'reject');


  const viewBySelected = viewByMeta?.find(
    (fil:any) => fil?.label === selectedViewBy
  );
  const viewByNames = viewBySelected?.query?.fields?.map((item:any) => item?.name);
  // const { resetSet } = useAppSelector((state: any) => state.common);

  const handleFilterType = (type: string, isFilterable: boolean) => {
    if (isFilterable) {
      switch (type) {
        case fieldTypes?.PICKLIST:
          return true;

        case fieldTypes?.CURRENCY:
        case fieldTypes?.DOUBLE:
        case fieldTypes?.INT:
          return "agNumberColumnFilter";

        case fieldTypes?.STRING:
        case fieldTypes?.TEXTAREA:
        case fieldTypes?.REFERENCE:
          return "agTextColumnFilter";

        case fieldTypes?.DATE:
        case fieldTypes?.DATETIME:
          return "agDateColumnFilter";

        default:
          return false;
      }
    }
    return false;
  };

  // handling editor cell
  const cellEditorSelector = (params: any, pickList?: string[]) => {
    // console.log(params, 'params');
    switch (params?.colDef?.type) {
      case fieldTypes?.PICKLIST:
        return {
          component: "agRichSelectCellEditor",
          params: { values: pickList },
          popup: true,
        };
      case fieldTypes?.TEXTAREA:
        console.log("textarea");
        return {
          component: "agLargeTextCellEditor",
          params: {
            maxLength: 250,
            rows: 10,
            cols: 50,
          },
          popup: true,
        };
      // case fieldTypes?.BOOLEAN:
      //   return {
      //     component: BooleanView,
      //   };
      case fieldTypes?.CURRENCY:
      case fieldTypes?.DOUBLE:
      // case fieldTypes?.INT:
      //   return {
      //     component: NumberField,
      //   };
      case fieldTypes?.DATE:
      // case fieldTypes?.DATETIME:
      //   return {
      //     component: DateTimeCell,
      //   };
      default:
        return {
          component: "agTextCellEditor",
          params: {
            maxLength: 56,
          },
        };
    }
  };

  const handlingColumnDefs = (): any | undefined => {
    if (metadata) {
      const newColumnMeta = metadata
        ?.filter?.((fil: any) =>
          selectedViewBy === "all"
            ? fil?.uiMetadata?.isVisible
            : viewByNames?.includes(fil?.name)
        )
        ?.sort((a: any, b: any) => {
          return (
            (a?.uiMetadata?.columnOrder ?? 0) -
            (b?.uiMetadata?.columnOrder ?? 0)
          );
        })
        ?.map((item: any) => {
          return {
            field: item?.name,
            headerName: capsLetter(item?.label),
            editable: item?.updateable,
            filter: handleFilterType(item?.type, item?.filterable),
            filterParams:
              item?.type === fieldTypes?.DATE ||
              item?.type === fieldTypes?.DATETIME
                ? {
                    comparator: (dateFromFilter: any, cellValue: any) => {
                      if (cellValue == null) {
                        return 0;
                      }

                      const dateParts = cellValue.split("-");
                      const year = Number(dateParts[0]);
                      const month = Number(dateParts[1]) - 1;
                      const day = Number(dateParts[2]);
                      const cellDate = new Date(year, month, day);

                      if (cellDate < dateFromFilter) return -1;
                      else if (cellDate > dateFromFilter) return 1;
                      return 0;
                    },
                  }
                : undefined,
            floatingFilter: true,
            sortable: item?.sortable,
            enableRowGroup: item?.groupable,
            maxWidth: item?.uiMetadata?.width,
            pinned: false,
            cellClass: "custom-cell",
            // cellRendererSelector: cellRendererSelector,
            cellEditorSelector: (params: any) =>
              cellEditorSelector(
                params,
                item?.picklistValues?.map((pick: any) => pick?.label)
              ),
            enableCellChangeFlash: true,
            type: item?.type,
            valueSetter: (params: ValueSetterParams) => {
              const newObj = { ...params.data, [item?.name]: params.newValue };
              dispatch(updateRecord(newObj));
              if (fieldUpdateMode === "submit") {
                dispatch(
                  setEditedFields({
                    id: params.data.Id,
                    attributes: {
                      type: params.data.attributes.type,
                    },
                    [item?.name]: params.newValue,
                  })
                );
              }
              //  else {
              //   toast.promise(onFieldEditDone(params), {
              //     loading: 'Updating',
              //     success: 'Record updated successfully',
              //     error: 'An error occur while updating the record',
              //   });
              // }
              params.data[item.name] = params.newValue;
              return true;
            },
          };
        });
      if (isGrouped) {
        return newColumnMeta;
      } else {
        return [
          {
            headerName: "Action",
            cellClass: "custom-cell",
            cellRenderer: ActionView,
            cellRendererParams: {
              allColumnData: metadata,
            },
            colId: "action",
            editable: false,
            maxWidth: 100,
            filter: false,
            type: "editForm",
            pinned: "left",
            headerCheckboxSelection: true,
            checkboxSelection: true,
          },
          ...newColumnMeta,
        ];
      }
    }
  };

  return (
    <div style={{
      position: panelView === 'kanban' ? 'relative' : 'initial',
      marginTop: panelView === 'kanban' ? '5rem' : ''
    }}>
      <Flex
        h="90vh"
        w="100%"
        justifyContent="center"
        alignItems="center"
        px={5}
      >
        {/* loader if no column data and row data */}
        {!metadata?.length && !isHome && !records?.length && (
          <Flex height="100vh" alignItems="center">
            <Spinner />
          </Flex>
        )}
        {/* show grid data after record fetched */}
        {panelView === 'grid' && metadata?.length && !isHome && records?.length && <GridView />}
        {panelView === 'kanban' && metadata?.length && !isHome && <KanbanView />}
        {/* loader if record fetching on pending state */}
        {metadata?.length && !isHome && !records?.length && !isRecordRejected && (
          <Flex height="100%" alignItems="center" justifyContent="center">
            <Spinner />
          </Flex>
        )}
        {isRecordRejected && panelView !== 'kanban' && <Box>No records found</Box>}
      </Flex>
    </div>
  );
};

export default DashboardPage;

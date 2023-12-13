import { useAppDispatch } from "@/hooks/redux";
import { setSelectedRows } from "@/redux/slices/fieldUpdate";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";
import { AgGridReact } from "ag-grid-react";
import { useCallback, useRef } from "react";

const GridDemo = ({ records, columnDefs }: any) => {
  const dispatch = useAppDispatch();
  const gridRef: any = useRef();
  const onSelectionChanged = useCallback(() => {
    const selectedRows = gridRef.current.api.getSelectedRows();
    dispatch(setSelectedRows(selectedRows));
    console.log(selectedRows, "selll");
  }, []);

  return (
    <div
      // className={`ag-theme-alpine${themeMode === 'dark' ? '-dark' : ''}`}
      className={`ag-theme-alpine`}
      style={{
        width: "100%",
        height: "100vh",
        marginTop: "7rem",
      }}
    >
      <AgGridReact
        ref={gridRef}
        rowData={records} // Row Data for Rows
        columnDefs={columnDefs} // Column Defs for Columns
        animateRows={true} // Optional - set to 'true' to have rows animate when sorted
        rowSelection="multiple" // Options - allows click selection of rows
        suppressRowClickSelection={true}
        singleClickEdit={true}
        onSelectionChanged={onSelectionChanged}
      />
    </div>
  );
};

export default GridDemo;

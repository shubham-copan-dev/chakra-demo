import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";
import { AgGridReact } from "ag-grid-react";

const GridDemo = ({ records, columnDefs }: any) => {
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
        rowData={records} // Row Data for Rows
        columnDefs={columnDefs} // Column Defs for Columns
        animateRows={true} // Optional - set to 'true' to have rows animate when sorted
        rowSelection="multiple" // Options - allows click selection of rows
        suppressRowClickSelection={true}
        singleClickEdit={true}
      />
    </div>
  );
};

export default GridDemo;

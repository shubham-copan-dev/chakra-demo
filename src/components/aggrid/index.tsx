import { AgGridReact } from "ag-grid-react"; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css";

const GridDemo = ({ rowData, colDefs }: any) => {
  return (
    <div>
      {/* The AG Grid component */}
      <AgGridReact rowData={rowData} columnDefs={colDefs} />
    </div>
  );
};

export default GridDemo;

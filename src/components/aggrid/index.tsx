import { AgGridReact } from "ag-grid-react"; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useAppSelector } from "@/hooks/redux";
import { useEffect } from "react";

const GridDemo = ({ rowData, colDefs }: any) => {
  const { resetSet } = useAppSelector((state: any) => state.common);
  useEffect(() => {
    console.log(resetSet);
  }, [resetSet]);
  return (
    <div>
      {/* The AG Grid component */}
      <AgGridReact rowData={rowData} columnDefs={colDefs} />
    </div>
  );
};

export default GridDemo;

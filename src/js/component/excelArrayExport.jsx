import React from "react";
import { ExportCsv, ExportPdf } from '@material-table/exporters';
import { CSVLink, CSVDownload } from "react-csv";

const ExcelArrayExport = (props) => {
    if(props.data!=undefined){
        return <CSVLink className="boton-exportar btn btn-outline-success btn-sm text-black text-dark" data={props.data} filename={"my-file.csv"}>📑Export to Excel</CSVLink>

    }else{
        return <></>
    }
}

export default ExcelArrayExport;
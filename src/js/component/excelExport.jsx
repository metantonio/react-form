import React from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

const Excel = (props) => {

    return (
        <div>
            {/* <table id="table-to-xls">  </table> */}

            <ReactHTMLTableToExcel
                id="boton-exportar"
                className="boton-exportar btn btn-outline-success btn-sm text-black text-dark"
                table={props.idDiv}
                filename="datos"
                sheet="hoja1"
                buttonText="📑Export to Excel"
            />
        </div>
    );

}

export default Excel;
const Swal = require('sweetalert2');

// dibujar tabla de reporte en pantalla
const dibujarTabla = (tabla) => {
    let tableHead = ""
    let tableBody = "";    
    let rowTabla = Object.keys(tabla[0].detalle[0]);
    const colwidth = tabla[0].anchoColumna != undefined? tabla[0].anchoColumna: Array[rowTabla.length].fill(60,0)
    const colAlign = tabla[0].estilo.alineacion != undefined? tabla[0].estilo.alineacion: Array[rowTabla.length].fill("center",0)
    tableHead += "<table style='width:90%; border: 2px solid white; border-collapse: collapse; font-size: 11px'> "
    tableHead += "<thead >"
    tableHead += "<tr>";
    for (let i = 0; i < rowTabla.length; i++) {
        tableHead += "<th style='width:" + colwidth[i] + "px; "
        tableHead += "text-align:" + colAlign[i] + "; "
        tableHead += "background-color: #96D4D4; "
        tableHead += "padding: 2px 5px 2px 5px;'>"
        tableHead += tabla[0].detalle[0][rowTabla[i]]
        tableHead += "</th>"
    }
    tableHead += "</tr></thead>"; //cierra encabezado de columnas
    for (let i = 1; i < tabla[0].detalle.length; i++) {
        tableBody += "<tr style='border-bottom: 1px solid #ddd'>";
        for (let j = 0; j < rowTabla.length; j++) {
            tableBody += "<td style='padding: 2px 5px 2px 5px; "
            tableBody += "text-align:" + colAlign[j] + "' >"
            tableBody += tabla[0].detalle[i][rowTabla[j]]
            tableBody += "</td>";
        }
        tableBody += "</tr>";
    }
    tableHead += tableBody + "</table>";
    return tableHead;
}

// dibujar tabla libre de reporte en pantalla
const dibujarTablaLibre = (tabla, objCaracteristicas) => {
    let rowTabla = Object.keys(tabla[0]);
    let tableHead = ""
    if (objCaracteristicas.titFormas != "") { tableHead += "<h3>" + objCaracteristicas.titFormas + "</h3>" }
    if (objCaracteristicas.titMovimiento != "") { tableHead += "<h3>" + objCaracteristicas.titMovimiento + "</h3>" }
    if (objCaracteristicas.titTablePagos != "") { tableHead += "<h5>" + objCaracteristicas.titTablePagos + "</h5>"; }
    tableHead += "<table style='width:90%; border: 1px solid white; border-collapse: collapse; font-size: 11px'>"
    tableHead += "<thead >"
    tableHead += "<tr>";
    for (let i in rowTabla) {
        tableHead += "<th style='width:" + objCaracteristicas.colWidth[i] + "px; "
        tableHead += "text-align:" + objCaracteristicas.textAlign[i] + "; "
        tableHead += "background-color: #96D4D4; "
        tableHead += "padding: 2px 5px 2px 5px;'>"
        tableHead += rowTabla[i]
        tableHead += "</th>";
    }
    tableHead += "</tr></thead>";
    let tableBody = "";
    for (let i = 0; i < tabla.length; i++) {
        tableBody += "<tr style='border-bottom: 1px solid #ddd'>";
        for (let j = 0; j < rowTabla.length; j++) {
            tableBody += "<td style='padding: 2px 5px 2px 5px; "
            tableBody += "text-align:" + objCaracteristicas.textAlign[j]
            tableBody += "' >"
            tableBody += tabla[i][rowTabla[j]]
            tableBody += "</td>";
        }
        tableBody += "</tr>";
    }
    tableHead += tableBody + "</table>";
    tableHead += "</br>";
    return tableHead;
};

// edita fecha 
const fechaEdit = (fechaparm, simbolo = "/") => {
    let fecEdit = ""
    if (fechaparm == null) { fecEdit = " " }
    else {
        if (!(simbolo) || simbolo == "") { simbolo = "/" }
        let fechaWork = new Date(fechaparm.getFullYear(), fechaparm.getMonth(), fechaparm.getDate(), fechaparm.getHours() - 4 )
        const opfecComVta = fechaWork.toJSON();
        fecEdit = opfecComVta.substring(8, 10) + simbolo + opfecComVta.substring(5, 7) + simbolo + opfecComVta.substring(0, 4)
        if (fecEdit == "01/01/1970" || fecEdit == "31/12/1969") { fecEdit = " " }
    }
    return fecEdit
}

/* ********************    consigue la fecha real    ******************* */
const fecReal = (fecha) => {
    let hasFecha = new Date(
        new Date(fecha).getFullYear(),
        new Date(fecha).getMonth(),
        new Date(fecha).getDate() + 1,
        0, 0, 0, 999
    )
    return (hasFecha)
}

/* ********************    alertas de noticaciones    ******************* */
const alertaNoficacion = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})

module.exports.dibujarTabla = dibujarTabla
module.exports.dibujarTablaLibre = dibujarTablaLibre
module.exports.fechaEdit = fechaEdit
module.exports.fecReal = fecReal
module.exports.alertaNoficacion = alertaNoficacion
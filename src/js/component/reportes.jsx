import React, { useState, useEffect, useContext } from "react";
import PropTypes, { array, object } from "prop-types";
import { Link, useParams, useHistory } from "react-router-dom";
import { Context } from "../store/appContext";
import MaterialTable from "material-table";
import { Modal, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "@material-ui/icons";
import { forwardRef } from "react";
import "../../styles/clientes.css";
import Loading from "./loading.jsx";
import { right } from "@popperjs/core";
import DocuPDF from "./pdf";
import Swal from 'sweetalert2';
import Excel from "./excelExport.jsx";
import { Graficos } from "./graficos.jsx";

const lineasPagina = process.env.LINEAS_PAGINA;
const { fechaEdit, dibujarTabla } = require("../views/rutinas.js")

const Reportes = () => { // recordar cambiar el nombre del componente aquí y al final
    const { store, actions } = useContext(Context);
    const history = useHistory("");
    const urlGet = "/tablas/allespecifico"; //url del backend
    let tituloTabla = "Reportes " + store.grupoReportes;

    const columns = [
        { title: "Grupo", field: "grupo" },
        { title: "Codigo", field: "elemento" },
        { title: "Nombre del Reporte", field: "reporte" },
        { title: "EndPoint", field: "endPoint" },
        { title: "Status", field: "status" },
    ];

    const volverLogin = () => {
        actions.logOut();
        return history.push("/");
    };

    const useStyles = makeStyles((theme) => ({
        modal: {
            position: "relative",
            display: "inline-block",
            justifyContent: "center",
            //minHeight: 600,
            height: "90%",
            minWidth: "60%",
            maxWidth: "90%",
            backgroundColor: theme.palette.background.paper,
            border: "2px solid #000",
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            overflow: "auto",
        },
        modal2: {
            position: "relative",
            display: "inline-block",
            justifyContent: "center",
            height: "auto",
            width: 800,
            backgroundColor: theme.palette.background.paper,
            border: "2px solid #000",
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            overflow: "auto",
        },
        modal3: {
            justifyContent: "center",
            minHeight: 50,
            maxHeight: 400,
            fontSize: 10,
            overflow: "scroll",
        },
        iconos: {
            cursor: "pointer",
        },
        inputMaterial: {
            width: "100%",
        },
    }));
    const styles = useStyles();

    const [modalImprimir, setModalImprimir] = useState(false);
    const [modalReporte, setModalReporte] = useState(false);
    const [recarga, setRecarga] = useState(false);
    const [variableEstado, setVariableEstado] = useState({ reporte: "", endPoint: "", Resumido: "SI" });
    const [tradersCod2, setTradersCod2] = useState([]);
    const [sociosCod2, setSociosCod2] = useState([]);
    const [redibujado, setRedibujado] = useState(false)
    const [movimientoTabla, setMovimientoTabla] = useState([]);
    const [arrayReport, setArrayReport] = useState([]);
    const [listaTablaStatus, setListaTablaStatus] = useState([{ RTElemento: "Test", RTDescripcion: "Inicializando" }]);
    const [opcDivSol, setOpcDivSol] = useState([]);
    const [opcOperacion, setOpcOperacion] = useState([{ RTElemento: "Test", RTDescripcion: "Inicializando" }])
    const [opcFormaPago, setOpcFormaPago] = useState([{ RTElemento: "Test", RTDescripcion: "Inicializando" }])
    const [variableOpcOrigen, setVariableOpcOrigen] = useState();
    const [traderCheck, setTraderCheck] = useState(false);
    const [divisaCheck, setDivisaCheck] = useState(false);
    const [statusCheck, setStatusCheck] = useState(false);
    const [operacionCheck, setOperacionCheck] = useState(false);
    const [formaPagoCheck, setFormaPagoCheck] = useState(false);
    const fecHoy = new Date();
    const fecDesde = new Date();
    const fecHasta = new Date();
    const [fechaDesde, setFechaDesde] = useState(`${fecHoy.getFullYear() + "-" +
        (("0" + (fecHoy.getMonth() + 1)).slice(-2)) + "-" +
        ("01")}`);
    const [fechaHasta, setFechaHasta] = useState(`${fecHoy.getFullYear() + "-" +
        (("0" + (fecHoy.getMonth() + 1)).slice(-2)) + "-" +
        (("0" + fecHoy.getDate()).slice(-2))}`);
    const [variableReporte, setVariableReporte] = useState({})

    const opcionesSiNo = [
        { nombre: "SI", Descripcion: "SI" },
        { nombre: "NO", Descripcion: "NO" }
    ]

    const handleChange = (e) => {
        const { name, value } = e.target;
        setVariableEstado((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const seleccionarArtista = (artista, caso) => {
        setVariableEstado(artista);
        setVariableEstado((prevState) => ({
            ...prevState,
            ["Resumido"]: "NO",
        }));
        abrirCerrarModalImprimir()
    };

    const abrirCerrarModalImprimir = () => { setModalImprimir(!modalImprimir); };
    const abrirCerrarModalReporte = () => { setModalReporte(!modalReporte); };
    let tradersCod = [];
    let obbTemp;
    let sociosCod = [];

    const paseTrader = () => {
        tradersCod = [];
        sociosCod = [];
        obbTemp = { nombre: "", descripcion: "TODOS", };
        tradersCod.push(obbTemp);
        obbTemp = {};
        for (let i = 0; i < store.opcionesIndex[9].length; i++) {
            obbTemp = {
                nombre: store.opcionesIndex[9][i].TRTrader,
                descripcion: store.opcionesIndex[9][i].TRDescripcion,
            };
            if (store.opcionesIndex[9][i].TRTipTrader == "T" || store.opcionesIndex[9][i].TRTipTrader == "T-S") {
                tradersCod.push(obbTemp);
            }
            if (store.opcionesIndex[9][i].TRTipTrader == "S" || store.opcionesIndex[9][i].TRTipTrader == "T-S") {
                sociosCod.push(obbTemp);
            }
        }
        return tradersCod;
    };

    useEffect(async () => {
        // Carga tabla de reportes
        let lista = []
        let objeto = {}
        let repTablas = await actions.getGenerico("/tablas/allespecifico2", { RTCompania: store.user.JRCompaniaAut[0], RTCodigo: "REPORTES", })
        for (let i = 0; i < repTablas[0].RTTabla.length; i++) {
            if (repTablas[0].RTTabla[i].RTStatus == "A" && repTablas[0].RTTabla[i].RTGrupo == store.grupoReportes) {
                objeto = {
                    reporte: repTablas[0].RTTabla[i].RTDescripcion,
                    endPoint: repTablas[0].RTTabla[i].RTEndPoint,
                    elemento: repTablas[0].RTTabla[i].RTElemento,
                    status: repTablas[0].RTTabla[i].RTDesStatus,
                    grupo: repTablas[0].RTTabla[i].RTGrupo,
                    checkDesde: repTablas[0].RTTabla[i].RTCheckDesde ? repTablas[0].RTTabla[i].RTCheckDesde : false,
                    checkHasta: repTablas[0].RTTabla[i].RTCheckHasta ? repTablas[0].RTTabla[i].RTCheckHasta : false,
                    checkResumen: repTablas[0].RTTabla[i].RTCheckResumen ? repTablas[0].RTTabla[i].RTCheckResumen : false,
                    checkDivisa: repTablas[0].RTTabla[i].RTCheckDivisa ? repTablas[0].RTTabla[i].RTCheckDivisa : false,
                    checkTrader: repTablas[0].RTTabla[i].RTCheckTrader ? repTablas[0].RTTabla[i].RTCheckTrader : false,
                    checkStatus: repTablas[0].RTTabla[i].RTCheckStatus ? repTablas[0].RTTabla[i].RTCheckStatus : false,
                    checkOperacion: repTablas[0].RTTabla[i].RTCheckOperacion ? repTablas[0].RTTabla[i].RTCheckOperacion : false,
                    checkFormaPago: repTablas[0].RTTabla[i].RTCheckFormaPago ? repTablas[0].RTTabla[i].RTCheckFormaPago : false,
                }
                lista.push(objeto)
            }
        }
        setArrayReport(lista)

        //opciones del dropdown
        let opcOrigen = []
        const selector = async () => {
            let oldTablas = await actions.getGenerico(urlGet, { RTCompania: store.user.JRCompaniaAut[0], RTTitulo: "Transacciones", })
            return oldTablas
        }
        const opcTablas = await (selector())
        for (let i = 0; i < opcTablas[0].RTTabla.length; i++) {
            if (i == 0) { opcOrigen.push({ nombre: "Todas", descripcion: "Todas" }) }
            else { opcOrigen.push({ nombre: opcTablas[0].RTTabla[i].RTElemento, descripcion: opcTablas[0].RTTabla[i].RTDescripcion }) }
        }
        setVariableOpcOrigen(opcOrigen)
        setRecarga(false);
        /*   }, [recarga]);
        
          useEffect(async () => {  */
        let listaOperacion = await actions.getGenerico("/tablas/allespecifico2", {
            RTCompania: store.user.JRCompaniaAut[0],
            RTCodigo: "TRANSACCION",
        });
        listaOperacion[0].RTTabla.unshift({ RTElemento: " ", RTDescripcion: "TODOS", RTStatus: "", })
        setOpcOperacion(listaOperacion[0].RTTabla)

        let listaFormaPago = await actions.getGenerico("/tablas/allespecifico2", {
            RTCompania: store.user.JRCompaniaAut[0],
            RTCodigo: "PAGOS",
        });
        listaFormaPago[0].RTTabla.unshift({ RTElemento: " ", RTDescripcion: "TODOS", RTStatus: "", })
        setOpcFormaPago(listaFormaPago[0].RTTabla)

        let listaStatus = await actions.getGenerico("/tablas/allespecifico2", {
            RTCompania: store.user.JRCompaniaAut[0],
            RTCodigo: "STATUS",
        });
        listaStatus[0].RTTabla.unshift({ RTElemento: " ", RTDescripcion: "TODOS", RTStatus: "", })
        setListaTablaStatus(listaStatus[0].RTTabla)

        actions.checkUser();
        store.opcionesIndex[9] = await actions.getGenerico("/Trader/alldata", {
            TRCompania: store.user.JRCompaniaAut[0],
        });
        paseTrader();
        setTradersCod2(tradersCod);
        setSociosCod2(sociosCod);

        let listadeDivisas;
        listadeDivisas = await actions.getGenerico("/divisas/alldata", {
            DVCompania: store.user.JRCompaniaAut[0],
        });
        listadeDivisas.unshift({
            DVCompania: store.user.JRCompaniaAut[0],
            DVTipDivisa: "TODOS",
            DVDescripcion: "",
            DVStatus: "",
        })
        setOpcDivSol(listadeDivisas);
    }, [recarga]);

    useEffect(() => { console.log(store.grupoReportes) }, [store.grupoReportes])

    // crea reporte de estado de cuenta a mostrar 
    const imprimeReporte = async () => {
        let objetoInfo = { compania: store.user.JRCompaniaAut[0] };
        /* revisa si seleccionaron Trader */
        if (traderCheck) {
            if (variableEstado.Trader == "TODOS") { setTraderCheck(false) }
            else { objetoInfo["trader"] = variableEstado.Trader }
        }
        /* revisa si seleccionaron divisa */
        if (divisaCheck) {
            if (variableEstado.Divisa == "TODOS") { setDivisaCheck(false) }
            else { objetoInfo["divisa"] = variableEstado.Divisa }
        }
        /* revisa si seleccionaron status */
        if (statusCheck) {
            if (variableEstado.Status == "TODOS") { setStatusCheck(false) }
            else { objetoInfo["status"] = variableEstado.Status }
        }
        /* revisa si seleccionaron divisa */
        if (operacionCheck) {
            if (variableEstado.Operacion == "TODOS") { setOperacionCheck(false) }
            else { objetoInfo["operacion"] = variableEstado.Operacion }
        }
        if (formaPagoCheck) {
            if (variableEstado.FormaPago == "TODOS") { setFormaPagoCheck(false) }
            else { objetoInfo["formaPago"] = variableEstado.FormaPago }
        }
        /* revisa si seleccionaron resumido */
        if (variableEstado.Resumido != undefined && variableEstado.Resumido != null) {
            objetoInfo["resumido"] = variableEstado.Resumido
        } else { objetoInfo["resumido"] = "SI" }
        /* revisa si seleccionaron fechas */
        objetoInfo["fechaDesde"] = fechaDesde;
        objetoInfo["fechaHasta"] = fechaHasta;
        let tabla = await actions.getGenerico(variableEstado.endPoint, objetoInfo)
        setMovimientoTabla(tabla)

        if (tabla.length > 0) {
            return (`<>
                ${await dibujarTabla(tabla)}
                <br />
                ${objetoInfo["resumido"] == "SI" ?
                    JSON.stringify(<Graficos
                        tipo="pie"
                        titulo="Relación"
                        subtitulo="Leyenda"
                        etiquetas={Object.keys(tabla[0].detalle[0])}
                        dataY={()=>{return tabla[0].detalle.filter((item,index)=>{return index!=0}).detalle} } //arreglar esto de alguna manera para mostrar gráfico en el reporte
                        
                        recarga={recarga}
                        setRecarga={setRecarga}
                        mouseInfo="Monto ($)"
                    />)
                    : <></>}
            </>`);
        }
        else { return Swal({ text: "Aviso: No existen movimiento a mostrar", icon: "warning" }); }
    };

    const bodyReporte = (
        <div className={styles.modal2}>
            <h3>{variableEstado.reporte}</h3>
            <br />
            <div align="right">
                <button className="btn btn-outline-success btn-sm" onClick={() => abrirCerrarModalReporte()}>Cerrar</button>
            </div>

            {/* Fila */}
            <div className="row justify-content d-flex py-1" >
                <div className="col-sm-4">
                    <div className="row d-flex flex-row">
                        <div className="col-12 flex-colunm">
                            <h5>Titulo</h5>
                            <div className="row d-flex">
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Reporte */}
            <div id="tabla-representada"> </div>
        </div>
    )

    const dropStatus = (campo) => {
        return (
            <span className="d-flex flex-nowrap dropwdowncustom my-0 mx-0">
                {/* <div className="dropdown justify-content-center align-items-center"> */}
                <h5>Status</h5>
                <button
                    type="button"
                    className="btn btn-primary dropdown-toggle btn-sm h-76"
                    data-bs-toggle="dropdown"
                >
                    {variableEstado[`${campo}`] ? variableEstado[`${campo}`] : "TODOS"}
                </button>
                <ul className="dropdown-menu" style={{ height: "180px", overflow: "auto" }}>
                    {listaTablaStatus.map((opcion, index) => {
                        return (
                            <li
                                className="dropdown-item"
                                key={index}
                                onClick={(e) => {
                                    setVariableEstado((prevState) => ({
                                        ...prevState,
                                        Status: opcion.RTElemento,
                                        RTDesStatus: opcion.RTDescripcion,
                                    }));
                                    setStatusCheck(true);
                                }}
                            >
                                {opcion.RTElemento + ": " + opcion.RTDescripcion}
                            </li>
                        );
                    })}
                </ul>
                {/* </div> */}
            </span>
        )
    }

    const dropTraders = (
        <span className="d-flex flex-nowrap dropwdowncustom my-0 mx-0">
            {/*  <div className="dropdown justify-content-center align-items-center"> */}
            <h5>Trader</h5>
            <button
                type="button"
                className="btn btn-primary dropdown-toggle btn-sm h-76"
                data-bs-toggle="dropdown"
            >
                {variableEstado.Trader ? variableEstado.Trader : "TODOS"}
            </button>
            <ul className="dropdown-menu">
                {tradersCod2.map((opcion, index) => {
                    return (
                        <li
                            className="dropdown-item"
                            key={index}
                            onClick={(e) => {
                                setVariableEstado((prevState) => ({
                                    ...prevState,
                                    ["Trader"]: opcion.nombre,
                                }));
                                setTraderCheck(true);
                            }}
                        >
                            {opcion.nombre + ": " + opcion.descripcion}
                        </li>
                    );
                })}
            </ul>
            {/* </div> */}
        </span>
    )

    const dropSiNo = (campo) => {
        return (
            <span className="d-flex flex-nowrap dropwdowncustom my-0 mx-0">
                {/* <div className="dropdown justify-content-center align-items-center"> */}
                <h5>Resumido</h5>
                <button
                    type="button"
                    className="btn btn-primary dropdown-toggle btn-sm h-76"
                    data-bs-toggle="dropdown"
                >
                    {variableEstado[`${campo}`] ? variableEstado[`${campo}`] : "NO"}
                </button>
                <ul className="dropdown-menu">
                    {opcionesSiNo.map((opcion, index) => {
                        return (
                            <li
                                className="dropdown-item"
                                key={index}
                                onClick={(e) => {
                                    setVariableEstado((prevState) => ({
                                        ...prevState,
                                        [`${campo}`]: opcion.nombre,
                                    }));
                                    setResumenCheck(true);
                                }}
                            >
                                {opcion.nombre}
                            </li>
                        );
                    })}
                </ul>
                {/* </div> */}
            </span>
        )
    }

    const dropOperacion = (campo) => {
        return (
            <span className="d-flex flex-nowrap dropwdowncustom my-0 mx-0">
                {/* <div className="dropdown justify-content-center align-items-center"> */}
                <h5>Operación</h5>
                <button
                    type="button"
                    className="btn btn-primary dropdown-toggle btn-sm h-76"
                    data-bs-toggle="dropdown"
                >
                    {variableEstado[`${campo}`] ? variableEstado[`${campo}`] : "TODOS"}
                </button>
                <ul className="dropdown-menu">
                    {opcOperacion.map((opcion, index) => {
                        return (
                            <li
                                className="dropdown-item"
                                key={index}
                                onClick={(e) => {
                                    setVariableEstado((prevState) => ({
                                        ...prevState,
                                        [`${campo}`]: opcion.RTDescripcion,
                                    }));
                                    setOperacionCheck(true);
                                }}
                            >
                                {opcion.RTDescripcion}
                            </li>
                        );
                    })}
                </ul>
                {/* </div> */}
            </span>
        )
    }

    const dropDivisa = (campo) => {
        return (
            <span className="d-flex flex-nowrap dropwdowncustom my-0 mx-0">
                {/* <div className="dropdown justify-content-center align-items-center"> */}
                <h5>Divisa</h5>
                <button
                    type="button"
                    className="btn btn-primary dropdown-toggle btn-sm h-76"
                    data-bs-toggle="dropdown"
                >
                    {variableEstado[`${campo}`] ? variableEstado[`${campo}`] : "TODOS"}
                </button>
                <ul className="dropdown-menu">
                    {opcDivSol.map((opcion, index) => {
                        return (
                            <li
                                className="dropdown-item"
                                key={index}
                                onClick={(e) => {
                                    setVariableEstado((prevState) => ({
                                        ...prevState,
                                        [`${campo}`]: opcion.DVTipDivisa,
                                    }));
                                    setDivisaCheck(true);
                                }}
                            >
                                {opcion.DVTipDivisa}
                            </li>
                        );
                    })}
                </ul>
                {/* </div> */}
            </span>
        )
    }

    const dropFormaPago = (campo) => {
        return (
            <span className="d-flex flex-nowrap dropwdowncustom my-0 mx-0">
                {/* <div className="dropdown justify-content-center align-items-center"> */}
                <h5>Forma Pago</h5>
                <button
                    type="button"
                    className="btn btn-primary dropdown-toggle btn-sm h-76"
                    data-bs-toggle="dropdown"
                >
                    {variableEstado[`${campo}`] ? variableEstado[`${campo}`] : "TODOS"}
                </button>
                <ul className="dropdown-menu">
                    {opcFormaPago.map((opcion, index) => {
                        return (
                            <li
                                className="dropdown-item"
                                key={index}
                                onClick={(e) => {
                                    setVariableEstado((prevState) => ({
                                        ...prevState,
                                        [`${campo}`]: opcion.RTDescripcion,
                                    }));
                                    setFormaPagoCheck(true);
                                }}
                            >
                                {opcion.RTDescripcion}
                            </li>
                        );
                    })}
                </ul>
                {/* </div> */}
            </span>
        )
    }

    const bodyImprimir = (
        <div className={styles.modal}>
            <br />
            <div className="row justify-content d-flex py-1">
                <div className="col-sm-6"> <h3>{variableEstado.reporte}</h3> </div>
                <div align="right" className="col-sm-6"> Fecha: {fechaEdit(new Date())} </div>
            </div>
            <br />

            {/* Fila */}
            <div className="row justify-content d-flex py-1">
                {/* sub-columna   */}
                {variableEstado.checkDesde ?
                    <>
                        <div className="col-3 flex-colunm">
                            <div className="row d-flex flex-row">
                                <div className="col-12 flex-colunm">
                                    <h5>Desde Fecha</h5>
                                    <div className="row d-flex">
                                        <div className="col-11 colum3">
                                            <input
                                                className="registro-input"
                                                type="date"
                                                required="required"
                                                id="fecDesde"
                                                defaultValue={`${fecHoy.getFullYear() + "-" + (("0" + (fecHoy.getMonth() + 1)).slice(-2)) + "-" + ("01")}`}
                                                onChange={async (e) => {
                                                    //let desde = new Date(e.target.value)
                                                    //setFechaDesde(`${desde.getFullYear() + "-" + (("0" + (desde.getMonth() + 1)).slice(-2)) + "-" + (("0" + (desde.getDate())).slice(-2))}`); 
                                                    setFechaDesde(e.target.value)
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </> : <><div className="col-3 flex-colunm"></div></>
                }
                {/* sub-columna   */}
                {variableEstado.checkHasta ?
                    <>
                        <div className="col-3">
                            <div className="row d-flex flex-row">
                                <div className="col-11 flex-colunm">
                                    <h5>Hasta Fecha</h5>
                                    <div className="row d-flex">
                                        <div className="col-11 colum3">
                                            <input
                                                className="registro-input"
                                                type="date"
                                                required="required"
                                                id="fecHasta"
                                                defaultValue={`${fecHoy.getFullYear() + "-" + (("0" + (fecHoy.getMonth() + 1)).slice(-2)) + "-" + (("0" + fecHoy.getDate()).slice(-2))}`}
                                                onChange={(e) => {
                                                    //let hasta = new Date(e.target.value)
                                                    //setFechaHasta(`${hasta.getFullYear() + "-" + (("0" + (hasta.getMonth() + 1)).slice(-2)) + "-" + (("0" + (hasta.getDate() + 1)).slice(-2))}`); 
                                                    setFechaHasta(e.target.value)
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </> : <><div className="col-3 flex-colunm"></div></>
                }
                <div className="col-6 flex-colunm" align="right" id="1">
                    <button
                        className="btn  btn-sm btn-sm mx-1"
                        style={{ backgroundColor: "ButtonShadow" }}
                        color="primary"
                        onClick={async () => {
                            let divTabla = document.querySelector("#tabla-representada")
                            divTabla.innerHTML = await imprimeReporte()
                            divTabla.firstChild.setAttribute("id", "tabla-representada-hijo")

                        }}
                    > <i className="fa fa-newspaper-o " aria-hidden="true"> </i> Reporte
                    </button>
                    {movimientoTabla[0] ?
                        <div className="d-flex flex-row"> <DocuPDF
                            style={{ backgroundColor: "ButtonShadow" }}
                            titulo={movimientoTabla[0].titulo}
                            subtitulo={movimientoTabla[0].subtitulo}
                            tabla={movimientoTabla[0].detalle}
                            estiloTabla={movimientoTabla[0]} />
                            <Excel idDiv={"tabla-representada-hijo"} />
                        </div> : <></>}
                    <button
                        className="btn  btn-sm btn-sm mx-1"
                        style={{ backgroundColor: "ButtonShadow" }}
                        onClick={() => abrirCerrarModalImprimir()}><i className="fa fa-sign-out " aria-hidden="true"> </i> Cerrar</button>
                </div>
            </div>

            {/* Fila */}
            <div className="row justify-content d-flex py-1">
                {/* Seleccion Operacion */}
                {variableEstado.checkOperacion ?
                    <>
                        <div className="col-sm-3">
                            {dropOperacion("Operacion")}
                        </div>
                    </> :
                    <></>
                }
                {/* Seleccion Trader */}
                {variableEstado.checkTrader ?
                    <>
                        <div className="col-sm-3">
                            {dropTraders}
                        </div>
                    </> :
                    <></>
                }
                {/* Seleccion Forma de pago */}
                {variableEstado.checkFormaPago ?
                    <>
                        <div className="col-sm-3">
                            {dropFormaPago("FormaPago")}
                        </div>
                    </> :
                    <></>
                }
                {/* Seleccion Divisa */}
                {variableEstado.checkDivisa ?
                    <>
                        <div className="col-sm-3">
                            {dropDivisa("Divisa")}
                        </div>
                    </> :
                    <></>
                }
                {/* Seleccion Status */}
                {variableEstado.checkStatus ?
                    <>
                        <div className="col-sm-3">
                            {dropStatus("RTDesStatus")}
                        </div>
                    </> :
                    <></>
                }
                {/* Seleccion Resumen */}
                {variableEstado.checkResumen ?
                    <>
                        <div className="col-sm-3">
                            {dropSiNo("Resumido")}
                        </div>
                    </> :
                    <></>
                }
            </div>

            {/* Fila */}
            <div className="row justify-content d-flex py-1">
            </div>
            <div className="row justify-content d-flex py-1">
            </div>
            <br />

            <div className={styles.modal3} id="tabla-representada">

            </div>
            <br />
            {/*       <div align="right" id="1">
        <button
          className="btn btn-outline-success  btn-sm mx-2"
          color="primary"
          onClick={async () => { document.querySelector("#tabla-representada").innerHTML = await imprimeReporte() }}
        >
          Reporte
        </button>
        <button className="btn btn-outline-success  btn-sm" onClick={() => abrirCerrarModalImprimir()}>Cancelar</button>
      </div> */}
        </div>
    );

    /**********************************     Lista de reportes     ******************************************* */
    return (
        <div className={store.expandwin ? "contenedor-expandido" : "contenedor-tabla"}>
            {store.logOutConfirmation ? (
                <>
                    <Loading componente={<MaterialTable
                        columns={columns}
                        data={arrayReport}
                        title={tituloTabla}
                        actions={[
                            {
                                icon: () => <button
                                    type="button"
                                    className="btn btn-outline-success btn-sm py-0 my-0"
                                >Reporte</button>,
                                tooltip: "Imprimir",
                                onClick: (event, rowData) => {
                                    if (store.visualizacionREP) {
                                        setFechaDesde(`${fecHoy.getFullYear() + "-" + (("0" + (fecHoy.getMonth() + 1)).slice(-2)) + "-" + ("01")}`)
                                        setFechaHasta(`${fecHoy.getFullYear() + "-" + (("0" + (fecHoy.getMonth() + 1)).slice(-2)) + "-" + (("0" + fecHoy.getDate()).slice(-2))}`)
                                        seleccionarArtista(rowData, "Imprimir")
                                    }
                                    else { Swal({ text: "No tiene permisos suficientes", icon: "error" }); }
                                },
                            },
                        ]}
                        options={{
                            pageSize: `${lineasPagina}`,
                            actionsColumnIndex: -1,
                            emptyRowsWhenPaging: false,
                            pageSizeOptions: [10, 20, 40],
                        }}
                        localization={{ header: { actions: "Acciones", }, }}
                    />} />

                    <Modal open={modalImprimir} onClose={abrirCerrarModalImprimir}>
                        {bodyImprimir}
                    </Modal>

                    <Modal open={modalReporte} onClose={abrirCerrarModalReporte}>
                        {bodyReporte}
                    </Modal>

                </>
            ) : (
                volverLogin()
            )}
        </div>
    );
};

export default Reportes;
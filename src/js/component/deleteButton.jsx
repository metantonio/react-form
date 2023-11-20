import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import "./deleteButton.css";
import Swal from 'sweetalert2';

export const DeleteButton = (props) => {
    const { store, actions } = useContext(Context);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    let response;
    let respuesta;
    const handleClick = async () => {
        setIsDeleting(true);
        Swal.fire({ text: "Are you sure to delete this register?", title: "Delete", icon: "warning", confirmButtonText: 'Delete', showDenyButton: true, dangerMode: true, })
            .then((async (eliminar) => {
                if (eliminar.isConfirmed) {
                    if (props.caso) {
                        switch (props.caso) {
                            case "presupuesto":
                                let data = props.data;
                                let objEnviar = {
                                    Compania: store.user.JRCompaniaAut[0],
                                    IDBaseDatos: props.idproyecto,
                                    GITipTransaccion: "Gastos",
                                    GICompania: store.user.JRCompania,
                                    GITipo: data.tipo,
                                    GIMonto: parseFloat(data.monto),
                                    GIDivisa: props.divisa ? props.divisa : "USD",
                                    GIFecPag: new Date(), //new Date(data.fecha) en caso que se quiera el reverso en el mismo día del mov original 
                                    GIDescripcion: data.descripcion + ". Reverso del día: " + new Date(data.fecha).toLocaleString("es-VE", { timeZone: "America/Caracas" }).slice(0, 10),
                                    GITasCambio: 1,
                                    GIStatus: "R",
                                    GIPagos: [],
                                    itemIndex: props.indexEliminar,
                                    GInumProyecto: props.idproyecto,
                                    GISubcategoria: "Reverso"
                                };
                                response = await actions.getGenerico2(props.endpoint, objEnviar, "POST")
                                respuesta = await response.json()
                                if (response.ok) {
                                    Swal.fire({ text: respuesta, icon: "success" });
                                    if (data.tipo != "ingreso") {
                                        objEnviar["GIMonto"] = -parseFloat(data.monto)
                                        let response2 = await actions.registroCampos("/movGastos/register/gastos", objEnviar);
                                    } else {
                                        objEnviar["GITipTransaccion"] = "Ingresos"
                                        objEnviar["GIMonto"] = -parseFloat(data.monto)
                                        let response2 = await actions.registroCampos("/movGastos/register/ingresos", objEnviar);
                                    }

                                    props.setRecarga(!props.recarga)
                                } else {
                                    Swal.fire({ text: respuesta, icon: "error" });
                                }
                                break;
                            case "campaign":
                                let objSend = {
                                    id: props.data.id
                                };
                                response = await actions.getGenerico3(props.endpoint, objSend, "DELETE")
                                respuesta = await response.json()
                                if (response.ok) {
                                    Swal.fire({ text: respuesta, icon: "success" });
                                    props.setReload(!props.reload)
                                } else {
                                    Swal.fire({ text: respuesta, icon: "error" });
                                }
                                break;
                            default:
                                break;
                        }
                    }
                    setTimeout(() => {
                        setIsDeleting(false);
                        setIsDeleted(true);
                        setTimeout(() => {
                            setIsDeleted(false);
                            setIsDeleting(false);
                        }, 1250);
                    }, 2500);
                } else {
                    setIsDeleted(false);
                    setIsDeleting(false);
                    Swal.fire('Register will not be eliminated', '', 'info')
                }
            }))

    };

    return (
        <button
            onClick={handleClick}
            className={isDeleting || isDeleted ? "deleting button-delete" : props.icono ? "button-delete col-0 text-center h-100" : "button-delete"}
            disabled={isDeleting || isDeleted}
        >
            <span className={props.icono ? "text-center visually-hidden col-0" : "button-text"} style={{ marginLeft: "0px" }}>
                {isDeleting && !props.icono ? "Deleting ..." : props.icono ? "" : "Delete"}
            </span>
            <span className="animation">
                <span className="paper-wrapper">
                    <span className="paper"></span>
                </span>
                <span className="shredded-wrapper">
                    <span className="shredded"></span>
                </span>
                <span className="lid"></span>
                <span className="can">
                    <span className="filler"></span>
                </span>
            </span>
        </button>
    );
};
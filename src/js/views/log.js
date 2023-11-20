import React, { useState, useContext, useEffect } from 'react'
import { Context } from "../store/appContext";
import { Redirect, useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
//import bootstrap from 'bootstrap' //esta línea jode los dropdowns por el popperjs

const Logger = () => {
    //const [state, dispatch] = useStateValue();
    const { store, actions } = useContext(Context);
    const history = useHistory("");
    const volverLogin = () => {
        actions.logOut();
        return history.push("/");
    };
    useEffect(() => {
        async function cargaDatos() {
            let response = await actions.getLog()
            return response
        }
        cargaDatos()

    }, [])

    useEffect(() => { //este useEffect configurará los estilos según caso del endpoint
        if (store.Log) {
            let prueba = store.Log && store.Log.length > 0 ? store.Log.map((item, index) => {
                {
                    let result = ""
                    let itemLI = document.querySelector(`[name="${index}"]`);
                    //console.log(itemLI)
                    if (itemLI) {
                        itemLI.classList.add("list-group-item") //el genérico
                        switch (true) {
                            case item.endpoint.toLowerCase().trim().includes("login"):
                                itemLI.classList.add("list-group-item-success")
                                return result
                                break;
                            case item.endpoint.toLowerCase().trim().includes("logout"): //logout en gris con secondary
                                itemLI.classList.add("list-group-item-secondary")
                                return result
                                break;
                            case item.endpoint.toLowerCase().trim().includes("register"): //los tipo registro deberían ser azules con primary
                                itemLI.classList.add("list-group-item-primary")
                                return result
                                break;
                            case item.endpoint.toLowerCase().trim().includes("delete"): //los tipo delete deberían ser rojos con danger
                                itemLI.classList.add("list-group-item-danger")
                                return result
                                break;
                            case item.endpoint.toLowerCase().trim().includes("revertir"): //los tipo revertir deberían ser rojos con danger
                                itemLI.classList.add("list-group-item-danger")
                                return result
                                break;
                            case item.endpoint.toLowerCase().trim().includes("update"): //los tipo update deberían ser amarillos con warning
                                itemLI.classList.add("list-group-item-warning")
                                return result
                                break;
                            case item.endpoint.toLowerCase().trim().includes("alldata"): //los tipo alldata deberían ser celestes con info
                                itemLI.classList.add("list-group-item-info")
                                return result
                                break;
                            default:
                                itemLI.classList.add("list-group-item-light")
                                return result
                                break;
                        }
                        return result
                    }

                }
            }) : ""
        }

    }, [store.Log])

    return (
        <div className="contenedor ml-4 px-4 registro justify-content-between">

            {store.visualizacionSIS ? <>{store.Log && store.Log.length > 0 ?
                <ul className="list-group">
                    {store.Log.map((item, index) => {
                        return (
                            <li
                                key={index}
                                name={index}
                            >
                                {`Usuario: ${item.user}, Fecha: ${item.date}, Endpoint: ${item.endpoint}, SO: ${item.SO}, IP: ${item.IP}  `}
                            </li>)
                    })
                    }
                </ul>
                : <>Sin data</>}</>
                : volverLogin()
            }
        </div>
    );
}
export default Logger;

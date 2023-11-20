import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Redirect, Navigate } from "react-router-dom";
import { Context } from "../../store/appContext";
//import MaterialTable from "material-table";
//import { Modal, TextField, Button } from "@material-ui/core";
//import { forwardRef } from "react";
//import { Informacion } from "../component/informacion.jsx";
import WithAuth from "../../component/Auth/withAuth";

const CambioPassword = () => {
    //Recordar cambiar nombre del componente aquí
    const { store, actions } = useContext(Context);
    const history = Navigate("");
    const urlPass = "/qruser/change_password";

    const [pActual, setPActual] = useState(""); //la primera letra del estado debe estar en minúscula
    const [pNueva, setPNueva] = useState("");
    const [pConfirmNueva, setConfirmNueva] = useState("");

    const [showPass, setShowPassword] = useState(true);

    const togglePasswordVisiblity = () => {
        const { isPasswordShown } = showPass;
        setShowPassword({ isPasswordShown: !isPasswordShown });

    };
    const togglePasswordVisiblity2 = () => {
        const { isPasswordShown2 } = showPass;
        setShowPassword({ isPasswordShown2: !isPasswordShown2 });

    };
    const togglePasswordVisiblity3 = () => {
        const { isPasswordShown3 } = showPass;
        setShowPassword({ isPasswordShown3: !isPasswordShown3 });

    };
    const { isPasswordShown } = showPass;
    const { isPasswordShown2 } = showPass;
    const { isPasswordShown3 } = showPass;

    const volverLogin = () => {
        actions.logOut();
        return history.push("/");
    };

    const actualizarPassword = async () => {
        //Validación de data
        if (pNueva != pConfirmNueva) {
            return alert("Both password must match");
        }
        if (
            pActual == "" ||
            pNueva == "" ||
            pConfirmNueva == ""

        ) {
            return alert("All fields must be filled");
        } else {
            let response = await actions.getGenerico3(urlPass,
                {
                    email: store.user.JRUsuario,
                    current_password: pActual,
                    new_password: pNueva,

                },
                "PUT");
            if (response.ok){
                response = await response.json()
                alert(response.message);
            }else{
                response = await response.json()
                alert(response.message);
            }           

        }
    }

    return (

        <div
            className="container-fluid ml-4 px-4 registro justify-content-between"
        >
            <>
                <div className="row justify-content d-flex py-1">
                    <div className="col-8">
                        <div className="titulo">
                            <h1>CHANGE PASSWORD</h1>
                        </div>
                    </div>
                </div>

                <form onSubmit={(e) => e.preventDefault()}>

                    <div className="col-sm-4">
                        <div className="row d-flex flex-row">
                            <div className="col-sm-12 flex-colunm">
                                <h5>CURRENT PASSWORD</h5>
                                <div className="row d-flex">
                                    <div className="col-sm-12 mx-0 colum3">
                                        <input
                                            className="registro-input align-items-center my-0 mx-1 px-0"
                                            type={isPasswordShown ? "text" : "password"}
                                            placeholder="YOUR CURRENT PASSWORD"
                                            // value = {store.ctlsis.CTProCliente}
                                            onChange={(e) => setPActual(e.target.value)}

                                        />
                                        <i
                                            className="fa fa-eye password-icon"
                                            onClick={togglePasswordVisiblity}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="row d-flex flex-row">
                            <div className="col-sm-12 flex-colunm">
                                <h5>NEW PASSWORD</h5>
                                <div className="row d-flex">
                                    <div className="col-sm-12 mx-0 colum3">
                                        <input
                                            className="registro-input align-items-center my-0 mx-1 px-0"
                                            type={isPasswordShown2 ? "text" : "password"}
                                            placeholder="new password"
                                            // value = {store.ctlsis.CTProCliente}
                                            onChange={(e) => setPNueva(e.target.value)}
                                        />
                                        <i
                                            className="fa fa-eye password-icon"
                                            onClick={togglePasswordVisiblity2}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="row d-flex flex-row">
                            <div className="col-sm-12 flex-colunm">
                                <h5>CONFIRM NEW PASSWORD</h5>
                                <div className="row d-flex">
                                    <div className="col-sm-12 mx-0 colum3">
                                        <input
                                            className="registro-input align-items-center my-0 mx-1 px-0"
                                            type={isPasswordShown3 ? "text" : "password"}
                                            placeholder="Confirm password"
                                            // value = {store.ctlsis.CTProCliente}
                                            onChange={(e) => setConfirmNueva(e.target.value)}
                                        />
                                        <i
                                            className="fa fa-eye password-icon"
                                            onClick={togglePasswordVisiblity3}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row d-flex justify-content-end pt-4">
                        <div className="col-sm-8" />
                        <div className="col-sm-1 d-flex justify-content-start">
                        </div>
                        <div className="col-sm-2 justify-content-center">
                            <button
                                className="btn btn-outline-success btn-lg"
                                name="Completar Registro"
                                label="Completrar Registro"
                                onClick={() => {
                                    actualizarPassword();
                                }}
                            >
                                <h5>UPDATE</h5>
                            </button>
                        </div>
                    </div>

                </form>
            </>
        </div>
    )
}

export default WithAuth(CambioPassword)


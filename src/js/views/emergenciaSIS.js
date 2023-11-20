import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Redirect, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Modal, TextField, Button } from "@material-ui/core";
import { Context } from "../store/appContext";
import "../../styles/registroTraders.css";
import { Informacion } from "../component/informacion.jsx";

export const Emergency = () => {
  //Recordar cambiar nombre del componente aquí
  const { store, actions } = useContext(Context);
  const history = useHistory("");
  const [modalVentana, setModalVentana] = useState(false);
  const [pActual, setPActual] = useState("");

  const [showPass, setShowPassword] = useState(true);
  const togglePasswordVisiblity = () => {
    const { isPasswordShown } = showPass;
    setShowPassword({ isPasswordShown: !isPasswordShown });
  };
  const { isPasswordShown } = showPass;

  const abrirCerrarModal = () => {
    setModalVentana(!modalVentana);
  };
  const useStyles = makeStyles((theme) => ({
    modal2: {
      position: "relative",
      display: "inline-block",
      justifyContent: "center",
      width: 600,
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      overflow: "auto",
    },
  }));
  const styles = useStyles();
  const bodyModal = (
    <div className={styles.modal2}>
      <h3>Proceder con la siguiente opción detendrá el Sistema</h3>
      <p>¿Desea proceder?</p>
      <div className="row py-2 d-flex">
        <div className="col-sm-12 mx-0 colum3">
          <input
            className="registro-input align-items-center my-0 mx-1 px-0"
            type={isPasswordShown ? "text" : "password"}
            placeholder="Introducir clave actual"
            // value = {store.ctlsis.CTProCliente}
            onChange={(e) => setPActual(e.target.value)}
          />
          <i
            className="fa fa-eye password-icon"
            onClick={togglePasswordVisiblity}
          />
        </div>
      </div>
      <div className="row" align="right">
        <button
          className="btn btn-outline-danger"
          onClick={async(e) => {
            e.preventDefault();
            
            let data={
              JRUsuario:store.user.JRUsuario,
              JRClave: pActual,
              JRCompania:store.user.JRCompaniaAut[0],   
            };
            // alert(
            //   "Usuario: "+data.JRUsuario+ ", de momento la función se encuentra inhabilitada para no entorpercer a desarrolladores"
            // );
            let response = await actions.changePassword("/usuarios/emergency",data);
            alert(response.message);
            abrirCerrarModal();
          }}
        >
          Detener
        </button>
        <div className="col-sm-1"></div>
        <button
          className="btn btn-outline-success"
          onClick={(e) => {
            e.preventDefault();
            //alert("Botón pisado, no estoy haciendo nada de momento para no entorpecer a los desarrolladores");
            abrirCerrarModal();
          }}
        >
          Cerrar
        </button>
      </div>
    </div>
  );

  const volverLogin = () => {
    actions.logOut();
    return history.push("/");
  };

  return (
    <div
      className="contenedor ml-4 px-4 registro justify-content-between"
      id={store.expandwin ? "contenedor-expandido3" : "contenedor-principal2"}
    >
      {store.logOutConfirmation ? (
        <>
          <div className="row justify-content d-flex py-1">
            <div className="col-sm-8">
              <div className="titulo">
                <h1>INHABILITACIÓN DE EMERGENCIA DE USUARIOS</h1>
              </div>
            </div>
          </div>
          <div className="row py-2 justify-content-center">
            <div className="col-sm-2"></div>
            <div className="col-sm-8 d-grid gap-2">
              <button
                className="btn btn-danger"
                onClick={(e) => {
                  //e.preventDefault();
                  abrirCerrarModal();
                }}
              >
                Inhabilitar a todos los Usuarios
              </button>
            </div>
            <div className="col-sm-2"></div>
          </div>
          <div className="row py-2 justify-content-center">
            <div className="col-sm-2"></div>
            <div className="col-sm-8">
              <p>
                Inhabilitar a todos los usuarios de emergencia implica retirar
                todos los permisos, de manera que los usuarios (incluido el
                Administrador), NO PODRÁN consultar, agregar, editar ni eliminar
                información de la Base de Datos.
              </p>
              <p>
                Para reactivar el sistema es necesario hablar con su programador
              </p>
            </div>
            <div className="col-sm-2"></div>
          </div>
        </>
      ) : (
        volverLogin()
      )}
      <Modal open={modalVentana} onClose={abrirCerrarModal}>
        {bodyModal}
      </Modal>
    </div>
  );
};

import React, { useState, useEffect, useContext } from "react";
import PropTypes, { number } from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Redirect, useHistory } from "react-router-dom";
import { Context } from "../store/appContext";
import { makeStyles } from "@material-ui/core/styles";
import { Modal, TextField, Button } from "@material-ui/core";
import { render } from "react-dom";
/* import "../../styles/registrojuridico.css"; */

export const Informacion2 = (props) => {
  const { store, actions } = useContext(Context);
  const [showModal, setShowModal] = useState(false);
  const useStyles = makeStyles((theme) => ({
    modal1: {
      textAlign: "center",
      position: props.positx,
      display: "inline-block",
      justifyContent: "center",
      width: props.ancho,
      height: "auto",
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      top: props.cordy,
      left: props.cordx,
      transform: `translate(${props.transx}, ${props.transy})`,
    },
  }));

  const styles = useStyles();

  const abrirModal = () => {
    setShowModal(!showModal);
  };
  const bodyModal1 = (
    <div className={styles.modal1}>
      <button className="btn btn-danger" onClick={() => abrirModal()}>
        <i class="fa fa-times" aria-hidden="true"></i>
      </button>

      <p>
        En caso de colocar rellenar el texto separar con "Enter" las órdenes de
        pago y seguir el siguiente formato:
      </p>
      <div className="row">
      <p>Ejemplo:</p>
        <div className="col-sm-6">
          <h5>Nombre del Cliente/Empresa </h5>
          <h5> RIF/Cédula </h5>
          <h5> Nombre de Banco </h5>
          <h5> Número de Cuenta </h5>
          <h5> Tipo de Cuenta </h5>
          <h5> Monto </h5>
          <h5> Banco Emisor</h5>
        </div>
        <div className="col-sm-6">
          <h5>Luis Fernández</h5>
          <h5> V-20504555 </h5>
          <h5> Banco Provincial</h5>
          <h5> 0108-2222-2222-2222 </h5>
          <h5> Corriente </h5>
          <h5> 500.50 </h5>
          <h5> BNCI</h5>
          <h5>{"\n"}</h5>
          <h5>J.P. Morgan LLC</h5>
          <h5> J-10504555 </h5>
          <h5> Banco Mercantil</h5>
          <h5> 0101-2222-2222-2222 </h5>
          <h5> Ahorro </h5>
          <h5> 500.50 </h5>
          <h5> BNCI</h5>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div id="question" onClick={abrirModal}>
        <i className="fa fa-info-circle fa-2x"></i>
      </div>
      <Modal open={showModal}>{bodyModal1}</Modal>
    </>
  );
};

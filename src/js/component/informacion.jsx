import React, { useState, useEffect, useContext } from "react";
import PropTypes, { number } from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Redirect, useHistory } from "react-router-dom";
import { Context } from "../store/appContext";
import { makeStyles } from "@material-ui/core/styles";
import { Modal, TextField, Button } from "@material-ui/core";
/* import "../../styles/registrojuridico.css"; */

export const Informacion = (props) => {

    const { store, actions } = useContext(Context);
    const [showModal, setShowModal] = useState(false);
    const useStyles = makeStyles((theme) => ({

        modal1: {
            textAlign: "center",
            position: props.positx,
            display: "inline-block",
            justifyContent: "center",
            width: 240,
            height: "auto",
            backgroundColor: theme.palette.background.paper,
            border: "2px solid #000",
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
           /*  top: props.cordy,
            left: props.cordx,
            transform: `translate(${props.transx}, ${props.transy})`, */

        },
    }));

    const styles = useStyles();

    const abrirModal = () => {
        setShowModal(!showModal)

    };
    const bodyModal1 = (
        <div className={styles.modal1}>
            <button className="btn btn-danger" onClick={() => abrirModal()}>
            <i class="fa fa-times" aria-hidden="true"></i>
            </button>
            <p>{props.mensaje}</p>

        </div>
    );
   
    return (
        <>
            <div id="question"
                onClick={abrirModal}>
                <i className="fa fa-info-circle fa-2x"></i>
            </div>
            <Modal open={showModal}>
                {bodyModal1}
            </Modal>
        </>
    )
}


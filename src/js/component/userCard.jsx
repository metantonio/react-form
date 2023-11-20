import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Modal, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Drop } from "../component/dropComponent.jsx"
import "./userCard.css"

export const UserCard = ({ item, urlLink, detalle }) => {
    const useStyles = makeStyles((theme) => ({
        modal: {
            position: "relative",
            display: "inline-block",
            justifyContent: "center",
            height: "auto",
            width: 700,
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
        modal3: {
            position: "relative",
            display: "block",
            justifyContent: "center",
            width: "auto",
            //minWidth: "75%",
            height: "auto",
            //maxHeight: "80%",
            backgroundColor: theme.palette.background.paper,
            border: "2px solid #000",
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
            top: "42.5%", //debe ser aproximadamente la scale/2
            left: "42.5%",
            transform: "translate(-50%, -50%)",
            scale: 0.85,
            overflowY: "auto",
            overflowX: "auto",
            zIndex: 9999,
        },
        iconos: {
            cursor: "pointer",
        },
        inputMaterial: {
            width: "100%",
        },
    }));
    const styles = useStyles();
    let BASE_URL2 = process.env.BASE_URL + `/profiles/${item.JRUsuario}/portada.jpg`;
    const [modalFoto, setModalFoto] = useState(false);
    const [imagenPerfil, setImagenPerfil] = useState("");
    const abrirCerrarModalFoto = () => {
        setModalFoto(!modalFoto)
    }
    const fetchGenerico = async (endpoint, data, metodo) => {
        let BASE_URL = process.env.BASE_URL;
        let url = BASE_URL + endpoint;
        try {
            let response = await fetch(url, {
                method: metodo,
                headers: { "Content-Type": "application/json", "Authorization": localStorage.getItem("token") },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                let respuesta = await response.json();
                console.log(respuesta)
                return respuesta;
            } else {
                let respuesta = await response.json();
                //alert(respuesta)
                return 400
            }

        } catch (error) {
            //console.log(error);
        }
        return true;
    }
    const descargaProfile = useCallback(async () => {
        let respuesta = await fetchGenerico("/archivos/", {
            usuario: item.JRUsuario,
        }, "PUT");
        return respuesta;
    }, [imagenPerfil]);

    useEffect(() => {
        const cargaIm = async () => {
            let imagenRespuesta = await descargaProfile()
            console.log(imagenRespuesta)
            if (imagenRespuesta != 400) {
                //console.log(await imagenRespuesta.json())
                //imagenRespuesta = await imagenRespuesta.json()
                setImagenPerfil(process.env.BASE_URL + imagenRespuesta)
            } else {
                //console.log(await imagenRespuesta)
                setImagenPerfil("https://picsum.photos/200/300")
            }

            console.log(imagenPerfil)
            //console.log(BASE_URL2)
        }
        cargaIm()
    }, [])
    const bodyFoto = (
        <div className={styles.modal3}>
            <h3>Editar Foto Usuario: {item.JRUsuario}</h3>
            <br />
            <div align="right">
                <button className="btn btn-outline-success mx-2" onClick={() => abrirCerrarModalFoto()}>Cancelar</button>
            </div>
            <div className="row justify-content d-flex py-1">
                <div className="col"></div>
                <div className="col-sm-8 d-inline-block align-self-center justify-content-center text-center">
                    <img src={imagenPerfil} className="marco3 justify-content-center align-self-center" alt="..." />
                </div>
                <div className="col"></div>
            </div>
            <br />
            <Drop
                clienteNro={`${item.JRUsuario}`}
                titulo="Perfil"
                trader={`${item.JRNumTrader ? item.JRNumTrader : ""}`}
                encabezado="Subir Foto de Perfil"
                fileName="Perfil"
                mensaje={`Foto de Perfil Actualizada: ${item.JRUsuario}`}
            />
            <br />
            <div align="right">
                <button className="btn btn-outline-success mx-2" onClick={() => abrirCerrarModalFoto()}>Cancelar</button>
            </div>
        </div>

    );
    return (<>
        <div className="card mx-1" style={{ width: "100%" }}>
            <img src={imagenPerfil} className="card-img-top" alt="..."
                width="100%" height="100%"
                style={{ height: "100%", width: "100%", maxHeight: "200px", minHeight: "200px" }}
                loading="lazy"
            />
            <div className="card-body">
                <h5 className="card-title">Nombre: {item.JRNombre}</h5>
                <p className="card-text text-start">
                    <ul>
                        <li>{`Usuario: ${item.JRUsuario}`}</li>
                        <li>{`Perfil: ${item.JRUsuModelo}`}</li>
                        <li>{`Código Trader: ${item.JRNumTrader}`}</li>
                        <li>{`Correo: ${item.JREmail}`}</li>
                    </ul>
                </p>
                <div className="col-md-auto">
                    <button type="button" onClick={() => abrirCerrarModalFoto()} className="btn btn-primary col-10">
                        {"Editar Imagen"}
                    </button>
                    {/* <i className="fa fa-heart-o col-2" aria-hidden="true" /> */}
                </div>
            </div>
        </div>
        <Modal open={modalFoto} onClose={abrirCerrarModalFoto}>
            {bodyFoto}
        </Modal>
    </>
    );
};

/* CardProyectos.propTypes = {
    item: PropTypes.object
}; */
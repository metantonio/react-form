import React, { useState, useEffect, useContext, } from "react";
import { Link, useParams } from "react-router-dom";
import { Redirect, useHistory } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/registroClientes.css";
import "../../styles/subidaboton.css";
import { Informacion } from "./informacion.jsx";
//import ClientesArchivos from "../component/clientesarchivos";

export const SubidaBoton2 = (props) => {
    const { store, actions } = useContext(Context);
    const [selectedFile, setSelectedFile] = useState();
    const [isSelected, setIsSelected] = useState(false);
    const [listaArchivos, setListaArchivos] = useState([]);
    const history = useHistory("");
    const BASE_URL = process.env.BASE_URL;
    const urlRead = "/archivos/read";
    const urlDescarga = "/archivos/download";
    const [arrayRender, setArrayRender] = useState([0]);


    const agregarCampo = () => {
        let campo = arrayRender.length;
        let temporalList = arrayRender.slice();
        temporalList.push(campo);
        setArrayRender(temporalList);
    };

    const deleteItems = (indexItem) => {
        if (arrayRender.length > 1) {

            setArrayRender((prevState) =>
                prevState.filter((todo, index2) => index2 !== indexItem)
            );

        }
    };


    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsSelected(true);
    };

    const handleSubmission = async () => {
        const formData = new FormData();

        formData.append("file", selectedFile);
        formData.append("cliente", props.cliente);
        await fetch(BASE_URL + "/archivos/upload", {
            method: "POST",
            body: formData,
        })
            .then((response) => {
                response.json();
            })
            .then((result) => {
                alert("Archivo cargado exitósamente: ", result);
            })
            .catch((error) => {
                alert("Error en la carga del archivo: ", error);
            });
    };

    useEffect(() => {

    }, [
        selectedFile,
        isSelected,

    ]);


    useEffect(async () => {
        //actions.getCtl();
        //actions.checkUser();
        //store.dataExportadaCliente = {};
        //store.opcionesIndex = [];
        //await verLista();
        //console.log(store.opcionesIndex);
        //verLista()
    }, []);

    //   useEffect(async () => {
    //     //await verLista();
    //     setListaArchivos(store.opcionesIndex.message);
    //   }, [listaArchivos]);

    // useEffect(async () => {
    //   setListaArchivos(verLista());
    // }, [listaArchivos]);

    const renderForm = (indice) => {
        return (
            <>
                <div className="row">
                    {isSelected ? (
                        <div>
                            <h5>Nombre del archivo: {selectedFile.name}</h5>
                            <h5>Tamano en MB: {(selectedFile.size / 1024 / 1024).toFixed(2)}</h5>
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
                <div className="row d-flex flex-row justify-content-start align-self-center">
                    <div className="col-4 d-flex flex-row">
                        <input
                            className="align-self-center justify-content-center mx-1 px-1 selectar"
                            type="file"
                            name="file"
                            onChange={changeHandler}
                        />
                    </div>
                    <div className="col-sm-4 d-flex flex-row align-items-center">
                        <div>
                            <button
                                className="btn btn-outline-success align-self-center justify-content-start mx-1 px-1"
                                type="button"
                                onClick={handleSubmission}
                            >
                                Enviar Archivo
                            </button>
                        </div>
                        <div className="row justify-content-start d-flex flex-row">
                            <div className="col-sm-4 justify-content-start align-content-center">
                                <Informacion mensaje="Presionar seleccionar archivo y luego el botón enviar archivo para cargarlo al servidor"
                                    positx="relative"
                                    cordy="57%"
                                    cordx="58%"
                                    transx="0%"
                                    transy="0%"></Informacion>
                            </div>

                            <div className="col-sm-4 justify-content-center align-items-center adicion-campo">
                                <i className="fas fa-plus-circle" onClick={agregarCampo}></i>
                            </div>
                            <div className="col-sm-4 justify-content-center align-items-center eliminacion-campo">
                                <i className="fas fa-times" onClick={() => deleteItems(indice)} />
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="col-sm-1 align-self-center">

                        </div>
                    </div>
                </div>

            </>
        );
    };

    return (
        <>
            <div>
                {arrayRender.map((formato, index) => {
                    return <div key={index}>{renderForm(index)}</div>;
                })}
            </div>
        </>
    );
};


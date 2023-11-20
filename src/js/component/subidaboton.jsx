import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Redirect, useHistory } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/registroClientes.css";
import "../../styles/subidaboton.css";
import { Informacion } from "./informacion.jsx";
//import ClientesArchivos from "../component/clientesarchivos";

export const SubidaBoton = (props) => {
  const { store, actions } = useContext(Context);
  const [selectedFile, setSelectedFile] = useState();
  const [isSelected, setIsSelected] = useState(false);
  const [listaArchivos, setListaArchivos] = useState([]);
  const history = useHistory("");
  const BASE_URL = process.env.BASE_URL;
  const urlRead = "/archivos/read";
  const urlDescarga = "/archivos/download";

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
      <div className="row d-flex flex-row justify-content-center align-self-center">
        <div className="col-sm-4 d-flex flex-row">
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
              className="btn2 btn-outline-secondary align-self-center justify-content-start mx-1 px-1"
              type="button"
              onClick={handleSubmission}
            >
              Enviar Archivo
            </button>
          </div>
         {/*  <div className=" justify-content-start align-items-center">
            <Informacion mensaje="Presionar seleccionar archivo y luego el botón enviar archivo para cargarlo al servidor"
              positx="relative"
              cordy="57%"
              cordx="58%"
              transx="0%"
              transy="0%"></Informacion>
          </div> */}
        </div>
        <div className="col-sm-4"></div>
      </div>
    </>
  );
};

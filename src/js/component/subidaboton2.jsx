import React, { useState, useEffect, useContext } from "react";
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

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    store.opcionesIndex[props.index]=event.target.files[0]
    console.log(props.index, store.opcionesIndex[props.index].name)
    setIsSelected(true);
  };

  const handleSubmission = async () => {
    const formData = new FormData();

    formData.append("file", store.opcionesIndex[props.index]);
    formData.append("cliente", props.cliente);
    await fetch(BASE_URL + "/archivos/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        response.json();
      })
      .then(async(result) => {
        let notificacion;
        //if(props.trader!=store.user.JRNumTrader && store.user.JRNumTrader && store.user.JRNumTrader!=""){
          notificacion= await actions.getGenerico("/notificaciones/register",{
            NCompania: store.user.JRCompaniaAut[0],
            NTrader: props.trader,
            NOperaciones: props.operacion,
            NMensaje: `Cargado Comprobante de la operación: ${props.operacion}, cliente: ${props.cliente}`,
            NCliente: props.cliente,
            NArchivo: store.opcionesIndex[props.index].name+`${props.index}` //falla aquí
          })
        //}
        /* else{
          notificacion= await actions.getGenerico("/notificaciones/register",{
            NCompania: store.user.JRCompaniaAut[0],
            NTrader: props.trader,
            NOperaciones: props.operacion,
            NMensaje: `Cargado Comprobante de la operación: ${props.operacion}, cliente: ${props.cliente}`
          })

        } */
        alert("Archivo cargado exitósamente: ", result);
      })
      .catch((error) => {
        alert("Error en la carga del archivo: ", error);
      });
  };

  useEffect(async () => {
 
  }, []);

  return (
    <>
      <div className="row">
        {isSelected ? (
          <div>
            <h5>Nombre del archivo: {store.opcionesIndex[props.index].name}</h5>
            <h5>Tamano en MB: {(store.opcionesIndex[props.index].size / 1024 / 1024).toFixed(2)}</h5>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="row d-flex flex-row justify-content-center align-self-center">
        <div className="col-8 d-flex flex-row">
          <label for="img" className="btn btn-outline-success align-self-center justify-content-start mx-1 px-1">Cargar Archivo</label>
          <input
            className="hidden align-self-center justify-content-center mx-1 px-1 selectar"
            type="file"
            name="file"
            id="img"                 
            onChange={changeHandler}
          />
        </div>
        <div className="col-sm-4 d-flex flex-row align-items-center">
          <div className="col-sm-12 d-flex flex-row align-items-center">
            <button
              className="btn btn-outline-success align-self-center justify-content-start mx-1 px-1"
              type="button"
              onClick={handleSubmission}
            >
              Enviar Archivo
            </button>
          </div>
        </div>
        
      </div>
    </>
  );
};

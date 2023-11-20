import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useDropzone } from "react-dropzone";

function Dropzone({ onDrop, accept, open, cliente, operacion, trader, mensaje, clienteNro, fileName, endpoint, proyecto, notificaciones }) {
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      accept,
      onDrop,
    });
  const deleteItems = (indexItem) => {
    let updatedImages = acceptedFiles.filter((todo, index2) => { return (index2 !== indexItem) })
    //console.log(images)
    files = updatedImages.slice()
    alert("Aún en pruebas")
    acceptedFiles = acceptedFiles.filter((todo, index2) => { return (index2 !== indexItem) })

  };
  let files = acceptedFiles.map((file, index) => {
    return (
      <div className="row d-flex flex-column">
        <li className="list-group-item d-flex justify-content-between" key={index}>
          {file.path} - {((file.size / 1024) / 1024).toFixed(2)} Mb
          <i className="fas fa-times text-end " onClick={() => deleteItems(index)} /></li>
      </div>

    )
  });
  const { store, actions } = useContext(Context);
  const BASE_URL = process.env.BASE_URL;
  store.imagenCargada = false
  const upload = async () => {
    const fileInput = document.getElementById("document_attachment_doc");
    acceptedFiles.push(fileInput.files[0])
    acceptedFiles.map(async (file) => {
      let formData = new FormData();
      formData.append("file", file);
      formData.append("cliente", clienteNro);
      formData.append("operacion", operacion);
      if (fileName && fileName != undefined) {
        console.log(fileName)
        formData.append("filename", fileName)
      }
      if (proyecto && proyecto != undefined) {
        formData.append("proyecto", proyecto)
      }
      let endpoint_backend = endpoint && endpoint != undefined ? endpoint : "/archivos/upload";
      console.log(clienteNro, operacion, trader, file.name)
      let respuesta1 = await fetch(BASE_URL + endpoint_backend, {
        method: "POST",
        headers: { "Authorization": localStorage.getItem("token") },
        body: formData
      })

      let respuesta = await respuesta1.json()
      alert(respuesta);

      let mensajeMod = mensaje == "" ? `Cargado Comprobante de la operación: ${operacion}, cliente: ${cliente}, Archivo: ${file.name}` : mensaje + file.name
      console.log(mensajeMod);
      let notificacionEnviar;
      //if(props.trader!=store.user.JRNumTrader && store.user.JRNumTrader && store.user.JRNumTrader!=""){
      if (notificaciones) {
        notificacionEnviar = await actions.getGenerico("/notificaciones/register", {
          NCompania: store.user.JRCompaniaAut[0],
          NTrader: trader && trader != undefined ? trader : store.user.JRUsuario,
          NOperaciones: operacion,
          NMensaje: mensajeMod,
          NCliente: cliente,
          NArchivo: operacion ? operacion + " " + file.name : file.name //falla aquí
        })
      }
      store.imagenCargada = true
    });
  }

  return (<>
    <div className="container pt-1" style={{ width: "50%" }}>
      <div className="row d-flex">
        <div {...getRootProps({ className: "dropzone" })}>
          <input className="input-zone" {...getInputProps()} id="document_attachment_doc" />
          <div className="text-center border border-dark">
            {isDragActive ? (
              <p className="dropzone-content border border-light" style={{ border: "1px solid black" }}>
                Arrastre archivos aquí
              </p>
            ) : (
              <p className="dropzone-content">
                Arrastre archivos o click para seleccionarlos
              </p>
            )}
            <button className="btn btn-outline-success align-self-center justify-content-center" type="button" onClick={open}>
              Click para seleccionar archivos
            </button>
          </div>

        </div>

      </div>

      <div className="row d-flex">
        <div className="text-center border border-white">
          <button className="btn btn-outline-success align-self-center justify-content-center my-1 py-2" type="button" onClick={upload}>Subir archivos al servidor</button>
        </div>
      </div>
    </div>
    <div className="container">
      <ul>{files}</ul>
    </div>
  </>
  );
}
export default Dropzone;
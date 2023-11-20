import React, { useCallback, useState, useEffect } from "react";
import cuid from "cuid";
import Dropzone from "./dropzone.jsx";
import ImageGrid from "./ImageGrid";
//import "./index.css";
//import "./App.css";

export const Drop = (props) => {
  const [images, setImages] = useState([]);
  const BASE_URL = process.env.BASE_URL;
  const urlRead = "/archivos/read";
  const urlDescarga = "/archivos/download";

  const onDrop = useCallback(async (acceptedFiles) => {
    /* 
        const formData = new FormData();
        const [file] = acceptedFiles;
        formData.append("file", file);
        formData.append("cliente", props.cliente);
        await fetch(BASE_URL+"/archivos/upload", {
          method: "POST",
          body: formData
        }).then((response) => {
            response.json();
          }).then(async(result) => {
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
            
            alert("Archivo cargado exitósamente: ", result);
          })
          .catch((error) => {
            //alert("Error en la carga del archivo: ", error);
          }); */

    acceptedFiles.map((file) => {
      const reader = new FileReader();

      reader.onload = function (e) {
        //console.log(e.target.result) //es el código binario en base 64 del archivo
        //console.log(cuid()) //id de la transformación, único para cada archivo
        setImages((prevState) => [
          ...prevState,
          { id: cuid(), src: e.target.result },
        ]);
      };

      reader.readAsDataURL(file);
      //console.log(file.name)
      return file;
    });
  }, [images]);

  const handleChange = async (e) => {
    const reader = new FileReader();
    let item = await e.clipboardData.items[0];
    const fileInput = document.getElementById("document_attachment_doc");

    if (item.type.indexOf("image") === 0) {
      //console.log(item.getAsFile())
      setImages((prevState) => [
        ...prevState,
        { id: cuid(), src: URL.createObjectURL(item.getAsFile()) },
      ])
      fileInput.files = e.clipboardData.files
      console.log('fileInput: ', fileInput.files)
      console.log("lista imagenes handle: ", images)
      //setImage(item.getAsFile())
      //console.log("src: ",URL.createObjectURL(item.getAsFile()))           
    } else {
      alert("Solo se aceptan imágenes");
    }


  }
  /* useEffect(() => {
    useCallback(async (acceptedFiles) => {

      if (images.length > acceptedFiles.length) {
        acceptedFiles.pop()
      }
    }, [])

  }, [images]) */



  return (
    <div className="App">
      <h5 className="text-center">{props.encabezado ? props.encabezado : "Carga de Archivos"}</h5>
      <Dropzone onDrop={onDrop} accept={"image/*,.pdf"}
        cliente={props.cliente}
        operacion={props.operacion}
        trader={props.trader}
        mensaje={props.mensaje ? props.mensaje : ""} //que se envíe un mensaje dependerá si prop.notificacion es true
        clienteNro={props.clienteNro}
        fileName={props.fileName}
        images={images}
        endpoint={props.endpoint}
        proyecto={props.proyecto}
        notificaciones={props.notificacion} //si este prop es true, se enviará una notificación
      />
      <ImageGrid images={images} setImages={setImages} handleChange={handleChange}/>
      {/* <button type="button" onClick={upload}>Subir al servidor</button> */}
    </div>
  );
}


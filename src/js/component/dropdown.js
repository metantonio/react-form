import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";
import { SettingsBackupRestore } from "@material-ui/icons";
//import "../../styles/drowpdown.css";

export const DropdownCustom = (props) => {
  //console.log(props.item);
  //console.log(typeof(props.item));
  let variant = "Primary";
  const { store, actions } = useContext(Context);
  const [variable, setvariable] = useState("Seleccionar");
  useEffect(() => {
    //console.log(variable);
    //props.resultado = variable;
    if (store.opciones == "") {
      store.opciones = variable;
    }
    if (store.opciones2 == "") {
      store.opciones2 = variable;
    }
    //console.log(props.index);
    store.opcionesIndex[props.index] = variable;

    if (props.index) {
      if (props.index > 0) {
        //console.log("entro en index >0");
        store.opcionesIndex[props.index] = variable;
        //console.log(store.opcionesIndex);
      } else {
        console.log("error");
      }
    }

    // if(store.opciones=="" && variable==""){
    //   store.opciones=variable;
    // }
    // if(store.opciones2=="" && variable==""){
    //   store.opciones2=variable;
    // }
    //setStore({opciones: variable});
    //console.log(variable);
  }, [variable, store.opcionesIndex]);

  //cambio de color dropdown empieza gris y se torna verde cuando se elije una opcion
/*   useEffect(() => {
    
      let gris = document.querySelectorAll("#cajitagris")
      //console.log(gris);
      
        for(let i=0; i<gris.length; i++){
          if (gris[i].innerHTML == "Seleccionar" ) {
            gris[i].style= " background-color : grey !important"
          }else{
            gris[i].style= " background-color : rgb(89, 201, 176) !important"
          }          
        }              
  },[variable]) */
//fin cambio color dropdown


  return (
    <>
      <div className="dropdown justify-content-center align-items-center">
        <button
          id="cajitagris"
          type="button"
          className="btn btn-primary btn-lg dropdown-toggle btn-sm h-76"
          data-bs-toggle="dropdown"
        >
          {variable}
        </button>
        <ul className="dropdown-menu" style={{height: "180px", overflow: "auto"}}>
          {props.item.map((opcion, index) => {
            //console.log(opcion.nombre);
            return (
              <li
                className="dropdown-item"
                key={index}
                onClick={(e) => {
                  setvariable(opcion.nombre);
                  //console.log(variable);
                }}variable
              >
                {/*opcion.nombre*/}
                {/*opcion.descripcion*/}
                {/*opcion.nombre + " - " + opcion.descripcion*/}
                {!(opcion.descripcion) ? opcion.nombre
                : opcion.nombre  + " - " + opcion.descripcion }
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

DropdownCustom.propTypes = {
  //   item: PropTypes.array,
  props: PropTypes.object,
};

// {item.map((opcion, index)=>{
//     <li key={index}>{opcion.nombre}</li>
//   })}

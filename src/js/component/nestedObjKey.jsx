import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";

// A React component that uses visit() to create an array of Dropdown components
// Nota: Este componente se comunica con la variable del store: nestedCategory para pasar la selección a otro lado
const NestedObjKey = (props) => {
    const { store, actions } = useContext(Context);
    const [listaObj, setListaObj] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [value, setValue] = useState(null);
    const [nivelAnterior, setNivelAnterior] = useState(null)

    let data = [];

    // Una función que visita cada valor del objeto y llama una función callback de regreso
    function visit(obj, callback) {
        //console.log("type of: ", typeof (obj))
        if (typeof obj !== "object" || obj === null || Array.isArray(obj)) {
            // es caso que no sea un objeto ejecuta la función que se le coloque como callback y le pasa obj
            callback(obj);
        } else {
            // En caso que el hijo sea un objeto, lo recorre
            for (let key in obj) {
                if (key == "titulo") {
                    //console.log(obj[key])
                }
                if (typeof obj[key] == "object" && obj !== null) {
                    data.push(dropDownTest(obj[key]))
                    //setListaObj((prev)=>{return [...prev, dropDownTest(obj[key])]})
                }
                visit(obj[key], callback);
            }
        }
        //setListaObj(data)
    }

    const handleChange = (event) => {
        setValue(event.target.value);
        setNivelAnterior(event.target.id);
        store.nestedCategory = event.target.value
        //console.log("store.nestedCategory: ",store.nestedCategory)
        //store.setStore({...store, nestedCategory:event.target.value})
    };

    const dropDownTest = (objMap) => {
        let verificaHijos = undefined
        for (let llave in objMap) {
            if (typeof objMap[llave] == "object" && objMap[llave] !== null) {
                verificaHijos = true
            }
        }
        if (!verificaHijos) {
            return //nos salimos de la función
        }
        /* setNivelAnterior(objMap["titulo"]) */
        return (
            <div className="row">
                <label className={objMap["titulo"] == props.inicio || objMap["titulo"] == value || objMap["titulo"] == nivelAnterior ? "show" : "visually-hidden"}>Subnivel: {objMap["level"]} </label>
                <select /* value={value} */ onChange={e => { handleChange(e) }} id={objMap["titulo"]} className={objMap["titulo"] == props.inicio || objMap["titulo"] == value || objMap["titulo"] == nivelAnterior ? "show" : "visually-hidden"}>
                    <option value="" selected disabled>--Selecciona una opción--</option>
                    {Object.keys(objMap).map((key, index) => {

                        if (objMap[key]["titulo"] && objMap[key]["titulo"] != undefined && objMap[key]["titulo"] != null) {
                            if (value == null && objMap["titulo"] == props.inicio) {
                                //setValue(objMap[key]["titulo"])
                                /*  return (
                                     <option className="dropdown-item" key={index} value={objMap[key]["titulo"]} selected>
                                         {objMap[key]["indice"] + " " + objMap[key]["titulo"]}
                                     </option>
                                 ) */
                            }
                            if (Object.keys(objMap).length == 1) {
                                // setValue(objMap[key]["titulo"])
                            }
                            if (Object.keys(objMap).length - 1 == index) {
                                return (
                                    <>
                                        <option className="dropdown-item" key={index} value={objMap[key]["titulo"]}>
                                            {objMap[key]["indice"] + " " + objMap[key]["titulo"]}
                                        </option>
                                    </>
                                )
                            }
                            return (
                                <>
                                    <option className="dropdown-item" key={index} value={objMap[key]["titulo"]}>
                                        {objMap[key]["indice"] + " " + objMap[key]["titulo"]}
                                    </option>
                                </>
                            )
                        }
                    })}
                </select>
            </div>
        );
    }

    visit(props.data, (val) => {
        //console.log(typeof(val))
        if (Array.isArray(val)) {
            data.push(dropDownTest(val));
        }
    })


    useEffect(() => { console.log(value) }, [value, store.nestedCategory])
    useEffect(() => { console.log(listaObj) }, [listaObj])
    useEffect(() => {
        setValue(null)
        setNivelAnterior(null)
        store.nestedCategory = null
        data = []
        visit(props.data, (val) => {
            //console.log(typeof(val))
            if (Array.isArray(val)) {
                data.push(dropDownTest(val));
            }
        })
        setListaObj(data)
        return () => {
            data = []
            setValue("null")
            setNivelAnterior(null)
            store.nestedCategory = null
            setListaObj([])
            let selecciones = document.querySelectorAll("select")
            for (let i = 0; i < selecciones.length; i++) {
                console.log(selecciones[i].selectedIndex = 0)
                selecciones.value = "Selecciona un valor"
            }
            console.log("Cerrado componente")
        }
    }, [refresh])

    return (
        <div>
            <div className="row d-flex">
                <div className="col-sm-12 col-md-6">
                    <button className="btn btn-primary btn-sm h-76" type="button" onClick={() => { setRefresh(!refresh) }}>Reiniciar Categorías</button>

                    {data && data.length > 0 ?
                        data.map((item, index) => {
                            return (
                                <div key={`${index}-${index + 1}`}>
                                    {item}
                                </div>
                            )
                        })
                        : "No hay data"}
                </div>
                <div className="col-sm-12 col-md-12">
                    {value != null && value != "" ? <h5>Subcategoría seleccionada: {value} </h5> : <h5>Elegir una subcategoría</h5>}
                </div>

            </div>


        </div>)
}

export default NestedObjKey

import React, { useState, useEffect, useContext, Suspense } from "react";
import { Link, useParams } from "react-router-dom";
import { Spinner } from "reactstrap";
import { Redirect, useHistory } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/registroClientes.css";
import MaterialTable from "material-table";
import { Modal, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "@material-ui/icons";
import Loading from "../component/loading.jsx";
import Swal from 'sweetalert2';
import NestedObj from "../component/nestedObj.jsx";
import NestedObjKey from "../component/nestedObjKey.jsx";

//Declaración del componente en React, a diferencia de las funciones debe empezar en MAYÚSCULA
export const SingleEjemplo = () => {

    const { store, actions } = useContext(Context); //importación del store y actions del flux
    const params = useParams(); //Hook de react que obtiene la variable dinámica 'id' de la url

    //Declaración de los endpoints de backend, algunos ejemplos: 
    const urlGet = "/singleejemplo/alldata"; //endpoint del backend para obtener data
    const urlDelete = "/singleejemplo/delete"; //endpoint  del backend para borrar data
    const urlEdit = "/singleejemplo/update"; //endpoint del backend para actualizar data

    //Declaración de Estados con el Hook useState() (cuando hay cambios en los estados, las pantallas pueden renderizar de nuevo)
    const [ejemplo, setEjemplo] = useState([{
        Nombre: "Valor Inicial",
        Descripcion: "Este valor inicial puede cambiar si hay un useEffect que cambie este estado"
    }]);
    const [modalInsertar, setModalInsertar] = useState(false);
    const [modalEditar, setModalEditar] = useState(false);
    const [modalEliminar, setModalEliminar] = useState(false);
    const [modalMostrar, setModalMostrar] = useState(false);
    const [variableEstado, setVariableEstado] = useState({});
    const [vistaCarta, setVistaCarta] = useState(true)
    const history = useHistory("");
    const [recarga, setRecarga] = useState(false);

    //Declaración de variables para estilos de los Modales, hay dos ejemplos de estilos de modales
    const useStyles = makeStyles((theme) => ({
        modal: {
            position: "relative",
            display: "inline-block",
            justifyContent: "center",
            height: 600,
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
        iconos: {
            cursor: "pointer",
        },
        inputMaterial: {
            width: "100%",
        },
    }));
    const styles = useStyles();


    //Declaración de variables necesarias para MaterialTable
    let tituloTabla = "Título de la tabla de ejemplo"; //editar
    const columns = [
        {
            title: "Nombre", //Este sería el título a mostrar de la columna
            field: "Nombre", //este sería el nombre del campo del objeto del cual se extrae la información
        },
        {
            title: "Descripción",
            field: "Descripcion",
        },
    ];


    //Declaración de funciones que usará la tabla MaterialTable
    const seleccionarArtista = (artista, caso) => {
        setVariableEstado(artista);
        caso === "Editar" ? abrirCerrarModalEditar() : (
            caso === "Mostrar" ? abrirCerrarModalMostrar() : abrirCerrarModalEliminar());
    };

    const abrirCerrarModalInsertar = () => {
        setModalInsertar(!modalInsertar);
    };

    const abrirCerrarModalEditar = () => {
        setModalEditar(!modalEditar);
    };

    const abrirCerrarModalEliminar = () => {
        setModalEliminar(!modalEliminar);
    };

    const abrirCerrarModalMostrar = () => {
        setModalMostrar(!modalMostrar);
    };


    //Declaración de los cuerpos que tendrán los modales
    const bodyMostrar = (
        <>
            <div className={styles.modal}>
                Aquí va el cuerpo de bodyMostrar
                <div align="right">
                    <button className="btn btn-outline-success" type="button" onClick={() => abrirCerrarModalMostrar()}>Cancelar</button>
                </div>
            </div>
        </>
    )

    const bodyEditar = (
        <>
            <div className={styles.modal}>
                Aquí va el cuerpo de bodyEditar
                <div align="right">
                    <button className="btn btn-outline-success" type="button" onClick={() => abrirCerrarModalEditar()}>Cancelar</button>
                </div>
            </div>
        </>
    )

    const bodyEliminar = (
        <>
            <div className={styles.modal2}>
                Aquí va el cuerpo de bodyEliminar
                <div align="right">
                    <button className="btn btn-outline-success" type="button" onClick={() => abrirCerrarModalEliminar()}>Cancelar</button>
                </div>
            </div>
        </>
    )

    //useEffect es un Hook de React que funciona en 3 etapas de renderización y su estructura es: useEffect(()=>{},[])
    //Ejemplo de un useEffect que carga una lógica al renderizar el componente la primera vez:
    useEffect(() => {
        window.scrollTo(0, 0); //al cargar el componente, lleva al inicio de la ventana. Sin importar si el componente carga al final
        actions.checkUser(); //verifica al usuario

        //declaración más correcta de ejecutar una función asíncrona dentro del useEffect, ya que el useEffect asíncrono puede dar problemas
        async function primera() {
            //getGenerico devuelve el objeto como promesa de Javascript
            let lista = await actions.getGenerico2(urlGet, {
                Compania: store.user.JRCompaniaAut[0],
                IDEmpresaEjecutora: params.id // este componente recibe el id del Proyecto, en params.id
            })
            console.log('lista dentro de función primera: ', lista)
            //validamos que el resultado de la petición (la promesa) NO haya tenido un status entre 200 y 299, con el método .ok de las promesas:
            if (!lista.ok) {
                console.log("No hubo conexión exitósa, código de la petción: ", lista.status)
                //lista = await lista.json()
                //console.log("lista error: ", lista)
                //retorno el valor lista2 con la misma estructura que necesite
                let lista2 = [{
                    Nombre: "Error",
                    Descripcion: "Error al traer la lista o el endpoint no existe"
                }]

                setEjemplo(lista2); //actualizo el valor del Estado ejemplo con la lista2 en caso de error. Colocar el estado que corresponda
                return lista2; //en este punto terminaría la función
            }

            //si el status estuvo entre 200 y 299 validamos la promesa y la transformamos en un objeto Javascript con .json()
            console.log("Hubo conexión exitósa, código de la petción: ", lista.status)
            lista = await lista.json(); //transformación de la promesa en un objeto de javascript
            setEjemplo(async () => await lista); //actualizo el valor del Estado ejemplo con la lista que viene del backend. Colocar el estado que corresponda
            return lista;
        }

        //ahora ejecuto la función primera
        primera();

        console.log("estado ejemplo después de ejecutar primera(): ", ejemplo) //imprime en la consola del navegador (Chrome, Edge, Firefox, etc...)
    }, [])

    //Ejemplo de un useEffect que recarga el componente cada vez que cambia cualquiera de los Estados especificados (en este caso los estados ejemplo o recarga):
    useEffect(() => { //este useEffect también se ejecuta al iniciar el componente la primera vez
        //aquí puede ir cualquier tipo de lógica, incluida funciones asíncronas.

        console.log('Estado ejemplo: ', ejemplo) //imprime en consola del navegador los valores de los estados
        console.log('Estado recarga: ', recarga)

        Swal.fire({
            icon: 'success',
            title: `Me ejecuto la primera vez que carga el componente y cada vez que cambien los Estados: ejemplo y recarga`,
            showConfirmButton: false,
            timer: 4000
        })

        //OJO, como este useEffect depende de los Estados ejemplo y recarga, NO SE DEBE HACER setEjemplo ni setRecarga
        //en ninguna parte dentro de este useEffect, porque eso crearía un bucle infinito. En el caso de peticiones al 
        //backend se traduciría en $$$ en gastos para un servidor en producción.

    }, [ejemplo, recarga])

    //Ejemplo de un useEffect que ejecuta una lógica cuando el componente se cierra (como cuando cambiamos de pantallao hay un error al renderizar)
    useEffect(() => {
        return () => {
            //aquí puede ir cualquier tipo de lógica, incluida funciones asíncronas.
            console.log('El componente SingleEjemplo se ha cerrado')
        }
    }, [])

    // Ejemplo de obj anidado con arreglos (habrán dropdowns de los arrays)
    const obj = {
        name: "Alice",
        age: 25,
        hobbies: ["reading", "writing", "coding"],
        skills: {
            languages: ["English", "Spanish", "French"],
            frameworks: ["React", "Angular", "Vue"]
        }
    };

    // Ejemplo de obj anidado (habrán dropdowns de los objetos anidados)
    const obj1 = {
        1: {
            1: {
                1: {
                    1:
                    {
                        titulo: "Tes de otro subnivel",
                        indice: "1.1.1.1",
                        level: 4,
                    },
                    titulo: "OPERADOR DE MAQUINARIA PESADA",
                    indice: "1.1.1",
                    level: 3,
                },
                titulo: "SUELDOS",
                indice: "1.1",
                level: 2
            },
            2: {
                titulo: "BONOS",
                indice: "1.2",
                level: 2
            },
            titulo: "MANO DE OBRA",
            indice: "1",
            level: 1
        },
        2: {
            1: {
                titulo: "CABILLAS",
                indice: "2.1",
                level: 2
            },
            2: {
                titulo: "CEMENTO",
                indice: "2.2",
                level: 2
            },
            3: {
                titulo: "PIEDRA",
                indice: "2.3",
                level: 2
            },
            titulo: "MATERIALES",
            indice: 2,
            level: 1
        },
        3: {
            1: {
                titulo: "ALQUILER DE MAQUINARIA EXTERNA",
                indice: "3.1",
                level: 2
            },
            2: {
                1: {
                    titulo: "RETROEXCAVADORA",
                    indice: "3.2.1",
                    level: 3
                },
                titulo: "ALQUILER MAQUINARIA PROPIA",
                indice: "3.2",
                level: 2
            },
            titulo: "MAQUINARIA Y EQUIPOS",
            indice: 3,
            level: 1
        },
        4: {
            1: {
                titulo: "PERFORACIONES",
                indice: "4.1",
                level: 2
            },
            titulo: "SUBCONTRATISTAS",
            indice: 4,
            level: 1
        },
        level: {
            level: 1
        },
        Nombre: "Tabla de Costos"
    }

    return (
        <div
            className="container-fluid"
            id={store.expandwin ? "contenedor-expandido3" : "contenedor-principal2"}
        >
            {store.logOutConfirmation ? (
                <>
                    <div className="d-flex flex-row-reverse py-1">
                        <button
                            className="btn btn-outline-success justify-content-center align-items-center"
                            type="button"
                            onClick={() => {
                                //store.dataExportadaProyecto = {}
                                //store.opcionesIndex = []
                                history.push("/proyectos")
                            }}
                        >
                            Volver a Proyectos
                        </button>
                    </div>
                    <h1>
                        Vista de ejemplo depende de una tabla padre con el campo IDBaseDatos: {params.id}, pisar F12 para ver la consola en el navegador
                    </h1>
                    <>
                        <Loading componente={
                            <Suspense fallback={
                                <div className="d-flex justify-content-center">
                                    <Spinner color="primary" />
                                </div>
                            }>
                                <div>
                                    <ul className="nav nav-pills d-flex justify-content-center py-2" id="nav-pills" role="tablist">
                                        <li className="nav-item" role="presentation">
                                            <span className="d-flex nav-link active bg-dark text-secondary text-center justify-content-center align-self-center" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab"
                                                aria-controls="pills-home" aria-selected="true" onClick={() => {
                                                    setVistaCarta(true)
                                                    setRecarga(!recarga)
                                                }}><i className="fas fa-th"></i>
                                            </span>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <span className="d-flex nav-link active bg-dark text-secondary text-center justify-content-center align-self-center" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab"
                                                aria-controls="pills-profile" aria-selected="false" onClick={() => {
                                                    setVistaCarta(false)
                                                    setRecarga(!recarga)
                                                }}><i className="fas fa-list"></i>
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                                {vistaCarta ? <div className="text-start px-2 d-flex flex-column">
                                    <div className="d-flex text-start pb-4">
                                        <h2 className="text-start titulo-principal">Componente SingleEjemplo</h2> {/* Hay que repetirlo para ver el efecto de olas*/}
                                        <h2 className="text-start titulo-principal">Componente SingleEjemplo</h2>
                                    </div>

                                    <div className="row d-flex flex-row align-items-center justify-content-center align-self-center">
                                        {ejemplo.length > 0 ? ejemplo.map((item, index) => {
                                            return <li className="col-sm-12 col-md-4 col-xl-3 px-1 mx-2 card-holder justify-content-start" key={index}>Aquí irían las cartas de los ejemplo, con nombre {item.Nombre}</li>;
                                        }) : <>No hay cartas qué mostrar</>}
                                    </div>



                                    {/* </div> */}
                                </div> : <div className="mx-4">
                                    <MaterialTable
                                        columns={columns}
                                        data={ejemplo} //este sería el campo que hay que cambiar
                                        title={tituloTabla}
                                        actions={[
                                            {
                                                icon: "search",
                                                tooltip: "Mostrar",
                                                onClick: (event, rowData) => {
                                                    if (store.visualizacionBNC) {
                                                        seleccionarArtista(rowData, "Mostrar")
                                                    } else {
                                                        alert("No tiene permisos suficientes");
                                                    }
                                                },
                                            },
                                            {
                                                icon: "edit",
                                                tooltip: "Editar",
                                                onClick: (event, rowData) => {
                                                    if (store.editarBNC) {
                                                        seleccionarArtista(rowData, "Editar")
                                                    } else {
                                                        alert("No tiene permisos suficientes");
                                                    }
                                                },
                                            },
                                            {
                                                icon: "delete",
                                                tooltip: "Eliminar",
                                                onClick: (event, rowData) => {
                                                    if (store.deleteBNC) {
                                                        seleccionarArtista(rowData, "Eliminar")
                                                    } else {
                                                        alert("No tiene permisos suficientes");
                                                    }
                                                },
                                            },
                                        ]}
                                        options={{
                                            pageSize: 10,
                                            actionsColumnIndex: -1,
                                            emptyRowsWhenPaging: false,
                                            pageSizeOptions: [5, 10, 20, 40],
                                        }}
                                        localization={{
                                            header: {
                                                actions: "Acciones",
                                            },
                                        }}
                                    />
                                </div>
                                }
                            </Suspense>
                        } />

                        <br />
                        <br />
                        <div className="row d-lex">
                            <div className="col-6">
                                Original
                                <NestedObj data={obj} />
                            </div>
                            <div className="col-6">
                                Cambios en sistema de generación de arreglos
                                <NestedObjKey data={obj1} inicio={"MANO DE OBRA"} />
                            </div>
                        </div>




                        <Modal open={modalMostrar} onClose={abrirCerrarModalMostrar}>
                            {bodyMostrar}
                        </Modal>

                        <Modal open={modalEditar} onClose={abrirCerrarModalEditar}>
                            {bodyEditar}
                        </Modal>

                        <Modal open={modalEliminar} onClose={abrirCerrarModalEliminar}>
                            {bodyEliminar}
                        </Modal>
                    </>
                </>
            )
                : actions.volverLogin(history)
            }
        </div>
    )
}
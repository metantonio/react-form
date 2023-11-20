import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams, useHistory } from "react-router-dom";
import { Context } from "../store/appContext";
import MaterialTable from "material-table";
import { Modal, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "@material-ui/icons";
import { forwardRef } from "react";
import "../../styles/clientes.css";
import Loading from "../component/loading.jsx";
import { UserCard } from "../component/userCard.jsx";

const lineasPagina = process.env.LINEAS_PAGINA;

const TablaUsuarios = () => { // recordar cambiar el nombre del componente aquí y al final
  const { store, actions } = useContext(Context);
  const history = useHistory("");
  const urlGet = "/usuarios/alldata"; //url del backend
  const urlDelete = "/usuarios/delete"; //url del backend
  const urlEdit = "/usuarios/update-by-other"; //url del backend
  const layoutURLRegistro = "/usuarios/registro"; //url en frontend en layout.js
  let arrayConsulta = store.users; //editar array de consulta en el useEffect también que está más abajo
  let tituloTabla = "CONSULTA DE USUARIOS"; //editar
  const columns = [
    {
      title: "Username",
      field: "JRUsuario",
    },
    {
      title: "Nombre",
      field: "JRNombre",
    },
    /* {
      title: "Número de Empleado",
      field: "JRNumEmpleado",
    }, */
    {
      title: "Cédula",
      field: "JRCedula",
    },
    {
      title: "Email",
      field: "JREmail",
    },
    /* {
      title: "Codigo de Trader",
      field: "JRNumTrader",
    }, */
  ];
  const volverLogin = () => {
    actions.logOut();
    return history.push("/");
  };

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
    iconos: {
      cursor: "pointer",
    },
    inputMaterial: {
      width: "100%",
    },
  }));
  const styles = useStyles();

  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [recarga, setRecarga] = useState(false);
  const [variableEstado, setVariableEstado] = useState({
    JRUsuario: "",
    JRClave: "",
    JRNumEmpleado: "",
    JREmail: "",
    JRCedula: "",
    JRNombre: "",
    JRNacionalidad: "",
    JRFecIngreso: "",
    JRFecRetiro: "",
    JRFecCaducidad: "",
    JRClaInhabilitada: "",
    JRCodSeguridad: "",
    JRUsuModelo: "",
    JRAutCompania: "",
    JRCompaniaAut: "",
    JRComRestringida: "",
    JREjecutivo: "",
    JRMontoAut: "",
    JRIdioma: "",
    JRDirIp: "",
    JRInfPerfil: "",
    JRPrograma: "",
    JRNumTrader: "",
  });
  let tradersCod = [];
  let obbTemp;
  let sociosCod = [];
  const [tradersCod2, setTradersCod2] = useState(store.user.JRNumTrader);
  const [sociosCod2, setSociosCod2] = useState([]);
  const paseTrader = () => {
    tradersCod = [];
    sociosCod = [];
    for (let i = 0; i < store.opcionesIndex[9].length; i++) {
      //console.log("Trader: ",store.opcionesIndex[1][i].TRTrader);
      obbTemp = {
        nombre: store.opcionesIndex[9][i].TRTrader,
        descripcion: store.opcionesIndex[9][i].TRDescripcion
      };
      if (store.opcionesIndex[9][i].TRTipTrader == "T" || store.opcionesIndex[9][i].TRTipTrader == "T-S") {
        tradersCod.push(obbTemp);
      }
      if (store.opcionesIndex[9][i].TRTipTrader == "S" || store.opcionesIndex[9][i].TRTipTrader == "T-S") {
        sociosCod.push(obbTemp);
      }
      //console.log(tradersCod);
    }
    return tradersCod;
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setVariableEstado((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const seleccionarArtista = (artista, caso) => {
    setVariableEstado(artista);
    setTradersCod2(artista.JRNumTrader)
    caso === "Editar" ? abrirCerrarModalEditar() : abrirCerrarModalEliminar();
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

  /*  useEffect(async () => {
     store.opcionesIndex[9] = await actions.getGenerico("/Trader/alldata", {
       TRCompania: store.user.JRCompaniaAut[0],
     });
     paseTrader();
     setSociosCod2(tradersCod);
   }, [])
  */
  useEffect(() => {

    actions.checkUser();

    const cargaDatos1 = async () => {
      let lista = await actions.getGenerico2(urlGet, { JRCompania: store.user.JRCompania }); //editar esta Linea
      if (lista.ok){
        lista = await lista.json()
        store.users = lista; //editar esta línea
        arrayConsulta = store.users; //editar esta línea
        setVariableEstado({
          JRUsuario: arrayConsulta.JRUsuario,
          JRClave: arrayConsulta.JRClave,
          JRNumEmpleado: arrayConsulta.JRNumEmpleado,
          JREmail: arrayConsulta.JREmail,
          JRCedula: arrayConsulta.JRCedula,
          JRNombre: arrayConsulta.JRNombre,
          JRNacionalidad: arrayConsulta.JRNacionalidad,
          JRFecIngreso: arrayConsulta.JRFecIngreso,
          JRFecRetiro: arrayConsulta.JRFecRetiro,
          JRFecCaducidad: arrayConsulta.JRFecCaducidad,
          JRClaInhabilitada: arrayConsulta.JRClaInhabilitada,
          JRCodSeguridad: arrayConsulta.JRCodSeguridad,
          JRUsuModelo: arrayConsulta.JRUsuModelo,
          JRAutCompania: arrayConsulta.JRAutCompania,
          JRCompaniaAut: arrayConsulta.JRCompaniaAut,
          JRComRestringida: arrayConsulta.JRComRestringida,
          JREjecutivo: arrayConsulta.JREjecutivo,
          JRMontoAut: arrayConsulta.JRMontoAut,
          JRIdioma: arrayConsulta.JRIdioma,
          JRDirIp: arrayConsulta.JRDirIp,
          JRInfPerfil: arrayConsulta.JRInfPerfil,
          JRPrograma: arrayConsulta.JRPrograma,
          JRNumTrader: arrayConsulta.JRNumTrader,
        });
        setRecarga(false);
      }
      

    }
    //await actions.getUsers(); //cambiar función a la necesaria, viene del flux.js
    cargaDatos1()
  }, [recarga]);

  const bodyInsertar = (
    <div className="modal">
      <div className={styles.modal}>
        <h3>Agregar Nuevo</h3>
        <TextField
          className={styles.inputMaterial}
          label="Cliente"
          name="cliente"
          onChange={handleChange}
        />
        <br />
        <TextField
          className={styles.inputMaterial}
          label="País"
          name="pais"
          onChange={handleChange}
        />
        <br />
        <TextField
          className={styles.inputMaterial}
          label="Ventas"
          name="ventas"
          onChange={handleChange}
        />
        <br />
        <TextField
          className={styles.inputMaterial}
          label="Género"
          name="genero"
          onChange={handleChange}
        />
        <br />
        <br />
        <div align="right">
          <button className="btn btn-outline-success" color="primary" onClick={() => peticionPost()}>
            Insertar
          </button>
          <button className="btn btn-outline-success" onClick={() => abrirCerrarModalInsertar()}>Cancelar</button>
        </div>
      </div>
    </div>
  );

  const dropTraders = (
    <span className="d-flex flex-nowrap dropwdowncustom my-0 px-1">
      <div className="dropdown justify-content-center align-items-center">
        <button
          type="button"
          className="btn btn-primary dropdown-toggle btn-sm h-76"
          data-bs-toggle="dropdown"
        >
          {tradersCod2}
        </button>
        <ul className="dropdown-menu">
          {sociosCod2.map((opcion, index) => {
            //console.log(opcion.nombre);
            return (
              <li
                className="dropdown-item"
                key={index}
                onClick={(e) => {
                  setTradersCod2(opcion.nombre);
                  setVariableEstado((prevState) => ({
                    ...prevState,
                    ["JRNumTrader"]: opcion.nombre,
                  }));
                  //console.log(variable);
                }}
              >
                {opcion.nombre + " - " + opcion.descripcion}
              </li>
            );
          })}
        </ul>
      </div>
    </span>
  )

  const bodyEditar = (

    <div className={styles.modal}>
      <h3>Editar Usuario: {variableEstado.JRUsuario}</h3>
      <br />
      <div className="row justify-content d-flex py-0">
        {/* sub-columna   */}
        <div className="col-sm-12 col-md-4">
          <div className="row d-flex flex-row">
            <div className="col-sm-12 flex-colunm">
              <h5>Cédula de Identidad</h5>
              <div className="row d-flex">
                <div className="col-10 colum3">
                  <input
                    className="registro-input align-items-center my-0 mx-1 px-1"
                    name="JRCedula"
                    onChange={handleChange}
                    label="Cédula de Identidad"
                    placeholder={variableEstado.JRCedula}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-md-4">
          <div className="row d-flex flex-row">
            <div className="col-sm-12 flex-colunm">
              <h5>Nombre Completo</h5>
              <div className="row d-flex">
                <div className="col-10 colum3">
                  <input
                    className="registro-input align-items-center my-0 mx-1 px-1"
                    name="JRNombre"
                    label="Nombre Completo"
                    onChange={handleChange}
                    placeholder={variableEstado.JRNombre}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-md-4">
          <div className="row d-flex flex-row">
            <div className="col-sm-12 flex-colunm">
              <h5>Nacionalidad</h5>
              <div className="row d-flex">
                <div className="col-10 colum3">
                  <input
                    className="registro-input align-items-center my-0 mx-1 px-1"
                    name="JRNacionalidad"
                    label="Nro. Registro"
                    onChange={handleChange}
                    placeholder={variableEstado.JRNacionalidad}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row justify-content d-flex py-0">
        {/* sub-columna   */}
        <div className="col-sm-12 col-md-4">
          <div className="row d-flex flex-row">
            <div className="col-sm-12 flex-colunm">
              <h5>Número de Empleado</h5>
              <div className="row d-flex">
                <div className="col-10 colum3">
                  <input
                    className="registro-input align-items-center my-0 mx-1 px-1"
                    name="JRNumEmpleado"
                    label="Nro. Registro"
                    onChange={handleChange}
                    placeholder={variableEstado.JRNumEmpleado}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="row justify-content d-flex py-1">
        <div className="col-sm-4">
          <div className="row d-flex flex-row">
            <div className="col-12 flex-colunm">
              <h5>Código Trader</h5>
              <div className="row d-flex">
                <div className="col-12 colum3">
                   <input
                    className="registro-input align-items-center my-0 mx-1 px-1"
                    name="K8CtaContable"
                    label="Cta. Contable"
                    onChange={handleChange}
                    value={variableEstado.K8CtaContable}
                  /> 
                  {dropTraders}
                </div>
                <button className="btn btn-outline-success mx-2 my-1" onClick={(e) => {
                  setTradersCod2("");
                  setVariableEstado((prevState) => ({
                    ...prevState,
                    ["JRNumTrader"]: "",
                  }));
                }}>Eliminar Trader</button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-4">
          <div className="row d-flex flex-row">
            <div className="col-12 flex-colunm">
              <h5>Número de Empleado</h5>
              <div className="row d-flex">
                <div className="col-12 colum3">
                  <input
                    className="registro-input align-items-center my-0 mx-1 px-1"
                    name="JRNumEmpleado"
                    label="Nro. Registro"
                    onChange={handleChange}
                    placeholder={variableEstado.JRNumEmpleado}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <br />
      <br />
      <div align="right">
        <button
          className="btn btn-outline-success mx-2"
          color="primary"
          onClick={async () => {
            let response = await actions.edicionCampos(urlEdit, variableEstado);
            alert(response);
            abrirCerrarModalEditar();
            setRecarga(true);
          }}
        >
          Editar
        </button>
        <button className="btn btn-outline-success mx-2" onClick={() => abrirCerrarModalEditar()}>Cancelar</button>
      </div>
    </div>

  );

  const bodyEliminar = (

    <div className={styles.modal2}>
      <p>
        Estás seguro que deseas eliminar el Registro de:{" "}
        {variableEstado.JRUsuario}?{" "}
      </p>
      <div align="right">
        <button
          className="btn btn-outline-success mx-2"
          color="secondary"
          onClick={() => {
            actions.eliminarRegistro(urlDelete, {
              JRUsuario: variableEstado.JRUsuario,
            });

            abrirCerrarModalEliminar();
            setRecarga(false);
            setRecarga(true);
          }}
        >
          Sí
        </button>
        <button className="btn btn-outline-success" onClick={() => abrirCerrarModalEliminar()}>No</button>
      </div>
    </div>

  );
  const [vistaCarta, setVistaCarta] = useState(false)
  return (
    <div>
      {store.logOutConfirmation ? (
        <>
          <div>
            <ul className="nav nav-pills d-flex justify-content-center py-2" id="nav-pills" role="tablist">
              <li className="nav-item" role="presentation">
                <span className="d-flex nav-link active bg-light text-secondary text-center justify-content-center align-self-center" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab"
                  aria-controls="pills-home" aria-selected="true" onClick={() => setVistaCarta(true)}><i className="fas fa-th"></i>
                </span>
              </li>
              <li className="nav-item" role="presentation">
                <span className="d-flex nav-link active bg-light text-secondary text-center justify-content-center align-self-center" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab"
                  aria-controls="pills-profile" aria-selected="false" onClick={() => setVistaCarta(false)}><i className="fas fa-list"></i>
                </span>
              </li>
            </ul>
          </div>
          {vistaCarta ? <div className="text-center mt-2 d-flex flex-column align-items-center">
            <div className="d-flex text-center m-2">
              <h4 className="text-start">CONSULTA DE USUARIOS</h4>
            </div>
            <div className="container-fluid" style={{ "height": "90vh", "scale": "1" }}>
              <div className="row d-flex flex-row align-items-start justify-content-center">
                {arrayConsulta.map((character, index) => {
                  return <div className="col-sm-12 col-md-6 col-xl-3 justify-content-start mx-1 " key={index}><UserCard key={index} item={character} /></div>;
                })}
              </div>
            </div>


          </div> : <MaterialTable
            columns={columns}
            data={arrayConsulta}
            title={tituloTabla}
            actions={[
              {
                icon: "edit",
                tooltip: "Editar",
                onClick: (event, rowData) =>
                  seleccionarArtista(rowData, "Editar"),
              },
              {
                icon: "delete",
                tooltip: "Eliminar",
                onClick: (event, rowData) =>
                  seleccionarArtista(rowData, "Eliminar"),
              },
            ]}
            options={{
              pageSize: parseInt(lineasPagina),
              actionsColumnIndex: -1,
              emptyRowsWhenPaging: false,
              pageSizeOptions: [5, 10, 20, 40],
            }}
            localization={{
              header: {
                actions: "Acciones",
              },
            }}
          />}




          <div className="row">
            <div className="col-10" />
            <div className="col-2">
              <Button className="btn-light">
                <Link to={layoutURLRegistro}>Registrar</Link>
              </Button>
            </div>
          </div>

          <Modal open={modalEditar} onClose={abrirCerrarModalEditar}>
            {bodyEditar}
          </Modal>

          <Modal open={modalEliminar} onClose={abrirCerrarModalEliminar}>
            {bodyEliminar}
          </Modal>
        </>
      ) : (
        volverLogin()
      )}
    </div>
  );
};

export default TablaUsuarios;

import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Redirect, Navigate } from "react-router-dom";
import { Context } from "../../store/appContext";
import { makeStyles } from "@material-ui/core/styles";
import { Modal, TextField, Button } from "@material-ui/core";
import "../../../styles/registroClientes.css";

export const Userqrregister = () => { //Recordar cambiar nombre del componente aquí
  const { store, actions } = useContext(Context);
  const history = Navigate("");
  const layoutURLTabla = "/tabla-usuarios"; //url del front-end a la tabla a la cual regresar
  const urlRegister = "/signup-qr-user"; //url del backend
  const [jRUsuario, setJRUsuario] = useState("Username"); //la primera letra del estado debe estar en minúscula
  const [jRClave, setJRClave] = useState("Password");
  const [jRNumEmpleado, setJRNumEmpleado] = useState(99999);
  const [jRCedula, setJRCedula] = useState("Cédula");
  const [jRNombre, setJRNombre] = useState("Name");
  const [jREmail, setJREmail] = useState("Email");
  const [lastname, setLastName] = useState("Lastname")
  const [jRNacionalidad, setJRNacionalidad] = useState("Nacionalidad");
  const [jREjecutivo, setJREjecutivo] = useState(0);
  const [jRMontoAut, setJRMontoAut] = useState(0);
  const [jRIdioma, setJRIdioma] = useState("espanol");
  const [jRDirIp, setJRDirIp] = useState("aquí iría la IP");
  const [recarga, setRecarga] = useState(false)
  const [tradersCod2, setTradersCod2] = useState([]);
  const [sociosCod2, setSociosCod2] = useState([]);
  const [birthdate, setBirthdate] = useState(new Date())
  const [phone, setPhone] = useState("")
  const opciones = [{ nombre: "Venezolano" },]; //opciones del dropdown
  const [opcionDropdown1, setOpcionDropdown1] = useState("Masculino"); //estado de los cambios del dropdown
  const [modalVentana, setModalVentana] = useState(false);
  const abrirCerrarModal = () => {
    setModalVentana(!modalVentana);
  };
  const [variableEstado, setVariableEstado] = useState({ JRUsuario: "" });
  const [eleccionDrop, setEleccionDrop] = useState("Select")
  const [permisosDrop, setPermisosDrop] = useState([]);
  const [perfilDrop, setPerfilDrop] = useState([]);
  const [showPass, setShowPassword] = useState(true);  //estado para mostrar y ocultar password
  const togglePasswordVisiblity = () => {
    const { isPasswordShown } = showPass;
    setShowPassword({ isPasswordShown: !isPasswordShown });
  };
  const { isPasswordShown } = showPass;
  const genderList = ["Male", "Female"]

  useEffect(() => {
    //await actions.getCtl();
    const cargaDatos = async () => {
      let listaPromise = actions.getGenerico("/tablas/alldata", {
        RTCompania: store.user.JRCompaniaAut[0],
      }); //editar esta Linea

      let listaPerfilesPromise = actions.getGenerico("/perfiles/alldata", {
        Compania: store.user.JRCompaniaAut[0],
      }); //editar esta Linea
      //console.log(listaPerfiles)

      let listaStatusPromise = actions.getGenerico("/tablas/allespecifico2", {
        RTCompania: store.user.JRCompaniaAut[0],
        RTCodigo: "STATUS",
      }); //editar esta Linea

      let [lista, listaPerfiles, listaStatus] = await Promise.all([listaPromise, listaPerfilesPromise, listaStatusPromise])
      store.tablas = lista; //editar esta línea
      setPerfilDrop(listaPerfiles);
      /* setListaTablaStatus(listaStatus[0].RTTabla) */
    }
    //cargaDatos()
  }, [])

  const volverLogin = () => {
    actions.logOut();
    return history.push("/iq-qr-user");
  };

  /* PERFILES SELECCION*/
  const dropPerfiles = (campo) => {
    return (
      <span className="d-flex flex-nowrap dropwdowncustom my-0 mx-0 px-0">
        <div className="dropdown justify-content-center align-items-center">
          <button
            type="button"
            className="btn btn-primary dropdown-toggle btn-sm h-76"
            data-bs-toggle="dropdown"
          >
            {eleccionDrop}
          </button>
          <ul className="dropdown-menu" style={{ height: "180px", overflow: "auto" }}>
            {perfilDrop.map((opcion, index) => {
              //console.log(opcion.nombre);
              return (
                <li
                  className="dropdown-item"
                  key={index}
                  onClick={(e) => {
                    setEleccionDrop(opcion.Identificacion)
                    setPermisosDrop(opcion.Permisos)
                    setVariableEstado((prevState) => ({
                      ...prevState,
                      ["JRPrograma"]: opcion.Permisos,
                      ["JRUsuModelo"]: opcion.Identificacion,
                    }));
                    console.log(opcion.Permisos);
                  }}
                >
                  {opcion.Identificacion}
                </li>
              );
            })}
          </ul>
        </div>
      </span>
    )
  }

  const dropGender = (campo) => {
    return (
      <span className="d-flex flex-nowrap dropwdowncustom my-0 mx-0 px-0">
        <div className="dropdown justify-content-center align-items-center">
          <button
            type="button"
            className="btn btn-primary dropdown-toggle btn-sm h-76"
            data-bs-toggle="dropdown"
          >
            {eleccionDrop}
          </button>
          <ul className="dropdown-menu" style={{ height: "180px", overflow: "auto" }}>
            {genderList.map((opcion, index) => {
              //console.log(opcion.nombre);
              return (
                <li
                  className="dropdown-item"
                  key={index}
                  onClick={(e) => {
                    setEleccionDrop(opcion)
                  }}
                >
                  {opcion}
                </li>
              );
            })}
          </ul>
        </div>
      </span>
    )
  }


  const useStyles = makeStyles((theme) => ({
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
  }));
  const styles = useStyles();

  //En bodyModal modal cambiar el nombre a mostrar
  const bodyModal = (
    <div className={styles.modal2} id="modal2">
      <p>Successfuly registered: {jRUsuario}</p>
      <div align="right">
        <button className="btn btn-outline-success mx-2">
          <Link className="subrayado" to={layoutURLTabla}>Go back to the users list</Link>
        </button>
        <button className="btn btn-outline-success" onClick={() => abrirCerrarModal()}>Register another user</button>
      </div>
    </div>
  );

  const completarRegistro = async (e) => {
    //Validación de data
    e.preventDefault();
    alert("Acepte para registrar")

    let data = new FormData(e.target)

    if (
      jRUsuario == "" ||
      jRClave == "" ||
      jRCedula == "" ||
      jRNombre == "" ||
      /* jRNacionalidad == "" || */
      (jREmail.includes("@") == false)
    ) {
      return alert("There are field needed to fill");
    }

    //mejor enviar el objeto directamente:
    let response = await actions.getGenerico3(urlRegister, {
      username: jRUsuario,
      password: jRClave,
      name: jRNombre,
      email: jREmail.toLowerCase(),
      gender: eleccionDrop,
      lastname: lastname,
      birthday: birthdate,
      phone:phone
    }, "POST");
    //console.log(response.status);
    //typeof(response.status);
    if (response.ok) {
      //console.log(response.status);
      alert("register successfully");
      setJRCedula("Cédula")
      setJRClave("Password")
      setJRDirIp("")
      setJREmail("email")
      setJRIdioma("")
      setJRUsuario("Nombre de Usuario")
      setJRNacionalidad("Nacionalidad")
      setJRNombre("Nombre Completo")
      setJRNumEmpleado("Número de Empleado")
      store.opcionesIndex[7] = "Seleccionar"
      document.getElementById("form-register").reset(); //forma correcta de resetear FormData
      history.push("/iq-qr-user")
      //abrirCerrarModal();
      //setRecarga(!recarga)
    } else {
      alert("error, try again");
      actions.getCtl();
    }
    console.log(response);
  };

  return (
    <div
      className="contenedor ml-4 px-4 registro justify-content-between bg bg-secondary"
    >
      <>
        <form onSubmit={(e) => completarRegistro(e)} id="form-register">
          {/*Título*/}
          <div className="row justify-content d-flex py-1">
            <div className="col-8">
              <div className="titulo">
                <h1>QR-USER REGISTRATION</h1>
              </div>
            </div>
          </div>
          <div className="row justify-content d-flex py-2 foc">
          </div>
          <div className="row justify-content-between d-flex py-0">
            {/* sub-columna   */}
            <div className="col-sm-12 col-md-3">
              <div className="row d-flex flex-row">
                <div className="col-12 flex-colunm">
                  <h5>Username</h5>
                  <div className="row d-flex">
                    <div className="col-12 colum3">
                      <input
                        className="registro-input"
                        type="string"
                        name="usuario"
                        placeholder={jRUsuario}
                        required="required"
                        onChange={(e) => setJRUsuario(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-md-3">
              <div className="row d-flex flex-row">
                <div className="col-12 flex-colunm">
                  <h5>Password</h5>
                  <div className="row d-flex">
                    <div className="col-12 colum3">
                      <input
                        className="registro-input"
                        type={isPasswordShown ? "text" : "password"}
                        placeholder={jRClave}
                        required="required"
                        onChange={(e) => setJRClave(e.target.value)}
                      />
                      <i
                        className="fa fa-eye password-icon"
                        onClick={togglePasswordVisiblity}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-md-3">
              <div className="row d-flex flex-row">
                <div className="row d-flex flex-row">
                  <div className="col-12 flex-colunm">
                    <h5>Email</h5>
                    <div className="row d-flex">
                      <div className="col-12 colum3">
                        <input
                          className="registro-input"
                          type="email"
                          placeholder={jREmail}
                          required="required"
                          onChange={(e) => setJREmail(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row justify-content-between d-flex py-0">
            {/* sub-columna   */}
            <div className="col-sm-12 col-md-3">
              <div className="row d-flex flex-row">
                <div className="col-12 flex-colunm">
                  <h5>Name</h5>
                  <div className="row d-flex">
                    <div className="col-12 colum3">
                      <input
                        className="registro-input"
                        type="string"
                        placeholder={jRNombre}
                        required="required"
                        onChange={(e) => setJRNombre(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* sub-columna   */}
            <div className="col-sm-12 col-md-3">
              <div className="row d-flex flex-row">
                <div className="col-12 flex-colunm">
                  <h5>Lastname</h5>
                  <div className="row d-flex">
                    <div className="col-12 colum3">
                      <input
                        className="registro-input"
                        type="string"
                        placeholder={lastname}
                        required="required"
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-sm-12 col-md-3">
              <div className="col-12 mx-3">
                <h5>Gender (Optional)</h5>
                {dropGender("JRPrograma")}
              </div>
            </div>
          </div>
          <div className="row justify-content-between d-flex py-0">
            <div className="col-sm-12 col-md-3">
              <div className="row d-flex flex-row">
                <div className="col-12 flex-colunm">
                  <h5>Birthdate</h5>
                  <div className="row d-flex">
                    <div className="col-12 colum3">
                      <input
                        className="registro-input"
                        type="date"
                        placeholder={birthdate}
                        required="required"
                        onChange={(e) => setBirthdate(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-md-3">
              <div className="row d-flex flex-row">
                <div className="col-12 flex-colunm">
                  <h5>Phone (optional)</h5>
                  <div className="row d-flex">
                    <div className="col-12 colum3">
                      <input
                        className="registro-input"
                        type="string"
                        placeholder={phone}
                        //required="required"
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row justify-content d-flex py-0">
          </div>
          <div className="row justify-content d-flex py-0">
          </div>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          {/* parte 2 */}
          <div className="row d-flex justify-content-end">
            <div className="col-8" />
            <div className="col-1 d-flex justify-content-start">
            </div>
            <div className="col-2 justify-content-center">
              <button
                className="btn btn-outline-success btn-lg"
                name="Completar Registro"
                label="Completrar Registro"
                type="submit"
              >
                <h5>REGISTER</h5>
              </button>
            </div>
          </div>
        </form>
        <Modal open={modalVentana} onClose={abrirCerrarModal}>
          {bodyModal}
        </Modal>
      </>
    </div>
  );
};

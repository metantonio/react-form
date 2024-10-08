import Swal from "sweetalert2";

export const usuariosStore = {
    user: {},
    userqr: {},
    users: [],
    logOutConfirmation: false,
    visualizacion: false,
    visualizacionTOCLI: false,
    visualizacionTRA: false,
    visualizacionTAS: false,
    visualizacionTRN: false,
    visualizacionORD: false,
    visualizacionBNC: false,
    visualizacionDIV: false,
    visualizacionUSR: false,
    visualizacionOPE: false,
    visualizacionCON: false,
    visualizacionREP: false,
    visualizacionSIS: false,
    visualizacionCaja: false,
    crearCLI: false,
    editarCLI: false,
    editarStatusCLI: false,
    deleteCLI: false,
    crearUSR: false,
    editarUSR: false,
    deleteUSR: false,
    crearTRA: false,
    editarTRA: false,
    editarCaja: false,
    deleteTRA: false,
    crearTAS: false,
    editarTAS: false,
    deleteTAS: false,
    crearBNC: false,
    editarBNC: false,
    deleteBNC: false,
    crearDIV: false,
    editarDIV: false,
    deleteDIV: false,
    deleteCaja: false,
    crearOPE: false,
    editarOPE: false,
    deleteOPE: false,
    crearCON: false,
    editarCON: false,
    deleteCON: false,
    tesoroNAC: false,
    tesoroDIV: false,
    editarCUM: false,
    auth: "",
    notificaciones: {},
    notificacionesPush: [],
}

export function usuariosActions(getStore, getActions, setStore) {
    const BASE_URL = process.env.BASE_URL;
    const BASE_URL2 = process.env.BASE_URL2;
    return {
        login: async (user_name, password) => {
            let url = BASE_URL + "/usuarios/login";
            let actions = getActions();
            let store = getStore();
            let login_data = {};
            let atCounter = false;

            for (let i = 0; i < user_name.length; i++) {
                if (atCounter) {
                    break;
                }
                if (user_name.charAt(i) == "@") {
                    atCounter = true;
                }
            }

            if (!atCounter) {
                login_data = {
                    username: user_name,
                    password: password
                };
            } else if (atCounter) {
                login_data = {
                    username: user_name,
                    password: password
                };
            }
            let response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(login_data)
            });
            let userdata = await response.json();

            //actions.saveUserData(user);
            if (response.ok) {
                //let response2 = actions.checkUser();
                if (response.ok) {
                    setStore({ ...store, user: userdata });
                    setStore({ ...store, logOutConfirmation: true });
                    localStorage.setItem("username", userdata.JRUsuario); //revisar
                    //localStorage.setItem("password", userdata.JRClave);
                    localStorage.setItem("token", userdata.token);
                    localStorage.setItem("logOutConfirmation", true);
                    //actions.getUsers();
                    actions.getTablas();
                    actions.getCtl();
                    actions.checkUser();
                    return true;
                } else {
                    //actions.logOut();
                    alert("username o password incorrectos");
                    return false;
                }
            } else {
                //actions.logOut();
                alert("username o password incorrectos");
                return false;
            }
        },
        loginPhp: async (user_name, password) => {
            let url = BASE_URL + "/admin/verify.php";
            let actions = getActions();
            let store = getStore();
            let login_data = {};
            let atCounter = false;
            const data = new URLSearchParams();
            data.append('t1', user_name);
            data.append('t2', password);
            data.append('login', "");

            for (let i = 0; i < user_name.length; i++) {
                if (atCounter) {
                    break;
                }
                if (user_name.charAt(i) == "@") {
                    atCounter = true;
                }
            }

            if (!atCounter) {
                login_data = {
                    username: user_name,
                    password: password
                };
            } else if (atCounter) {
                login_data = {
                    username: user_name,
                    password: password
                };
            }
            console.log("before making fetch")
            //console.log(data.toString())
            let response = await fetch(url, {
                method: "POST",
                mode: "no-cors",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Access-Control-Allow-Origin": "*",
                    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
                    /* 'X-Forwarded-For': '34.230.98.190:443' */
                },
                body: data.toString()
            });
            console.log(response);
            let userdata = await response.text();
            //console.log(response.statusText)
            console.log("data", userdata) // This is working but could be blocked by CORS, use a browser shorcut without cors for dev
            /* //actions.saveUserData(user);

            console.log(userdata);
            setStore({ ...store, user: userdata });
            setStore({ ...store, logOutConfirmation: true });
            localStorage.setItem("username", userdata.JRUsuario); //revisar
            //localStorage.setItem("password", userdata.JRClave);
            localStorage.setItem("token", userdata.token);
            localStorage.setItem("logOutConfirmation", true);
            //actions.getUsers();
            //actions.getTablas();
            //actions.getCtl();
            //actions.checkUser(); */
            return true;

        },
        saveUserData: (user, google = null) => {
            setStore({ ...store, user: user, logOutConfirmation: true });
            //localStorage.setItem("token", user.jwt);
            //localStorage.setItem("id", user.id);
            localStorage.setItem("username", user.username);
            localStorage.setItem("logOutConfirmation", true);
            //localStorage.setItem("picture", user.picture);
            if (google) {
                localStorage.setItem("name", user.name);
            } else {
                localStorage.setItem(
                    "name",
                    user.name.charAt(0).toUpperCase() +
                    user.name.slice(1) +
                    " " +
                    user.last_name.charAt(0).toUpperCase() +
                    user.last_name.slice(1)
                );
            }
        },
        getUsers: async () => {
            let url = BASE_URL + "/usuarios/alldata";
            let actions = getActions();
            let store = getStore();
            let token = localStorage.getItem("token");
            let data = {
                JRCompania: store.user.JRCompania,
            }
            try {
                let response = await fetch(url, {
                    method: "POST",
                    headers: { "Content-Type": "application/json", "Authorization": token },
                    body: JSON.stringify(data)
                });
                let respuesta = await response.json();
                //console.log("Información obtenida");
                //console.log("getUsers: ", respuesta);
                setStore({ ...store, users: respuesta });
                //console.log("check users: ",store.users)
                return respuesta;
            } catch (error) {
                console.log(error);
            }

            return true;
        },
        checkUser: async () => {
            let url = BASE_URL + "/usuarios/check";

            let actions = getActions();
            let store = getStore();
            let login_data = {};
            let atCounter = false;
            let user_name = localStorage.getItem("username");
            let password = localStorage.getItem("password");
            let token = localStorage.getItem("token");

            for (let i = 0; i < user_name.length; i++) {
                if (atCounter) {
                    break;
                }
                if (user_name.charAt(i) == "@") {
                    atCounter = true;
                }
            }

            if (!atCounter) {
                login_data = {
                    username: user_name,
                    password: password
                };
            } else if (atCounter) {
                login_data = {
                    username: user_name,
                    password: password
                };
            }
            let response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json", "Authorization": token },
                body: JSON.stringify(login_data)
            });
            let userdata = await response.json();



            //actions.saveUserData(user);
            if (response.ok) {
                //let response2 = actions.checkUser();
                if (userdata.authorization == "Autorización validada SIFE") {
                    setStore({ ...store, auth: userdata });
                    store.user.JRPrograma = userdata.JRPrograma;
                    actions.permisos("CLI001", "visualizacion");
                    actions.permisos("CLI005", "visualizacionTOCLI");
                    actions.permisos("TRA001", "visualizacionTRA");
                    actions.permisos("TAS001", "visualizacionTAS");
                    actions.permisos("TRN001", "visualizacionTRN");
                    actions.permisos("ORD001", "visualizacionORD");
                    actions.permisos("BNC001", "visualizacionBNC");
                    actions.permisos("DIV001", "visualizacionDIV");
                    actions.permisos("USR001", "visualizacionUSR");
                    actions.permisos("SIS001", "visualizacionSIS");
                    actions.permisos("REP001", "visualizacionREP");
                    actions.permisos("OPE001", "visualizacionOPE");
                    actions.permisos("CON001", "visualizacionCON");
                    actions.permisos("CAJA001", "visualizacionCaja");
                    actions.permisos("CHICA001", "visualizacionCHICA");

                    actions.permisos("CLI002", "crearCLI");
                    actions.permisos("USR002", "crearUSR");
                    actions.permisos("TRA002", "crearTRA");
                    actions.permisos("OPE002", "crearOPE");
                    actions.permisos("DIV002", "crearDIV");
                    actions.permisos("BNC002", "crearBNC");
                    actions.permisos("TRN002", "crearTRN");
                    actions.permisos("ORD002", "crearORD");
                    actions.permisos("TAS002", "crearTAS");
                    actions.permisos("CON002", "crearCON");
                    actions.permisos("REP002", "crearREP");
                    actions.permisos("SIS002", "crearSIS");
                    actions.permisos("CAJA002", "crearCAJA");
                    actions.permisos("CHICA002", "crearCHICA");

                    actions.permisos("CLI003", "editarCLI");
                    actions.permisos("CLI006", "editarStatusCLI");
                    actions.permisos("USR003", "editarUSR");
                    actions.permisos("TRA003", "editarTRA");
                    actions.permisos("OPE003", "editarOPE");
                    actions.permisos("DIV003", "editarDIV");
                    actions.permisos("BNC003", "editarBNC");
                    actions.permisos("TRN003", "editarTRN");
                    actions.permisos("ORD003", "editarORD");
                    actions.permisos("TAS003", "editarTAS");
                    actions.permisos("CON003", "editarCON");
                    actions.permisos("REP003", "editarREP");
                    actions.permisos("CUM001", "editarCUM");
                    actions.permisos("CAJA003", "editarCaja");
                    actions.permisos("SIS003", "editarSIS");
                    actions.permisos("CHICA003", "editarCHICA");

                    actions.permisos("CLI004", "deleteCLI");
                    actions.permisos("USR004", "deleteUSR");
                    actions.permisos("TRA004", "deleteTRA");
                    actions.permisos("OPE004", "deleteOPE");
                    actions.permisos("DIV004", "deleteDIV");
                    actions.permisos("BNC004", "deleteBNC");
                    actions.permisos("TRN004", "deleteTRN");
                    actions.permisos("ORD004", "deleteORD");
                    actions.permisos("TAS004", "deleteTAS");
                    actions.permisos("CON004", "deleteCON");
                    actions.permisos("REP004", "deleteREP");
                    actions.permisos("CAJA004", "deleteCaja");
                    actions.permisos("SIS004", "deleteSIS");
                    actions.permisos("CHICA004", "deleteCHICA");
                    actions.permisos("FILEDEL", "deleteFILE");

                    actions.permisos("TES001", "tesoroNAC");
                    actions.permisos("TES002", "tesoroDIV");

                    let url2 = BASE_URL + "/notificaciones/all";
                    let url3 = BASE_URL + "/notificaciones/allPush";
                    if (store.visualizacionSIS) {
                        url2 = BASE_URL + "/notificaciones/allAdmin";
                        url3 = BASE_URL + "/notificaciones/allPushAdmin";
                    }

                    let notificaciones = fetch(url2, {
                        method: "POST",
                        headers: { "Content-Type": "application/json", "Authorization": token },
                        body: JSON.stringify({
                            OPCompania: store.user.JRCompaniaAut[0],
                            OPNumTrader: store.user.JRNumTrader
                        })
                    });
                    //Los campos que envía notificaciones3 son distintos a notificaciones, NO MODIFICAR
                    let notificaciones3 = [];

                    if (store.visualizacionOPE) {
                        notificaciones3 = fetch(url3, {
                            method: "POST",
                            headers: { "Content-Type": "application/json", "Authorization": token },
                            body: JSON.stringify({
                                NCompania: store.user.JRCompaniaAut[0],
                                NTrader: store.user.JRNumTrader
                            })
                        });
                    }
                    let notificaciones4 = [];
                    if (store.editarCUM || store.visualizacionSIS) {
                        notificaciones4 = fetch(url3, {
                            method: "POST",
                            headers: { "Content-Type": "application/json", "Authorization": token },
                            body: JSON.stringify({
                                NCompania: store.user.JRCompaniaAut[0],
                                NTrader: "Cumplimiento"
                            })
                        });
                    }

                    let notificaciones5 = [];
                    if (store.tesoroDIV || store.tesoroNAC || store.visualizacionCaja) {
                        notificaciones5 = fetch(url3, {
                            method: "POST",
                            headers: { "Content-Type": "application/json", "Authorization": token },
                            body: JSON.stringify({
                                NCompania: store.user.JRCompaniaAut[0],
                                NTrader: "Tesoreria"
                            })
                        });
                    }

                    let notificaciones6 = [];

                    notificaciones6 = fetch(url3, {
                        method: "POST",
                        headers: { "Content-Type": "application/json", "Authorization": token },
                        body: JSON.stringify({
                            NCompania: store.user.JRCompaniaAut[0],
                            NTrader: store.user.JRUsuario
                        })
                    });

                    [notificaciones, notificaciones3, notificaciones4, notificaciones5, notificaciones6] = await Promise.all([
                        notificaciones,
                        notificaciones3,
                        notificaciones4,
                        notificaciones5,
                        notificaciones6
                    ])

                    let notificacionesParse = await notificaciones.json()
                    let notificacionesPushJ = store.visualizacionOPE || store.visualizacionSIS ? await notificaciones3.json() : [];
                    let notificacionesPushCUM = store.editarCUM || store.visualizacionSIS ? await notificaciones4.json() : [];
                    let notificacionesPushTESORERIA = store.tesoroDIV || store.tesoroNAC || store.visualizacionCaja ? await notificaciones5.json() : [];
                    let notificacionesPushUsuario = store.visualizacion ? await notificaciones6.json() : []

                    notificacionesPushJ = notificacionesPushJ.concat(notificacionesPushCUM)
                    let filteredArray = new Set(notificacionesPushJ.map(JSON.stringify))
                    let arrSinDuplicaciones = Array.from(filteredArray).map(JSON.parse);

                    notificacionesPushJ = notificacionesPushJ.concat(notificacionesPushTESORERIA)
                    filteredArray = new Set(notificacionesPushJ.map(JSON.stringify))
                    arrSinDuplicaciones = Array.from(filteredArray).map(JSON.parse);

                    notificacionesPushJ = notificacionesPushJ.concat(notificacionesPushUsuario)
                    filteredArray = new Set(notificacionesPushJ.map(JSON.stringify))
                    arrSinDuplicaciones = Array.from(filteredArray).map(JSON.parse);

                    if (notificaciones.ok) {
                        setStore({ ...store, notificaciones: notificacionesParse });
                        //console.log(store.notificaciones)
                    }
                    //console.log(filteredArray);
                    setStore({ ...store, notificacionesPush: arrSinDuplicaciones });
                    //console.log(store.notificaciones)

                    return true;
                } else {
                    //actions.logOut();
                    return false;
                }
            } else {
                //actions.logOut();
                if (localStorage.getItem('token') != "" && localStorage.getItem('token') != undefined && localStorage.getItem('token')) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Sesión Terminada',
                        text: 'Ha expirado el tiempo de su sesión',
                        footer: '<a href="">Why do I have this issue?</a>'
                    })
                }

                return false;
            }
        },
        checkUser2: async () => {
            let url = BASE_URL + "/usuarios/check";

            let actions = getActions();
            let store = getStore();
            let login_data = {};
            let atCounter = false;
            let user_name = localStorage.getItem("username");
            let password = localStorage.getItem("password");
            let token = localStorage.getItem("token");

            for (let i = 0; i < user_name.length; i++) {
                if (atCounter) {
                    break;
                }
                if (user_name.charAt(i) == "@") {
                    atCounter = true;
                }
            }

            if (!atCounter) {
                login_data = {
                    username: user_name,
                    password: password
                };
            } else if (atCounter) {
                login_data = {
                    username: user_name,
                    password: password
                };
            }
            let response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json", "Authorization": token },
                body: JSON.stringify(login_data)
            });
            let userdata = await response.json();



            //actions.saveUserData(user);
            if (response.ok) {
                //let response2 = actions.checkUser();
                if (userdata.authorization == "Autorización validada SIFE") {
                    setStore({ ...store, auth: userdata });
                    store.user.JRPrograma = userdata.JRPrograma;
                    actions.permisos("CLI001", "visualizacion");
                    actions.permisos("CLI005", "visualizacionTOCLI");
                    actions.permisos("TRA001", "visualizacionTRA");
                    actions.permisos("TAS001", "visualizacionTAS");
                    actions.permisos("TRN001", "visualizacionTRN");
                    actions.permisos("ORD001", "visualizacionORD");
                    actions.permisos("BNC001", "visualizacionBNC");
                    actions.permisos("DIV001", "visualizacionDIV");
                    actions.permisos("USR001", "visualizacionUSR");
                    actions.permisos("SIS001", "visualizacionSIS");
                    actions.permisos("REP001", "visualizacionREP");
                    actions.permisos("OPE001", "visualizacionOPE");
                    actions.permisos("CON001", "visualizacionCON");
                    actions.permisos("CAJA001", "visualizacionCaja");

                    actions.permisos("CLI002", "crearCLI");
                    actions.permisos("USR002", "crearUSR");
                    actions.permisos("TRA002", "crearTRA");
                    actions.permisos("OPE002", "crearOPE");
                    actions.permisos("DIV002", "crearDIV");
                    actions.permisos("BNC002", "crearBNC");
                    actions.permisos("TRN002", "crearTRN");
                    actions.permisos("ORD002", "crearORD");
                    actions.permisos("TAS002", "crearTAS");
                    actions.permisos("CON002", "crearCON");
                    actions.permisos("REP002", "crearREP");

                    actions.permisos("CLI003", "editarCLI");
                    actions.permisos("CLI006", "editarStatusCLI");
                    actions.permisos("USR003", "editarUSR");
                    actions.permisos("TRA003", "editarTRA");
                    actions.permisos("OPE003", "editarOPE");
                    actions.permisos("DIV003", "editarDIV");
                    actions.permisos("BNC003", "editarBNC");
                    actions.permisos("TRN003", "editarTRN");
                    actions.permisos("ORD003", "editarORD");
                    actions.permisos("TAS003", "editarTAS");
                    actions.permisos("CON003", "editarCON");
                    actions.permisos("REP003", "editarREP");
                    actions.permisos("CUM001", "editarCUM");
                    actions.permisos("CAJA003", "editarCaja");

                    actions.permisos("CLI004", "deleteCLI");
                    actions.permisos("USR004", "deleteUSR");
                    actions.permisos("TRA004", "deleteTRA");
                    actions.permisos("OPE004", "deleteOPE");
                    actions.permisos("DIV004", "deleteDIV");
                    actions.permisos("BNC004", "deleteBNC");
                    actions.permisos("TRN004", "deleteTRN");
                    actions.permisos("ORD004", "deleteORD");
                    actions.permisos("TAS004", "deleteTAS");
                    actions.permisos("CON004", "deleteCON");
                    actions.permisos("REP004", "deleteREP");
                    actions.permisos("CAJA004", "deleteCaja");

                    actions.permisos("TES001", "tesoroNAC");
                    actions.permisos("TES002", "tesoroDIV");
                    return true;
                } else {
                    //actions.logOut();
                    return false;
                }
            } else {
                //actions.logOut();
                if (localStorage.getItem('token') != "" && localStorage.getItem('token') != undefined && localStorage.getItem('token')) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Sesión Terminada',
                        text: 'Ha expirado el tiempo de su sesión',
                        footer: '<a href="">Why do I have this issue?</a>'
                    })
                }

                return false;
            }
        },
        logOut: async () => {
            let token = localStorage.getItem("token");
            let url = BASE_URL + "/usuarios/logout";
            let response = await fetch(url, {
                method: "GET",
                headers: { "Content-Type": "application/json", "Authorization": token },
                //body: JSON.stringify({test:"test"})
            });
            let userdata = await response.json();
            if (response.ok) {
                //alert(userdata.message);
                Swal.fire({
                    icon: 'error',
                    title: 'Session closed successfully',
                    text: `${userdata.message}`,
                    timer: 3000,
                    showCloseButton: true,
                    position: 'center'
                })
            }
            console.log("cerrando sesión");
            setStore({
                user: {},
                users: [],
                logOutConfirmation: false,
                visualizacion: false,
                visualizacionTOCLI: false,
                visualizacionTRA: false,
                visualizacionTAS: false,
                visualizacionTRN: false,
                visualizacionORD: false,
                visualizacionBNC: false,
                visualizacionDIV: false,
                visualizacionUSR: false,
                visualizacionOPE: false,
                visualizacionCON: false,
                visualizacionREP: false,
                visualizacionSIS: false,
                visualizacionCaja: false,
                crearCLI: false,
                editarCLI: false,
                editarStatusCLI: false,
                deleteCLI: false,
                crearUSR: false,
                editarUSR: false,
                deleteUSR: false,
                crearTRA: false,
                editarTRA: false,
                editarCaja: false,
                deleteTRA: false,
                crearTAS: false,
                editarTAS: false,
                deleteTAS: false,
                crearBNC: false,
                editarBNC: false,
                deleteBNC: false,
                crearDIV: false,
                editarDIV: false,
                deleteDIV: false,
                deleteCaja: false,
                crearOPE: false,
                editarOPE: false,
                deleteOPE: false,
                crearCON: false,
                editarCON: false,
                deleteCON: false,
                tesoroNAC: false,
                tesoroDIV: false,
                editarCUM: false,
                auth: "",
                notificaciones: {},
                notificacionesPush: [],
            });
            localStorage.setItem("password", "");
            localStorage.setItem("id", "");
            localStorage.setItem("username", "");
            localStorage.setItem("logOutConfirmation", "");
            localStorage.setItem("picture", "");



        },
        permisos: async (permiso, variableEntidad) => {
            let store = getStore();
            let usuario = await store.user;

            let autorizacion = false

            for (let program of usuario.JRPrograma) {
                if (program.JRProgAut == permiso && program.JRTipoAut) {
                    //console.log(program.JRProgAut);
                    autorizacion = true;
                    setStore({ ...store, [variableEntidad]: autorizacion });
                    return autorizacion;
                }
            }
            setStore({ ...store, [variableEntidad]: false });
            return autorizacion;
        },
        verificarPermiso: async (permiso) => {
            let store = getStore();
            for (let program of store.user.JRPrograma) {
                if (program.JRProgAut == permiso && program.JRTipoAut) {
                    //console.log(program.JRProgAut);
                    return true;
                }
            }
            return false;
        },
        changePassword: async (endpoint, data) => {
            let url = BASE_URL + endpoint;
            let actions = getActions();
            let store = getStore();
            try {
                let response = await fetch(url, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json", "Authorization": localStorage.getItem("token") },
                    body: JSON.stringify(data)
                });
                let respuesta = await response.json();

                return respuesta;
            } catch (error) {
                console.log(error);
            }

            return true;
        },
        refresh: async () => {
            let actions = getActions();
            let store = getStore();
            setStore({
                user: {},
                users: [],
                logOutConfirmation: false,
                logOutConfirmationpoker: false,
                visualizacion: false,
                visualizacionTOCLI: false,
                visualizacionTRA: false,
                visualizacionTAS: false,
                visualizacionTRN: false,
                visualizacionORD: false,
                visualizacionBNC: false,
                visualizacionDIV: false,
                visualizacionUSR: false,
                visualizacionOPE: false,
                visualizacionCON: false,
                visualizacionREP: false,
                visualizacionSIS: false,
                visualizacionCaja: false,
                crearCLI: false,
                editarCLI: false,
                editarStatusCLI: false,
                deleteCLI: false,
                crearUSR: false,
                editarUSR: false,
                deleteUSR: false,
                crearTRA: false,
                editarTRA: false,
                editarCaja: false,
                deleteTRA: false,
                crearTAS: false,
                editarTAS: false,
                deleteTAS: false,
                crearBNC: false,
                editarBNC: false,
                deleteBNC: false,
                crearDIV: false,
                editarDIV: false,
                deleteDIV: false,
                deleteCaja: false,
                crearOPE: false,
                editarOPE: false,
                deleteOPE: false,
                crearCON: false,
                editarCON: false,
                deleteCON: false,
                tesoroNAC: false,
                tesoroDIV: false,
                editarCUM: false,
                auth: "",
                notificaciones: {},
                notificacionesPush: [],
            });
            localStorage.setItem("password", "");
            localStorage.setItem("id", "");
            localStorage.setItem("username", "");
            localStorage.setItem("logOutConfirmation", "");
            localStorage.setItem("picture", "");
        },
        login_qr_user: async (user_name, password) => {
            let url = BASE_URL2 + "/login-qr-user";
            let actions = getActions();
            let store = getStore();
            let login_data = {};
            let atCounter = false;

            for (let i = 0; i < user_name.length; i++) {
                if (atCounter) {
                    break;
                }
                if (user_name.charAt(i) == "@") {
                    atCounter = true;
                }
            }

            if (!atCounter) {
                login_data = {
                    username: user_name,
                    password: password
                };
            } else if (atCounter) {
                login_data = {
                    username: user_name,
                    password: password
                };
            }
            let response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(login_data)
            });
            let userdata = await response.json();

            //actions.saveUserData(user);
            if (response.ok) {
                //let response2 = actions.checkUser();
                if (response.ok) {
                    setStore({ ...store, userqr: userdata });
                    setStore({ ...store, logOutConfirmation: true });
                    localStorage.setItem("usernameqr", userdata.username); //revisar
                    //localStorage.setItem("password", userdata.JRClave);
                    localStorage.setItem("tokenqruser", userdata.token);
                    localStorage.setItem("logOutConfirmationqruser", true);
                    //actions.getUsers();
                    /* actions.getTablas();
                    actions.getCtl();
                    actions.checkUser(); */
                    return true;
                } else {
                    //actions.logOut();
                    alert("username or password incorrect");
                    return false;
                }
            } else {
                //actions.logOut();
                alert("username or password invalid");
                return false;
            }
        },
        login_poker_user: async (user_name, password) => {
            let url = BASE_URL2 + "/login-poker-user";
            let actions = getActions();
            let store = getStore();
            let login_data = {};
            let atCounter = false;

            for (let i = 0; i < user_name.length; i++) {
                if (atCounter) {
                    break;
                }
                if (user_name.charAt(i) == "@") {
                    atCounter = true;
                }
            }

            if (!atCounter) {
                login_data = {
                    username: user_name,
                    password: password
                };
            } else if (atCounter) {
                login_data = {
                    username: user_name,
                    password: password
                };
            }
            let response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(login_data)
            });
            let userdata = await response.json();

            //actions.saveUserData(user);
            if (response.ok) {
                //let response2 = actions.checkUser();
                if (response.ok) {
                    setStore({ ...store, userpoker: userdata });
                    setStore({ ...store, logOutConfirmationpoker: true });
                    localStorage.setItem("usernamepoker", userdata.username); //revisar
                    //localStorage.setItem("password", userdata.JRClave);
                    localStorage.setItem("tokenpokeruser", userdata.token);
                    localStorage.setItem("namepokeruser", userdata.name);
                    localStorage.setItem("tableID", userdata["table_id"]);
                    localStorage.setItem("logOutConfirmationpokeruser", true);
                    //actions.getUsers();
                    /* actions.getTablas();
                    actions.getCtl();
                    actions.checkUser(); */
                    return true;
                } else {
                    //actions.logOut();
                    alert("username or password incorrect");
                    return false;
                }
            } else {
                //actions.logOut();
                alert("username or password invalid");
                return false;
            }
        },
        logOut2: async () => {
            let token = localStorage.getItem("token");
            let url = BASE_URL2 + "/logout-qr-user";
            let response = await fetch(url, {
                method: "GET",
                headers: { "Content-Type": "application/json", "Authorization": token },
                //body: JSON.stringify({test:"test"})
            });
            let userdata = await response.json();
            if (response.ok) {
                //alert(userdata.message);
                Swal.fire({
                    icon: 'error',
                    title: 'Session closed successfully',
                    text: `${userdata.message}`,
                    timer: 3000,
                    showCloseButton: true,
                    position: 'center'
                })
            }
            console.log("cerrando sesión");
            setStore({
                user: {},
                users: [],
                logOutConfirmation: false,
                visualizacion: false,
                visualizacionTOCLI: false,
                visualizacionTRA: false,
                visualizacionTAS: false,
                visualizacionTRN: false,
                visualizacionORD: false,
                visualizacionBNC: false,
                visualizacionDIV: false,
                visualizacionUSR: false,
                visualizacionOPE: false,
                visualizacionCON: false,
                visualizacionREP: false,
                visualizacionSIS: false,
                visualizacionCaja: false,
                crearCLI: false,
                editarCLI: false,
                editarStatusCLI: false,
                deleteCLI: false,
                crearUSR: false,
                editarUSR: false,
                deleteUSR: false,
                crearTRA: false,
                editarTRA: false,
                editarCaja: false,
                deleteTRA: false,
                crearTAS: false,
                editarTAS: false,
                deleteTAS: false,
                crearBNC: false,
                editarBNC: false,
                deleteBNC: false,
                crearDIV: false,
                editarDIV: false,
                deleteDIV: false,
                deleteCaja: false,
                crearOPE: false,
                editarOPE: false,
                deleteOPE: false,
                crearCON: false,
                editarCON: false,
                deleteCON: false,
                tesoroNAC: false,
                tesoroDIV: false,
                editarCUM: false,
                auth: "",
                notificaciones: {},
                notificacionesPush: [],
            });
            localStorage.setItem("password", "");
            localStorage.setItem("id", "");
            localStorage.setItem("username", "");
            localStorage.setItem("logOutConfirmation", "");
            localStorage.setItem("picture", "");



        },
    }
}
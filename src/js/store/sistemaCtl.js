export const sistemaStore = {
    ctlsis: [],
    Log:[]
}

export function sistemaActions(getStore, getActions, setStore) {
    const BASE_URL = process.env.BASE_URL;
    const BASE_URL2 = process.env.BASE_URL2;
    return {
        getCtl: async () => {
            let url = BASE_URL + "/ctlSistema/alldata";
            let actions = getActions();
            let store = getStore();
            try {
                //console.log(url);
                let response = await fetch(url, {
                    method: "GET",
                    headers: { "Content-Type": "application/json", "Authorization":localStorage.getItem("token") },
                    //body: JSON.stringify(data)
                });
                let info = await response.json();
                //console.log(info);
                setStore({...store, ctlsis: info });
                //console.log(store.ctlsis);
                return store.ctlsis;
            } catch (error) {
                console.log(error);
            }

            return true;
        },
        getTablas: async () => {
            let actions = getActions();
            let store = getStore();
            let endpoint = "/tablas/alldata";
            let data = { RTCompania: store.user.JRCompania };
            let url = BASE_URL + endpoint;

            try {
                let response = await fetch(url, {
                    method: "POST",
                    headers: { "Content-Type": "application/json", "Authorization":localStorage.getItem("token")  },
                    body: JSON.stringify(data)
                });
                let respuesta = await response.json();
                //console.log("Información obtenida");
                //console.log(respuesta);
                //setStore({variableKey: respuesta});
                setStore({ ...store, tablas: respuesta });
                return respuesta;
            } catch (error) {
                console.log(error);
            }

            return true;
        },
        getLog: async ()=>{
            let actions = getActions();
            let store = getStore();
            let endpoint = "/log/alldataTecnico";
            let data = { RTCompania: store.user.JRCompania };
            let url = BASE_URL + endpoint;

            try {
                let response = await fetch(url, {
                    method: "POST",
                    headers: { "Content-Type": "application/json", "Authorization":localStorage.getItem("token")  },
                    body: JSON.stringify(data)
                });
                let respuesta = await response.json();
                //console.log("Información obtenida");
                console.log(respuesta);
                //setStore({variableKey: respuesta});
                setStore({ ...store, Log: respuesta });
                return respuesta;
            } catch (error) {
                console.log(error);
            }

            return true;
        }
    }
}


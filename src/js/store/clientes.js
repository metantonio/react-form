export const clientesStore = {
    clientes: [],
    dataExportadaCliente: {},
}

export function clientesActions(getStore, getActions, setStore) {
    const BASE_URL = process.env.BASE_URL;
    const BASE_URL2 = process.env.BASE_URL2;
    return {
        getClientes: async () => {
            let url = BASE_URL + "/clientes/alldata";
            let actions = getActions();
            let store = getStore();
            try {
                console.log(url);
                let response = await fetch(url, {
                    method: "GET",
                    headers: { "Content-Type": "application/json", "Authorization":localStorage.getItem("token")  },
                    body: JSON.stringify(data)
                });
                let listClients = await response.json();
                //console.log(listClients);
                setStore({ ...store, clientes: listClients });
                return store.clientes;
            } catch (error) {
                console.log(error);
            }

            return true;
        },
    }
}
import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Redirect, useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
import "../../styles/logadmin.css";

// The array of objects in JSON format
/* const data = [
    {
        user: "iguevara",
        date: "2023-02-23T12:47:24.078Z",
        IP: "192.168.70.24",
        endpoint: "/usuarios/login",
        month: "2",
        year: "2023"
    }
    // ... other objects
]; */

// The component that renders a table of filtered data
const FilterTable = () => {
    // The state variables for storing the filter values
    const [data, setData] = useState([{
        user: "ejemplo",
        date: "2023-02-23T12:47:24.078Z",
        IP: "192.168.0.0",
        endpoint: "/usuarios/login",
        month: "1",
        year: "2023"
    }])
    const [userFilter, setUserFilter] = useState("");
    const [dateFilter, setDateFilter] = useState("");
    const [monthFilter, setMonthFilter] = useState("");
    const [yearFilter, setYearFilter] = useState("");
    const [endpointFilter, setEndpointFilter] = useState("");
    const { store, actions } = useContext(Context);

    // Variables de Estado para ordenar la data por cada columna
    const [userSortOrder, setUserSortOrder] = useState("asc");
    const [dateSortOrder, setDateSortOrder] = useState("asc");
    const [monthSortOrder, setMonthSortOrder] = useState("asc");
    const [yearSortOrder, setYearSortOrder] = useState("asc");
    const [endpointSortOrder, setEndpointSortOrder] = useState("asc");

    const history = useHistory("");

    const volverLogin = () => {
        actions.logOut();
        return history.push("/");
    };



    // The function that filters the data based on the filter values
    const filterData = () => {
        return data.filter(
            (obj) =>
                obj.user.includes(userFilter) &&
                obj.date.includes(dateFilter) &&
                obj.month.includes(monthFilter) &&
                obj.year.includes(yearFilter) &&
                obj.endpoint.includes(endpointFilter)
        );
    };

    // The function that renders a table row for each object in the filtered data
    const renderTableRow = (obj) => {
        return (
            <tr key={obj.date} name={obj.date} className="filter-row">
                <td>{obj.user}</td>
                <td>{new Date(obj.date).toLocaleString("es-VE", { timeZone: "America/Caracas" })}</td>
                <td>{obj.IP}</td>
                <td>{obj.endpoint}</td>
                <td>{obj.month}</td>
                <td>{obj.year}</td>
            </tr>
        );
    };

    // The function that renders the input fields for each filter value
    const renderInputField = (label, value, setValue) => {
        return (
            <div className="input-field">
                <label htmlFor={label}>{label}</label>
                <input
                    id={label}
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
            </div>
        );
    };

    // The function that sorts an array of objects based on a key and an order (asc or desc)
    // It also uses localeCompare() to handle different languages
    const sortDataByKeyAndOrder = (array, key, order) => {
        return array.sort((a, b) => {
            if (order === 'asc') {
                return a[key].localeCompare(b[key]);
            } else {
                return b[key].localeCompare(a[key]);
            }
        });
    };

    // The function that sorts an array of objects based on a key and toggles the order (asc or desc)
    // It also updates the corresponding state variable for storing the order
    const sortDataByKeyAndToggleOrder = (array, key) => {
        let order;
        switch (key) {
            case 'user':
                order = userSortOrder === 'asc' ? 'desc' : 'asc';
                setUserSortOrder(order);
                break;
            case 'date':
                order = dateSortOrder === 'asc' ? 'desc' : 'asc';
                setDateSortOrder(order);
                break;
            case 'month':
                order = monthSortOrder === 'asc' ? 'desc' : 'asc';
                setMonthSortOrder(order);
                break;
            case 'year':
                order = yearSortOrder === 'asc' ? 'desc' : 'asc';
                setYearSortOrder(order);
                break;
            case 'endpoint':
                order = endpointSortOrder === 'asc' ? 'desc' : 'asc';
                setEndpointSortOrder(order);
                break;
        }
        return sortDataByKeyAndOrder(array, key, order);
    };

    useEffect(() => {
        async function cargaDatos() {
            let response = await actions.getLog()
            return response
        }
        cargaDatos()

    }, [])

    useEffect(() => { //este useEffect configurará los estilos según caso del endpoint
        if (store.Log) {
            setData(store.Log)
            let prueba = store.Log && store.Log.length > 0 ? store.Log.map((item, index) => {
                {
                    let result = ""
                    let itemLI = document.querySelector(`[name="${item.date}"]`);
                    //console.log(itemLI)
                    if (itemLI) {
                        //itemLI.classList.add("list-group-item") //el genérico
                        switch (true) {
                            case item.endpoint.toLowerCase().trim().includes("login"):
                                itemLI.classList.add("table-success")
                                return result
                                break;
                            case item.endpoint.toLowerCase().trim().includes("logout"): //logout en gris con secondary
                                itemLI.classList.add("table-secondary")
                                return result
                                break;
                            case item.endpoint.toLowerCase().trim().includes("register"): //los tipo registro deberían ser azules con primary
                                itemLI.classList.add("table-primary")
                                return result
                                break;
                            case item.endpoint.toLowerCase().trim().includes("delete"): //los tipo delete deberían ser rojos con danger
                                itemLI.classList.add("table-danger")
                                return result
                                break;
                            case item.endpoint.toLowerCase().trim().includes("revertir"): //los tipo revertir deberían ser rojos con danger
                                itemLI.classList.add("table-danger")
                                return result
                                break;
                            case item.endpoint.toLowerCase().trim().includes("update"): //los tipo update deberían ser amarillos con warning
                                itemLI.classList.add("table-warning")
                                return result
                                break;
                            case item.endpoint.toLowerCase().trim().includes("alldata"): //los tipo alldata deberían ser celestes con info
                                itemLI.classList.add("table-info")
                                return result
                                break;
                            default:
                                itemLI.classList.add("table-light")
                                return result
                                break;
                        }
                        return result
                    }

                }
            }) : ""
        }

    }, [store.Log, data, userSortOrder, dateSortOrder, endpointSortOrder])
    // The JSX that renders the component
    return (
        <div className="contenedor ml-4 px-4 registro justify-content-between">
            {store.visualizacionSIS ?
                <div className="filter-table">
                    {/* Render the input fields for each filter value */}
                    {renderInputField("user", userFilter, setUserFilter)}
                    {renderInputField("date", dateFilter, setDateFilter)}
                    {renderInputField("month", monthFilter, setMonthFilter)}
                    {renderInputField("year", yearFilter, setYearFilter)}
                    {renderInputField("endpoint", endpointFilter, setEndpointFilter)}

                    {/* Render the table of filtered data */}
                    <table className="table table-hover table-sm align-middle">
                        <thead className="table-light">
                            <tr>
                                <th>User 
                                    <button
                                    className="btn btn-primary btn-sm" 
                                    onClick={() => { sortDataByKeyAndToggleOrder(data,"user") }}>
                                        {userSortOrder}
                                    </button>
                                </th>
                                <th>Date 
                                <button
                                    className="btn btn-primary btn-sm" 
                                    onClick={() => { sortDataByKeyAndToggleOrder(data,"date") }}>
                                        {dateSortOrder}
                                    </button>
                                </th>
                                <th>IP</th>
                                <th>Endpoint
                                <button
                                    className="btn btn-primary btn-sm" 
                                    onClick={() => { sortDataByKeyAndToggleOrder(data,"endpoint") }}>
                                        {endpointSortOrder}
                                    </button>
                                </th>
                                <th>Month(número)</th>
                                <th>Year</th>
                            </tr>
                        </thead>

                        {/* Filter the data and render a table row for each object */}
                        <tbody>{filterData().map(renderTableRow)}</tbody>


                    </table>


                </div>
                :
                volverLogin()}

        </div>
    );
};

export default FilterTable;
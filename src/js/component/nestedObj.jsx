import React, { useState, useEffect } from "react";

// A React component that uses visit() to create an array of Dropdown components
const NestedObj = (props) => {
    const [listaObj, setListaObj] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [value, setValue] = useState(null);

    let data = [];

    // Una función que visita cada valor del objeto y llama una función callback de regreso
    function visit(obj, callback) {
        //console.log("type of: ", typeof(obj))
        if (typeof obj !== "object" || obj === null || Array.isArray(obj)) {
            // es caso que no sea un objeto ejecuta la función que se le coloque como callback y le pasa obj
            callback(obj);
        } else {
            // En caso que sea objeto el hijo, lo recorre
            for (let key in obj) {
                visit(obj[key], callback);
            }
        }
    }

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const dropDownTest = (arr) => {
        return (
            <select value={value} onChange={handleChange}>
                {arr.map((option, index) => (
                    <option className="dropdown-item" key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        );
    }

    visit(props.data, (val) => {
        //console.log(typeof(val))
        if (Array.isArray(val)) {
            // Create a Dropdown component for each array value
            //data.push(<Dropdown options={val} />);
            //setListaObj(prev => [...prev, <Dropdown options={val} />])
            //console.log("es Array: ", val)
            data.push(dropDownTest(val));
        } else if (typeof val !== "object") {
            // Wrap any non-object value inside <p>
            data.push(<p>{val}</p>);
            //setListaObj(prev => [...prev, <p>{val}</p>])
        }


        // Ignore object values as they will be visited recursively
    })


    useEffect(() => { console.log(value) }, [value])
    useEffect(() => { console.log(listaObj) }, [listaObj])    
    useEffect(() => { setListaObj(data) }, [refresh])

    return (
        <div>
            <button className="btn btn-primary btn-sm h-76" onClick={() => { setRefresh(!refresh) }}>Refrescar</button>
            {listaObj && listaObj.length > 0 ?
                listaObj.map((item, index) => {
                    return (
                        <div key={index}>
                            {item}
                        </div>
                    )
                })
                : "No hay data"}
        </div>)
}

export default NestedObj

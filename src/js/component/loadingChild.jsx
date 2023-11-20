import React, { Suspense, lazy, useEffect, useState, useLayoutEffect } from "react";
import { Spinner } from "reactstrap";
import Swal from "sweetalert2";

function LoadingChild(props) {

    useLayoutEffect(() => {
        console.time("loading")
        //console.log("propsini:", props.carga)
        props.setCarga((prevState) => {
            console.log(prevState)
            props.setCarga(!true)
        }
        )
        //props.carga=true
        console.log("veces que recarga dentro del loading, propfin:", props.carga)
        return () => {
            
            console.log("fin del componente")
        }
    }, [])

    useLayoutEffect(() => { 
        console.log(props.carga)
        console.log("console del layoutEffect")
     }, [props.carga])

    return (
        <>
            <Suspense fallback={
                <div className="d-flex justify-content-center">
                    <Spinner color="danger" />
                </div>
            }>
                {props.componente}
            </Suspense>

        </>
    )
}
export default LoadingChild;
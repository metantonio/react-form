import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import { Redirect, useHistory } from "react-router-dom";
import "../../../styles/login.css";
import logo from "../../../img/logobyn.png";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
//import { useStateValue } from "../store/stateProvider";
//import { auth, provider } from "../store/firebase";
//import { actionTypes } from "../store/reducer";

const Loginqruser = () => {
    //const [state, dispatch] = useStateValue();
    const { store, actions } = useContext(Context);
    const history = useHistory("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [qrCode, setQrCode] = useState(false)
    const login = async e => {
        e.preventDefault();
        const succes = await actions.login_qr_user(userName, password);
        if (succes) {
            //history.push("/menu");
            setQrCode(store.userqr.qr_image)
            Swal.fire({                
                icon: 'success',
                title: `Welcome: ${store.userqr.username}`,
                showConfirmButton: false,
                timer: 2000
              })
            history.push("/iq-sms");
        }
    };
    const signup = async e => {
        e.preventDefault();
        //const succes = await actions.login_qr_user(userName, password);
        history.push("/signup");
    };
    const reset = async (e) => {
        e.preventDefault();
        if (userName.includes("@") == false) {
            alert("Invalid email");
            return
        }
        let data = {
            JREmail: userName
        }
        if (userName == "") {
            alert("Write your email");
            return
        }
        console.log("validating")
        const response = await fetch(process.env.BASE_URL2 + "/new_password", {
            method: "PUT",
            //mode: "no-cors",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({email:userName})
        });
        //console.log(response)
        //alert(response)
        let respuesta = await response.json();
        //console.log("Información obtenida");
        //console.log(respuesta);
        Swal.fire({                
            icon: 'danger',
            title: `Error: ${respuesta.message}`,
            showConfirmButton: true,
            timer: 2000
          })
        return respuesta;
    };
    const [showPass, setShowPassword] = useState(true);

    const togglePasswordVisiblity = () => {
        const { isPasswordShown } = showPass;
        setShowPassword({ isPasswordShown: !isPasswordShown });
    };
    const { isPasswordShown } = showPass;

    useEffect(()=>{
        window.scrollTo(0, 0);
    },[])
    return (
        <div className="login background-login">
            {!qrCode? <div className="login__container">
                <Link to="/">
                    <img src={logo} className="login__img" alt="" />
                </Link>
                <h1></h1>
                <input
                    className="sign-input text-dark"
                    type="email"
                    placeholder="Email/Username"
                    id="email"
                    name="email"
                    onChange={e => setUserName(e.target.value)}
                />
                <br></br>
                <div className="wrap-input100 validate-input">
                    <input
                        className="sign-input text-dark"
                        placeholder="Password"
                        type={isPasswordShown ? "text" : "password"}
                        id="passlogin"
                        onKeyPress={(event) => {
                            if (event.key === "Enter") {
                                login(event)
                            }
                        }}
                        onChange={e => {
                            setPassword(e.target.value)
                        }}
                    />
                    <i
                        className="fa fa-eye password-icon"
                        onClick={togglePasswordVisiblity}
                    />
                </div>
                <div className="sign-in-buttons">
                    <button className="cta-select" onClick={login} >
                        {" "}
                        Sign In
                    </button>
                </div>
                {/* <div className="sign-in-buttons">
                    <button className="cta-select" onClick={signup} >
                        {" "}
                        Sign Up
                    </button>
                </div> */}
                <div className="sign-in-buttons">
                    <button className="cta-select" onClick={reset} >
                        {" "}
                        Forgot Password
                    </button>
                </div>
            </div>: 
            <><img src={`data:image/png;base64,${qrCode}`} alt="QR Code" /></>
            }
            
        </div>
    );
}
export default Loginqruser;

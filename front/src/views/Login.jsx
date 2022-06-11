import React from "react";
import Button from "../components/Button";
import "../styles/Login.css";
import Checkbox from "../components/Checkbox";
import ShowPassword from "../components/ShowPassword";
import { Link } from "react-router-dom";
import { useState } from "react";

import { useForm } from "react-hook-form";

export default function Login() {


  /* https://morioh.com/p/eeabca3e49d4 pagina de esta info */
  /*   handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }
 
  handleSubmit = (event) => {
    alert('A form was submitted: ' + this.state);
 
    fetch('http://localhost:8080/api/user/login', {
        method: 'POST',
        // We convert the React state to JSON and send it as the POST body
        body: JSON.stringify(this.state)
      }).then(function(response) {
        console.log(response)
        return response.json();
      });
 
    event.preventDefault();
} */

  const { register, handleSubmit } = useForm();

  const onSubmit = (userInfo) => console.log(userInfo);

  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const messages = {
    req: "Este campo es obligatorio",
    email: "Debes introducir una dirección correcta",
    password: "La contraseña no debe ser menor a 8 ni mayor a 20 caractéres",
  };

  const patterns = {
    name: /^[A-Za-z]+$/i,
    email:
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
  };

  const {
    formState: { errors },
  } = useForm(/* { mode: "onChange" } */);

  console.log(errors);
  return (
    <div className="main">
      <section className="boxContainer">
        <div className="containerLogo">
          <div className="Logo">
            <img src="./img/Sakura_Beauty-sinFondo2.svg" alt="Logo" />
          </div>
        </div>
        <section className="mainLogin">
          <div className="buttonsLoginRegister">
            <nav className="navLogin">
              <ul>
                <li>
                  <Link to={"/login"}>
                    INICIAR SESIÓN
                  </Link>
                </li>
                <li>
                  <Link to={"/register"}>
                    REGISTRARSE
                  </Link>
                </li>
              </ul>
            </nav>
            
          </div>
          <form
            action="http://localhost:8080/api/user/login"
            method="post"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="inputs">
              <div className="icon">
                <img src="./img/icons/Account.svg" alt="icon" />
              </div>
              <input
                type="text"
                placeholder="Email"
                name="email"
                {...register("email", {
                  required: messages.required,
                  pattern: {
                    value: patterns.email,
                    message: messages.email,
                  },
                })}
              />
            </div>
            <h4>{errors.email && errors.email.message}</h4>

            <div className="inputs">
              <div className="icon">
                <img src="./img/icons/lock.svg" alt="icon" />
              </div>
              <input
                type="password"
                placeholder="Contraseña"
                id="password"
                name="password"
                {...register("password", {
                  required: messages.required,
                  minLength: {
                    value: 8,
                    message: messages.password,
                  },
                  maxLength: {
                    value: 20,
                    message: messages.password,
                  },
                })}
              />
              <div className="icon">
                <ShowPassword />
              </div>
            </div>
            <Checkbox
              label={"Recordarme"}
              id={"rememberMe"}
              name={"rememberMe"}
              handler={{ ...register("rememberMe") }}
            />

            <Button info={"INICIAR SESIÓN"} />
          </form>

          <div className="separation">
            <div className="line"></div>
            <p>ó</p>
            <div className="line"></div>
          </div>

          <div className="socialNetworks">
            <img src="./img/icons/Facebook.svg" alt="icon" />
            <img src="./img/icons/Google.svg" alt="icon" />
          </div>

          <div className="optionsLogin">
            <Link to={"/forgotPassword"}>
              <p>¿Olvidaste tu contraseña?</p>
            </Link>
            <div className="lineVertical"></div>
            <Link to={"/register"}>
              <p>Registrarse</p>
            </Link>
          </div>
        </section>
      </section>
    </div>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Login.css';
import '../styles/Register.css';

import Button from '../components/Button';
import Checkbox from '../components/Checkbox';
import ShowPassword from '../components/ShowPassword';

export default function Register() {
  return (
    <div className="main">
      <div className="Logo">
        <img src="./img/Sakura_Beauty-sinFondo2.svg" alt="Logo" />
      </div>
      <section className="mainLogin">
        <form action="http://localhost:8080/api/user/register" method="POST">

          <div className="inputs">
            <div className="icon">
              <img src="./img/icons/Account.svg" alt="icon" />
            </div>
            <input type="text" placeholder="Usuario" name="user" />
          </div>

          <div className="inputs">
            <div className="icon">
              <img src="./img/icons/Email.svg" alt="icon" />
            </div>
            <input type="text" placeholder="Email" name="email" />
          </div>

          <div className="inputs">
            <div className="icon">
              <img src="./img/icons/lock.svg" alt="icon" />
            </div>
            <input
              type="password"
              placeholder="Contraseña"
              id="password"
              name="password"
            />
            <div className="icon">
              <ShowPassword />
            </div>
          </div>

          <div className="inputs">
            <div className="icon">
              <img src="./img/icons/lock.svg" alt="icon" />
            </div>
            <input
              type="password"
              placeholder="Confirmar contraseña"
              id="password"
              name="repassword"
            />
            <div className="icon">
              <ShowPassword />
            </div>
          </div>

          <Button info={"REGISTRARSE"} />
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

        <div className="optionsRegister">
            <p>¿Ya tienes una cuenta?</p>
          <Link to={"/login"}>
            <p><b>Iniciar sesión</b></p> 
          </Link>
        </div>
      </section>
    </div>
  );
}

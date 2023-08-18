import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
// import { Recuperar } from "./recuperar";
import { LoginyRegistro } from "./login&register";
import { Carrito } from "../pages/carrito";
import { Contacto } from "./contacto";

export const Navbar = () => {
  const { store, actions } = useContext(Context);

  const navigate = useNavigate();

  const [mostrarLoginyRegistro, setMostrarLoginyRegistro] = useState(false);
  const [mostrarContacto, setMostrarContacto] = useState(false);

  const handleMostrarLoginyRegistro = () => {
    setMostrarLoginyRegistro(true);
  };

	const handleMostrarContacto = () => {
    setMostrarContacto(true);
  };



  return (
	<div>
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <div className="ml-auto d-flex">
          <button
            type="button"
            className="btn btn-primary me-2"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            onClick={handleMostrarLoginyRegistro}
          >
            Ingresar o Registrarse
          </button>
          {<LoginyRegistro />}
          <button
            type="button"
            className="btn btn-secondary me-2"
            onClick={(e) => navigate("/carrito")}
          >
            Carrito
          </button>
		  <button
            type="button"
            className="btn btn-secondary"
            onClick={handleMostrarContacto}
          >
            Contacto
          </button>
		  
        </div>
      </div>
    </nav>
	{mostrarContacto && <Contacto/>}
	</div>
	
  );
};

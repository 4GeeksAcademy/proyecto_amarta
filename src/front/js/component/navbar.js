import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
// import { Recuperar } from "./recuperar";
import { LoginyRegistro } from "./login&register";
import { Carrito } from "../pages/carrito";
import { Contacto } from "./contacto";
import amartaLogoNegro from "../../img/logoAMARTAnegro.png";
import amartaLogoBlanco from "../../img/logoAMARTAblanco.png"

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
    <nav className="navbar navbar-expand bg-body-tertiary bg-body bg-opacity-25 border-bottom border-3">
      <div className="container-fluid row text-center">
        <span className=" col-xl-3 col-sm-1 nav-item"></span>
        <button
          type="button"
          className="btn bg-transparent rounded col-xl-1 col-sm-2 nav-item text-light"
          onClick={() => navigate("/catalogo")}
        >
          Catálogo
        </button>
        <button
          type="button"
          className="btn bg-transparent rounded col-xl-1 col-sm-2 nav-item text-light"
          onClick={handleMostrarContacto}
        >
          Contacto
        </button>
        <Link className="nav-item col-md-2 col-lg-2 col-xl-2 col-sm-1" to={"/"}>
          <img src={amartaLogoNegro} alt="AMARTA" width="175" height="35"></img>
        </Link>
        <button
          type="button"
          className="btn nav-item text-light col-xl-1 col-sm-2"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          onClick={handleMostrarLoginyRegistro}
        >
          cuenta
        </button>

        <button
          type="button"
          className="btn col-xl-1 col-sm-2 nav-item text-light"
          onClick={(e) => navigate("/carrito")}
        >
          Carrito
        </button>
        {<LoginyRegistro />}
        <span className="col-xl-3 col-sm-1"></span>
      </div>
      {mostrarContacto && <Contacto />}
    </nav>

  );
};

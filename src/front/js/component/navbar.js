import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
// import { LoginyRegistro } from "./login&register";
import { Carrito } from "../pages/carrito";
import { Contacto } from "../pages/contacto";
import { Catalogo } from "../pages/catalogo";
import amartaLogoNegro from "../../img/logoAMARTAnegro.png";
import amartaLogoBlanco from "../../img/logoAMARTAblanco.png"
import { Modal } from "react-bootstrap";
import "../../styles/navbar.css"
import Swal from 'sweetalert2'

export const Navbar = () => {
  const { store, actions } = useContext(Context);

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [mostrarLoginyRegistro, setMostrarLoginyRegistro] = useState(false);
  const [mostrarContacto, setMostrarContacto] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const Swal = require('sweetalert2')

  const handleMostrarLoginyRegistro = () => {
    setMostrarLoginyRegistro(true);
  };

  // const handleMostrarContacto = () => {
  //   setMostrarContacto(true);
  // };

  async function handleSubmitSignup(e) {
    e.preventDefault();
    console.log(email, password);

    let response = await actions.signup(name, apellidos, email, password);

    if (response.success) {
      setMostrarLoginyRegistro(false);
      navigate('/private');
    } else {
      setAlertMessage(response.errorMsg);
      setAlertType("danger");
    }
  }

  async function handleSubmitLogin(e) {
    e.preventDefault();
    console.log(email, password);

    let response = await actions.login(email, password);

    if (response.success) {
      setMostrarLoginyRegistro(false);
      navigate("/private");
    } else {
      setAlertMessage(response.errorMsg);
      setAlertType("danger");
    }
  }

async function handleRecuperar(e) {
  e.preventDefault();
  try {
    await actions.getContrasenya(email)
    Swal.fire('Revisa tu correo con la nueva contraseña')
    const comprobacion = store.correo_para_verificacion;

      if (comprobacion.msg ===  'La contraseña ha sido enviada') {
        Swal.fire('Revisa tu correo con la nueva contraseña');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'El correo no se encuentra registrado',
          text: 'Vuelve a intentarlo o regístrate.',
        });
      }
  } catch (error) {
    console.log(error);
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Ha ocurrido un error. Por favor, intenta de nuevo.',
    });
  }
  useEffect(() => {
    if (mostrarLoginyRegistro) {
      setAlertMessage("");
      setAlertType("");
    }
  }, [mostrarLoginyRegistro]);

}



  useEffect(() => {
    if (mostrarLoginyRegistro) {
      setAlertMessage(""); 
      setAlertType("");  
    }
  }, [mostrarLoginyRegistro]);


  return (
    <nav className="navbar navbar-expand bg-body-tertiary bg-light bg-opacity-50 border-bottom border-3 sticky-top">
      <div className="container-fluid row text-center">
        <span className=" col-xl-3 col-sm-1 nav-item"></span>
        <Link to={"/catalogo"} type="button" className="seleccionado bg-transparent rounded col-xl-1 col-sm-2 nav-item text-dark fw-bold ">Catálogo</Link>
        <Link to={"/contacto"} type="button" className="seleccionado bg-transparent rounded col-xl-1 col-sm-2 nav-item text-dark fw-bold ">Contacto</Link>
        <Link className="nav-item col-md-2 col-lg-2 col-xl-2 col-sm-1" to={"/"}>

          <img src={amartaLogoNegro} alt="AMARTA" width="175" height="35"></img>
        </Link>
        {store.logged ? <div className="dropdown dropdown-center col-xl-1 col-sm-2">
          <a className=" text-dark dropdown-toggle fw-bold active border-0 " href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Cuenta
          </a>

          <ul className="dropdown-menu list-unstyled dropdown-menu-start">
            <li><Link className="btn dropdown-item " to={"/private"}><i className="d-flex float-start  align-items-end fa-solid fa-user pt-1 mb-1"></i><p className="d-flex ps-3 mt-0">Perfil</p></Link></li>
            <li><button className="btn dropdown-item" onClick={() => {
              actions.logOut()
              navigate("/")
            }}><i className="d-flex float-start align-items-end fa-solid fa-arrow-right-from-bracket pt-1"></i><p className="d-flex ps-3 mt-0 mb-1">Log Out</p></button></li>
          </ul>
        </div>
          : <button
            type="button"
            className="seleccionado nav-item text-dark col-xl-1 col-sm-2 fw-bold border-0 bg-transparent "
            data-bs-toggle="modal"
            onClick={handleMostrarLoginyRegistro}
          >
            Cuenta
          </button>

        }
        <button
          type="button"
          className="seleccionado col-xl-1 col-sm-2 nav-item text-dark fw-bold  border-0 bg-transparent "
          onClick={(e) => navigate("/carrito")}
        >
          Carrito ({store.carrito.length === 0 ? "0" : store.carrito.length})
        </button>

        <span className="col-xl-3 col-sm-1"></span>
      </div>
      {mostrarContacto && <Contacto />}

      {/* MODAL LOGIN Y REGISTRO */}
      <Modal show={mostrarLoginyRegistro} tabIndex="-1" data-bs-target="exampleModal" id="exampleModal">
        <nav className="modal-dialog">
          <div className="modal-content fondoModal">
            <nav>
              <div
                className="modal-header nav nav-tabs justify-content-center border-0"
                id="nav-tab"
                role="tablist"
              >
                <button
                  type="button"
                  className="nav-link justify-content-center border-0 ms-5 me-5 bg-transparent"
                  id="nav-iniciarID-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-inicioSesion"
                  role="tab"
                  aria-selected="true"

                >
                  Iniciar Sesión
                </button>
                <button
                  type="button"
                  className="nav-link justify-content-center border-0 ms-5 bg-transparent"
                  id="nav-crearID-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-crearCuenta"
                  role="tab"
                  aria-selected="false"
                >

                  Registrarse
                </button>
                <button
                  type="button"
                  className="btn-close"
                  // data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => { setMostrarLoginyRegistro(false) }}
                ></button>
              </div>
            </nav>
            <div className="modal-body tab-content" id="nav-tabContent">
              {/* SECCION INICIO SESIÓN */}

              <form
                onSubmit={(e) => handleSubmitLogin(e)}
                className="tab-pane fade show active container"
                id="nav-inicioSesion"
                role="tabpanel"
                aria-labelledby="nav-iniciarID-tab"
              >
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                    placeholder="Ingresa tu correo"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Contraseña</label>
                  <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                    placeholder="Ingresa tu contraseña"
                    required
                  />
                </div>
                <button className="btn btn-dark mt-2 me-2">
                  {/* // onClick={closeModal}> */}
                  Iniciar Sesión
                </button>

                <button
                  className="btn btn-dark mt-2"
                  onClick={e => handleRecuperar(e)}
                >
                  Recuperar contraseña
                </button>
                {/* {mostrarRecuperar && <Recuperar />} */}
              </form>

              {/* SECCION CREAR NUEVA CUENTA */}
              <form
                onSubmit={(e) => handleSubmitSignup(e)}
                // data-bs-dismiss="modal"
                className="tab-pane fade container"
                id="nav-crearCuenta"
                role="tabpanel"
                aria-labelledby="nav-crearID-tab"
              >
                <div className="form-group">
                  <label>Nombre</label>
                  <input
                    type="string"
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                    placeholder="Ingresa tu nombre"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Apellidos</label>
                  <input
                    type="string"
                    onChange={(e) => setApellidos(e.target.value)}
                    className="form-control"
                    placeholder="Ingresa tus apellidos"
                    required
                  />
                </div>
                <div className="form-group ">
                  <label className="text-white">Email</label>
                  <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                    placeholder="Ingresa tu correo"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="text-white">Contraseña</label>
                  <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                    placeholder="Ingresa tu contraseña"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-dark mt-2">Crear cuenta</button>
              </form>

            </div>

          </div>
          <div className={`alert alert-${alertType} mt-3`} role="alert">
            {alertMessage}
          </div>

        </nav>
        {/* {mostrarRecuperar && <Recuperar />} */}
      </Modal>

    </nav>

  );
};

import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
// import { LoginyRegistro } from "./login&register";
import { Carrito } from "../pages/carrito";
import { Contacto } from "../pages/contacto";
import { Catalogo } from "../pages/catalogo";
import amartaLogoNegro from "../../img/logoAMARTAblanco.png";
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
      if (comprobacion.msg === 'La contraseña ha sido enviada') {
        Swal.fire({
          text: 'Revisa tu correo con la nueva contraseña',
          customClass: {
            confirmButton: 'btn bg-dark btn-secondary',
          },
          buttonsStyling: false,
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'El correo no se encuentra registrado',
          text: 'Vuelve a intentarlo o regístrate.',
          customClass: {
            confirmButton: 'btn bg-dark btn-secondary',
          },
          buttonsStyling: false,
        })
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ha ocurrido un error. Por favor, intenta de nuevo.',
        customClass: {
          confirmButton: 'btn bg-dark btn-secondary',
        },
        buttonsStyling: false,
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
    <nav className="navbar navbar-expand-lg bg-body-tertiary  border-bottom border-3 sticky-top color-navbar">
      <div className="container-fluid  m-6">
        <button class="navbar-toggler text-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <i className="fa-solid fa-bars"></i>
        </button>
        <Link className="nav-item logoAmartaNav" to={"/catalogo"}>
          <img src={amartaLogoNegro} alt="AMARTA" width="175" height="35"></img>
        </Link>

        <div className="collapse navbar-collapse  text-dark menu-burguer" id="navbarNavAltMarkup">
          <ul className="navbar-nav container-fluid justify-content-around ">
            <li >
              <Link to={"/catalogo"} type="button" className="seleccionado bg-transparent rounded nav-item text-white fw-bold" id="catalogo">Catálogo</Link>
            </li>
            <li className="nav-item ">
              <Link to={"/contacto"} type="button" className="seleccionado bg-transparent rounded nav-item text-white fw-bold font ">Contacto</Link>
            </li>

            <Link className="nav-item logoAmarta" to={"/catalogo"}>
              <img src={amartaLogoNegro} alt="AMARTA" width="175" height="35"></img>
            </Link>

            <li className="nav-item font">
              {store.logged ? <div className="dropdown dropdown-center ">
                <a className="text-media text-white dropdown-toggle fw-bold active border-0 " href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Cuenta
                </a>
                <ul className="dropdown-menu list-unstyled dropdown-menu-start">
                  <li><Link className="btn dropdown-item " to={"/private"}><i className="d-flex float-start  align-items-end fa-solid fa-user pt-1 mb-1"></i><p className="d-flex ps-3 mt-0 ">Perfil</p></Link></li>
                  <li><button className="btn dropdown-item" onClick={() => {
                    actions.logOut()
                    navigate("/")
                  }}><i className="d-flex float-start align-items-end fa-solid fa-arrow-right-from-bracket pt-1"></i><p className="d-flex ps-3 mt-0 mb-1 ">Cerrar sesión</p></button></li>
                </ul>
              </div>
                : <button
                  type="button"
                  className="seleccionado text-white fw-bold border-0 bg-transparent p-0"
                  data-bs-toggle="modal"
                  onClick={handleMostrarLoginyRegistro}>
                  Cuenta
                </button>
              }
            </li>
            <li className="nav-item font">
              <button
                type="button"
                className="seleccionado text-white fw-bold  border-0 bg-transparent p-0 "
                onClick={(e) => navigate("/carrito")}>
                Carrito ({store.carrito?.length === 0 ? "0" : store.carrito.length})
              </button>

            </li>
            {/*<span className=""></span> */}
          </ul>
        </div>
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
                  Iniciar sesión
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
                  <label className="fw-bold">Email</label>
                  <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                    placeholder="Ingresa tu correo"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="fw-bold">Contraseña</label>
                  <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                    placeholder="Ingresa tu contraseña"
                    required
                  />
                </div>
                <button className="btn btn-dark mt-2 me-2">

                  Iniciar sesión
                </button>

                <button
                  className="btn btn-dark mt-2"
                  onClick={e => handleRecuperar(e)}
                >
                  Recuperar contraseña
                </button>
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
                  <label className="fw-bold">Nombre</label>
                  <input
                    type="string"
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                    placeholder="Ingresa tu nombre"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="fw-bold">Apellidos</label>
                  <input
                    type="string"
                    onChange={(e) => setApellidos(e.target.value)}
                    className="form-control"
                    placeholder="Ingresa tus apellidos"
                    required
                  />
                </div>
                <div className="form-group ">
                  <label className="fw-bold">Email</label>
                  <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                    placeholder="Ingresa tu correo"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="fw-bold">Contraseña</label>
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
      </Modal>

    </nav>

  );
};

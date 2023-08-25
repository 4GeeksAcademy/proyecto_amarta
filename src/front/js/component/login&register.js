import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { Recuperar } from "./recuperar";
import PropTypes from "prop-types"
import { Modal } from "react-bootstrap";
import { propTypes } from "react-bootstrap/esm/Image";


export const LoginyRegistro = (props) => {
  // const navigate = useNavigate();

  // const { store, actions } = useContext(Context);

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [name, setName] = useState("");
  // const [apellidos, setApellidos] = useState("");
  // const [mostrarRecuperar, setMostrarRecuperar] = useState(false);
  // const [mostrarModal, setMostrarModal] = useState(props.show);

  // const handleMostrarRecuperar = () => {
  //   setMostrarRecuperar(true);
  // };
  // // const closeModal = () => {
  // //   setMostrarModal(false);
  // // };
  // async function handleSubmitSignup(e) {
  //   e.preventDefault();
  //   console.log(email, password);
  //   // actions.signup(email, password);
  //   let signedin = await actions.signup(name, apellidos, email, password)
  //   if (signedin) {
  //     navigate('/private')
  //   }
  // }

  // async function handleSubmitLogin(e) {
  //   e.preventDefault();
  //   console.log(email, password);
  //   let logged = await actions.login(email, password);
  //   if (logged) {
  //     setMostrarModal(false)
  //     navigate("/private");
  //   }
  // }

  return (
    <></>
    // <Modal show={mostrarModal} className="modal fade" tabIndex="-1" data-bs-target="exampleModal" id="exampleModal">
    //   <nav className="modal-dialog">
    //     <div className="modal-content fondoModal">
    //       <nav>
    //         <div
    //           className="modal-header nav nav-tabs justify-content-center border-0"
    //           id="nav-tab"
    //           role="tablist"
    //         >
    //           <button
    //             type="button"
    //             className="nav-link justify-content-center border-0 ms-5 me-5"
    //             id="nav-iniciarID-tab"
    //             data-bs-toggle="tab"
    //             data-bs-target="#nav-inicioSesion"
    //             role="tab"
    //             aria-selected="true"

    //           >
    //             Iniciar Sesión
    //           </button>
    //           <button
    //             type="button"
    //             className="nav-link justify-content-center border-0 ms-5 "
    //             id="nav-crearID-tab"
    //             data-bs-toggle="tab"
    //             data-bs-target="#nav-crearCuenta"
    //             role="tab"
    //             aria-selected="false"
    //           >

    //             Registrarse
    //           </button>
    //           <button
    //             type="button"
    //             className="btn-close"
    //             data-bs-dismiss="modal"
    //             aria-label="Close"
    //           ></button>
    //         </div>
    //       </nav>
    //       <div className="modal-body tab-content" id="nav-tabContent">
    //         {/* SECCION INICIO SESIÓN */}

    //         <form
    //           onSubmit={(e) => handleSubmitLogin(e)}
    //           className="tab-pane fade show active container"
    //           id="nav-inicioSesion"
    //           role="tabpanel"
    //           aria-labelledby="nav-iniciarID-tab"
    //         >
    //           <div className="form-group">
    //             <label>Email</label>
    //             <input
    //               type="email"
    //               onChange={(e) => setEmail(e.target.value)}
    //               className="form-control"
    //               placeholder="Ingresa tu correo"
    //             />
    //           </div>
    //           <div className="form-group">
    //             <label>Contraseña</label>
    //             <input
    //               type="password"
    //               onChange={(e) => setPassword(e.target.value)}
    //               className="form-control"
    //               placeholder="Ingresa tu contraseña"
    //             />
    //           </div>
    //           <button className="btn btn-dark mt-2 me-2">
    //             {/* // onClick={closeModal}> */}
    //             Iniciar Sesión
    //           </button>

    //           <button
    //             type="submit"
    //             className="btn btn-dark mt-2"
    //             onClick={handleMostrarRecuperar}
    //           >
    //             Recuperar contraseña
    //           </button>
    //           {/* {mostrarRecuperar && <Recuperar />} */}
    //         </form>

    //         {/* SECCION CREAR NUEVA CUENTA */}
    //         <form
    //           onSubmit={(e) => handleSubmitSignup(e)}
    //           // data-bs-dismiss="modal"
    //           className="tab-pane fade container"
    //           id="nav-crearCuenta"
    //           role="tabpanel"
    //           aria-labelledby="nav-crearID-tab"
    //         >
    //           <div className="form-group">
    //             <label>Nombre</label>
    //             <input
    //               type="string"
    //               onChange={(e) => setName(e.target.value)}
    //               className="form-control"
    //               placeholder="Ingresa tu nombre"
    //             />
    //           </div>
    //           <div className="form-group">
    //             <label>Apellidos</label>
    //             <input
    //               type="string"
    //               onChange={(e) => setApellidos(e.target.value)}
    //               className="form-control"
    //               placeholder="Ingresa tus apellidos"
    //             />
    //           </div>
    //           <div className="form-group">
    //             <label>Email</label>
    //             <input
    //               type="email"
    //               onChange={(e) => setEmail(e.target.value)}
    //               className="form-control"
    //               placeholder="Ingresa tu correo"
    //             />
    //           </div>
    //           <div className="form-group">
    //             <label>Contraseña</label>
    //             <input
    //               type="password"
    //               onChange={(e) => setPassword(e.target.value)}
    //               className="form-control"
    //               placeholder="Ingresa tu contraseña"
    //             />
    //           </div>
    //           <button type="submit" className="btn btn-dark mt-2">Crear cuenta</button>
    //         </form>
    //       </div>
    //     </div>
    //   </nav>
    //   {mostrarRecuperar && <Recuperar />}
    // </Modal>

  );
};

// LoginyRegistro.propTypes = {
//   show: propTypes.bool
// }
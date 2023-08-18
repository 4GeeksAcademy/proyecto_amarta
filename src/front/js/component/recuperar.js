import React, { useState, useEffect, useContext } from "react";
import { Link , useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { Navbar } from "./navbar";



export const Recuperar = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("");		
        
    return (
     
                   <div className="recuperar_contraseña"tabIndex="-1" id="recuperar">
                                    <div className="modal-dialog">
                                              <div className="modal-content fondoRegistro">
                                                  <div className="modal-header nav nav-tabs justify-content-center border-0" id="nav-tab" role="tablist">
                                                      <h2>Recupera tu contraseña</h2>
                                                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    
                                                      
                                                          <form className="tab-pane fade show active container" id="nav-inicioSesion" role="tabpanel" aria-labelledby="nav-iniciarID-tab"  >				
                                                              <div className="form-group">
                                                                  <label>Email</label>
                                                                  <input
                                                                      type="email"
                                                                      onChange={e => setEmail(e.target.value)}
                                                                      className="form-control"
                                                                      placeholder="Ingresa tu correo de registro"
                                                                  />
                                                              </div>
                                                              <button className="btn btn-dark mt-2 me-2">Enviar correo</button>
                                                          </form>
                                                      </div>
                                                  </div>
                                              </div>
                                          </div>
    )}

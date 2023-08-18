import React, { useState, useEffect, useContext } from "react";
import { Link , useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { Navbar } from "./navbar";



export const Contacto = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("");	
    const [mensaje, setMensaje] = useState("");		

    const navigate = useNavigate();
        
    return (
        <div className="contacto" tabIndex="-1" id="contacto">
        <div className="modal-dialog">
                  <div className="modal-content fondoContacto">
                      <div className="modal-header nav nav-tabs justify-content-center border-0" id="nav-tab" role="tablist">
                          <h4>Escríbenos tu mensaje</h4>
                          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                      
                                                          <form className="tab-pane fade show active container" id="nav-inicioSesion" role="tabpanel" aria-labelledby="nav-iniciarID-tab"  >				
                                                              <div className="form-group">
                                                                  <label>Email</label>
                                                                  <input
                                                                      type="email"
                                                                      onChange={e => setEmail(e.target.value)}
                                                                      className="form-control"
                                                                      placeholder="Ingresa tu correo"
                                                                  />
                                                              </div>
                                                              <div className="form-group">
                                                                  <label>Mensaje</label>
                                                                  <textarea
                                                                      type="text"
                                                                      onChange={e => setMensaje(e.target.value)}
                                                                      className="form-control"
                                                                      placeholder="Puedes escribir tus dudas y mensajes aquí"
                                                                  />
                                                              </div>
                                                              <button className="btn btn-dark mt-2 me-2">Enviar mensaje</button>
                                                          </form>
                                                      </div>
                                                  </div>
                                              </div>
                                          </div>
    )}

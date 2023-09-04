import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ProductoCatalogo } from "../component/productoCatalogo";

export const Private = () => {
    const { store, actions } = useContext(Context)
    const [status, setStatus] = useState("checking")
    const navigate = useNavigate()

    function logFavs() {
        console.log(store.favs);
    }

    useEffect(() => {
        const validate = async () => {
            let valid = await actions.validToken()
            if (valid) {
                const gotPedidos=await actions.getPedidos()
                const gotFavs = await actions.getFavs()
                setStatus("authorized")
                console.log(store.pedidos)
                return true
            } else {
                setStatus("un-authorized")
                return false
            }
        }
        validate()
    }, [])

    if (status === "authorized") {
        return (
            <div className=" min-vh-100">
                <div className="container-fluid bg-secondary-subtle p-5 bg-white bg-opacity-50 vh-100">
                    <h1>Mi perfil</h1>
                    <hr></hr>
                    <h3 className="d-flex justify-content-center mt-2 mb-2">
                        <p className="d-inline-block">¡Bienvenid@,</p>
                        <p className="fst-italic fw-bolder ms-1 d-inline-block"> {store.user.nombre}!</p></h3>
                    <div id="arrayFavoritos">
                        <h4 className="d-flex">Tus favoritos: ({store.favs.length}) </h4>
                        <div className="d-flex mb-2">
                            {store.favs.length === 0 ? (

                                <h5 className="d-block ms-5 mt-2 mb-2">Aún no tienes favoritos.
                                    <Link to={"/catalogo"} type="button" className=" h-50 w-100 d-block w-25 btn btn btn-dark btn-lg px-4 mt-3">Ir al catálogo</Link></h5>
                            ) : (
                                store.favs.map(item => (
                                    <ProductoCatalogo className="d-flex" key={item.id_producto} producto={item}></ProductoCatalogo>
                                ))
                            )}
                        </div>
                    </div>
                    <div id="arrayPedidos">
                        <h4 className="d-flex">Tus pedidos: ({store.pedidos.length}) </h4>
                        <div className="d-flex mb-2">
                            {store.pedidos.length === 0 ? (

                                <h5 className="d-block ms-5 mt-2 mb-2">Aún no tienes pedidos.</h5>
                            ) : (
                                <div className="container">
                                {store.pedidos.map((item, index) => (
                                  <div key={`${item.id_producto}-${index}`} className="row mb-4">
                                    <div className="col-md-12">
                                      <div className="card">
                                        <div className="card-body">
                                          <h5 className="card-title">Código del pedido: {item.id}</h5>
                                          <p className="card-text">Cantidad: {item.cantidad}</p>
                                          <p className="card-text">Fecha: {item.fecha}</p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (status === "un-authorized") {
        return (
            <Navigate to="/" replace />
        )
    }

    return (
        <>
            <div className="mt-3 text-center min-vh-100">
                <h1>Verificando su cuenta...</h1>
                <div className="spinner-border text-dark" role="status">
                </div>
            </div>

        </>
    )


}
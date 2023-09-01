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
                const gotFavs = await actions.getFavs()
                setStatus("authorized")
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
                        <p className="d-inline-block">Correo de registro: </p> 
                        <p className="fst-italic fw-bolder ms-1 d-inline-block"> {store.user.email}</p></h3>
                    <div  id="arrayFavoritos">
                    <h4 className="d-flex">Tus favoritos: ({store.favs.length}) </h4>
                    <div className="d-flex"> 
                        {store.favs.length === 0 ? (

                            <h5  className="d-block ms-5 mt-2 mb-2">Aún no tienes favoritos.
                            <Link to={"/catalogo"} type="button" className=" h-50 w-100 d-block w-25 btn btn btn-dark btn-lg px-4 mt-3">Ir al catálogo</Link></h5>
                        ) : (
                            store.favs.map(item => (
                                <ProductoCatalogo className="d-flex" key={item.id_producto} producto={item}></ProductoCatalogo>
                            ))
                        )}
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
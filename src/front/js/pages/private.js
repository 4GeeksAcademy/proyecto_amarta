import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Navigate, useNavigate } from "react-router-dom";
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
                <h1>Loggeado como {store.user.email}</h1>
                <div className="d-flex" id="arrayFavoritos">
                    {store.favs.map(item => (
                        <ProductoCatalogo key={item.id_producto} producto={item}></ProductoCatalogo>
                    ))}
                </div>
                <button onClick={logFavs}>favs</button>
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
            <div className="text-center min-vh-100">
                <h1>Checking validation...</h1>
            </div>
        </>
    )


}
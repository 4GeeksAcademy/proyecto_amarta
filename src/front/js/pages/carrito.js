import React, { useState, useEffect, useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { ProductoCarrito } from "../component/productoCarrito";

export const Carrito = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate()

    const handleEliminarProducto = (id_prod) => {
        actions.eliminarDelCarrito(id_prod);
    };

    const handleDeleteProduct = id_prod => {
        actions.eliminarDelCarrito(store.user.id, id_prod);
    }

    useEffect(() => {
        async function setUpStripe() {

            if (store.logged) {
                const listo = await actions.getStripePublicKey()
                console.log(store.stripePublicKey);
            } else {
                navigate("/")
                alert("No se ha iniciado sesión")
            }
        }
        setUpStripe()
    }, [])

    return (
        <div className="min-vh-100" >
            <div className="container text-center pt-5 pb-2 ">
                <div className="d-flex align-items-center bg-white bg-opacity-75 w-75 topGuideCarrito" >
                    <span className="w-25 bg-transparent"></span>
                    <div className="w-25">
                        Producto
                    </div>
                    <div className="w-25">
                        Precio
                    </div>
                    <div className="w-25">
                        Cantidad
                    </div>
                    <div className="w-25">
                        Total
                    </div>
                </div>
                {/* BOTON PARA DIRIGIR AL PAGO DE CARRITO */}
                {/* <button type="button">Realizar Pago</button> */}
                <div>
                    {store.carrito.length === 0 ? (
                        <div className="p-2 bg-white bg-opacity-50 emptyCarritoMsg text-center my-5">
                            <h5 className="text-center">El carrito está vacío</h5>
                        </div>
                    ) : (
                        <div>
                            {store.carrito.map((item, index) => (<ProductoCarrito key={index} item={item}></ProductoCarrito>))}
                        </div>
                    )}
                </div>
                <button className="btn btn-primary" onClick={() => actions.processPayment()}>Finalizar Compra</button>
            </div>

        </div>
    );

}
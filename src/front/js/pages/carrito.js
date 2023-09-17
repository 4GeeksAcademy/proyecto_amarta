import React, { useState, useEffect, useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { ProductoCarrito } from "../component/productoCarrito";

export const Carrito = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate()

    useEffect(() => {
        async function setUpStripe() {

            if (store.logged) {
                await actions.getStripePublicKey()
            } else {
                navigate("/")
                alert("No se ha iniciado sesión")
            }
        }
        setUpStripe()
    }, [])

    useEffect(() => {

    }, [])

    return (
        <div className=" min-vh-100 bg-white" >
            <div className="">
                <div className="topBar">
                    <div className="prodDiv">
                        <p>PRODUCTO</p>
                    </div>
                    <div className="detailsDiv">

                        <div className="d-flex text-center align-items-center w-25">
                            <p className="w-100 m-0">PRECIO</p>
                        </div>
                        <div className="qtyDiv w-25">
                            <p className="m-0">UNIDADES</p>
                        </div>
                        <div className="w-25 h-100 d-flex align-items-center text-center">
                            <p className="w-100 m-0">TOTAL</p>
                        </div>
                    </div>
                </div>
                {store.carrito.length === 0 ? (
                    <div className="p-2 bg-white bg-opacity-50 emptyCarritoMsg text-center my-5">
                        <h5 className="text-center">El carrito está vacío</h5>
                    </div>
                ) : (
                    <div>
                        {store.carrito.map((item) => (<ProductoCarrito key={item.id} item={item}></ProductoCarrito>))}
                    </div>
                )}
            </div>
            <div className="d-flex justify-content-end my-5 me-5 pt-4">
                <div className="checkOutDiv  align-content-center">
                    <div className="checkOutField mb-3">
                        <h5>TOTAL</h5>
                        <p>{store.totalCarrito},00 €</p>
                    </div>
                    <button className="btn btn-dark" onClick={() => {
                        if (store.totalCarrito !== 0) { actions.processPayment() }
                        else { alert("El carrito está vacío") }
                    }}>Finalizar Compra</button>
                </div>

            </div>


        </div>
    );
}
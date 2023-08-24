import React, { useState, useEffect, useContext } from "react";
import { Link , useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";


export const Carrito = () => {
	const { store, actions } = useContext(Context);

    const handleEliminarProducto = (id_prod) => {
        actions.eliminarDelCarrito(id_prod);
    };
    
    const handleDeleteProduct = id_prod => {
        actions.eliminarDelCarrito(store.user.id, id_prod);
    }


    return(
        <div className="bg-white bg-opacity-75 justify-content-center" >
            <div className="container text-center pt-5 pb-2">
            <div>
            {store.carrito.length === 0 ? (
                <p>El carrito está vacío</p>
            ) : (
                <ul>
                    {store.carrito.map((item, index) => (
                        <li key={item.id_prod}>
                        <h3>{item.nombre}</h3>
                        <p>Precio: {item.precio}</p>
                        <button onClick={() => handleDeleteProduct(item.id_prod)}>Eliminar</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>

{/* 1ER FILA CATÁLOGO ENCABEZADO  */}
                <div className="row">
                    <div className="col-5">
                    PRODUCTO
                    </div>
                    <div className="col-1">
                    <button
                        onClick={(e) =>handleDeleteProduct(
                            e, Carrito.name)
                                    }
                                >
                                    <i className="fa-solid fa-trash "></i>
                                </button>
                    </div>
                    <div className="col-2">
                    PRECIO
                    </div>
                    <div className="col-2">
                    UNIDADES
                    </div>
                    <div className="col-2">
                    TOTAL
                    </div>
                </div>

{/* condicion mostrar carrito */}
{/* 
const carrito= {store.carrito.length === 0 ? (
                        <div className="row">
                        <div className="col-6">
                        El carrito se encuentra vacío
                        </div>
                        <div className="col-6">
                        {/* BOTON CAtalogo */}
                        {/* <Link
                                className="link-fav"
                                to={`/catalogo}`}
                            >
                            Ir al Catálogo
                            </Link>
                        </div>
                    </div>
                    ) : (
                        store.carrito.map((listaCompras) => (
                            <div className="row">
                            <div className="col-5"> */}
                            {/* IMAGEN PRODUCTO */}
                            {/* </div>
                            <div className="col-1"> */}
                            {/* CESTA ELIMINAR PRODUCTOS */}
                            {/* </div>
                            <div className="col-2"> */}
                            {/* PRECIO */}
                            {/* </div>
                            <div className="col-2"> */}
                            {/* CANTIDAD DE UNIDADES */}
                            {/* </div>
                            <div className="col-2"> */}
                            {/* TOTAL € POR PRODUCTO */}
                            {/* </div>
                        </div>





                            
                                <div className="item-container">
                                

                                <button
                                    className="btn-fav"
                                    onClick={(e) =>handleDeleteFavorites(
                                            e, listafavoritos.name
                                        )
                                    }
                                >
                                    <i className="fa-solid fa-trash "></i>
                                </button>
                                </div>
                            </li>
                        ))
                    )}
                </ul> */} 


{/* 2DA FILA CATÁLOGO LISTA DE PRODUCTOS  */}
                <div className="row">
                    <div className="col-5">
                    {/* IMAGEN PRODUCTO */}
                    </div>
                    <div className="col-1">
                    {/* CESTA ELIMINAR PRODUCTOS */}
                    </div>
                    <div className="col-2">
                    {/* PRECIO */}
                    </div>
                    <div className="col-2">
                    {/* CANTIDAD DE UNIDADES */}
                    </div>
                    <div className="col-2">
                    {/* TOTAL € POR PRODUCTO */}
                    </div>
                </div>
{/* 3ERA MOSTRAR CARRITO VACÍO + BOTON CATALOGO */}
                <div className="row">
                    <div className="col-6">
                    {/* CARRITO VACIO */}
                    </div>
                    <div className="col-6">
                    {/* BOTON CARRITO */}
                    </div>
                </div>
{/* 4TA FILA SUBTOTAL*/}
                <div className="row">
                    <div className="col-12">
                    {/* SUBTOTAL */}
                    </div>
                </div>
{/* 5TA FILA IMPUESTOS*/}
                <div className="row-12">
                    <div className="col">
                    {/* SUBTOTAL */}
                    </div>
                </div>
{/* 6TA FILA TOTAL*/}
                <div className="row">
                    <div className="col-12">
                    {/* TOTAL */}
                    </div>
                </div>
{/* BOTON PARA DIRIGIR AL PAGO DE CARRITO */}
                {/* <button type="button">Realizar Pago</button> */}
                </div>
    </div>
    );

}
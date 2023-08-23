import React, { useState, useEffect, useContext } from "react";
import { Link , useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";


export const Carrito = () => {
	const { store, actions } = useContext(Context);

	const handleDeleteProduct = (e, name) => {
        e.stopPropagation();
		const compras = store.productos_carrito.filter((item)=> item.name !== name)
		actions.getProductosCarrito(compras)
    };

    return(
        <div className="bg-white bg-opacity-75 justify-content-center" >
            <div className="container text-center pt-5 pb-2">
{/* 1ER FILA CATÁLOGO ENCABEZADO  */}
                <div className="row">
                    <div className="col-5">
                    PRODUCTO
                    </div>
                    <div className="col-1">
                    <button
                        onClick={(e) =>handleDeleteProduct(
                            e, productos_carrito.name)
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
const carrito= {store.productos_carrito.length === 0 ? (
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
                        store.productos_carrito.map((listaCompras) => (
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
import React, { useState, useEffect, useContext } from "react";
import { Link , useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";


export const Carrito = () => {
	const { store, actions } = useContext(Context);

    return(
        <div >
            <div className="container text-center pt-5 pb-2">
{/* 1ER FILA CATÁLOGO ENCABEZADO  */}
                <div className="row">
                    <div className="col-5">
                    PRODUCTO
                    </div>
                    <div className="col-1">
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
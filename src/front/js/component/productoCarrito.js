import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";
import "../../styles/carrito.css"

export const ProductoCarrito = (props) => {
    const { store, actions } = useContext(Context)
    const [cantidad, setCantidad] = useState(parseInt(props.item.cantidad))

    function handleEliminar() {
        actions.eliminarDelCarrito(props.item.id)
    }
    function handleInc() {
        setCantidad(cantidad + 1)
    }
    function handleDec() {
        setCantidad(cantidad - 1)
    }
    useEffect(() => {
        actions.actualizarCarrito(props.item.id, cantidad)
    }, [cantidad])

    return (
        <div className="py-3 border-bottom border-1 border-dark-subtle">
            <div className="itemCarritoDiv" >
                <div className="prodDiv">
                    <div className="imgDiv">
                        <img className=" prodImg" src={props.item.img} alt="..."></img>
                    </div>
                    <div className="w-50 p-3  h-100 d-flex align-items-center">
                        <p className="text-center w-100">{props.item.nombre}</p>
                    </div>
                </div>
                <div className="detailsDiv">
                    <button className="deleteButton text-end w-25" onClick={handleEliminar}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                    </svg></button>
                    <div className="d-flex text-center align-items-center w-25">
                        <p className="w-100 m-0">{props.item.precio},00€</p>
                    </div>
                    <div className="qtyDiv w-25">
                        <input onClick={handleDec} type="button" className="qtyField" value="-" />
                        <input value={cantidad} className="qtyField" readOnly />
                        <input onClick={handleInc} type="button" className="qtyField" value="+" />
                    </div>
                    <div className="w-25 h-100 d-flex align-items-center text-center">
                        <p className="w-100 m-0">{props.item.total},00€</p>
                    </div>
                </div>
            </div>
        </div>

    )


}

ProductoCarrito.propTypes = {
    item: PropTypes.object
}
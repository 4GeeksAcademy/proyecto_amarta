import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";
import "../../styles/carrito.css"

export const ProductoCarrito = (props) => {
    const { store, actions } = useContext(Context)
    const [cantidad, setCantidad] = useState(props.item.cantidad)
    // style={{ "max-width": 540 + "px" }}
    function handleEliminar() {
        actions.eliminarDelCarrito(props.item.id)
    }

    useEffect(() => {
        actions.actualizarCarrito(props.item.id, cantidad)
    }, [cantidad])

    return (
        <div>
            <div className="container d-flex itemCarritoDiv my-4 w-75" >
                <div className="col-md-2 me-2 p-0 bg-light bg-opacity-75 itemCarritoDiv">
                    <img className=" prodImg" src={props.item.img} alt="..."></img>
                </div>
                <div className="text-center d-flex align-items-center w-100 bg-light bg-opacity-75 itemCarritoDiv">
                    <div className="w-25 h-100 border-end border-1 border-dark d-flex align-items-center">
                        <h5 className=" fw-bold w-100">{props.item.nombre}</h5>
                    </div>
                    <div className="w-25 h-100 border-end border-1 border-dark d-flex align-items-center">
                        <h5 className="w-100">{props.item.precio},00€</h5>
                    </div>
                    <div className="w-25 h-100 border-end border-1 border-dark d-flex align-items-center justify-content-center">
                        <input min={1} max={99} className="w-25 text-center bg-transparent border-0" type="number" value={cantidad} onChange={(e) => { setCantidad(e.target.value) }} />
                    </div>
                    <div className="w-25 h-100 d-flex align-items-center">
                        <h5 className="w-100">{props.item.total},00€</h5>
                    </div>
                </div>
            </div>
            <div className="text-end container w-75">
                <button className="btn btn-dark border-1 deleteButton border-white border-bottom border-start border-top border-end" onClick={handleEliminar}>Eliminar del Carrito</button>
            </div>
        </div>

    )


}

ProductoCarrito.propTypes = {
    item: PropTypes.object
}
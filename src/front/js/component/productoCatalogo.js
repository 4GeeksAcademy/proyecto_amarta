import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "../../styles/producto-catalogo.css";
import { Context } from "../store/appContext";

export const ProductoCatalogo = props => {
    const { store, actions } = useContext(Context)


// Comenzar aqui
//
// const [compras,setCompras]=useState(false)
// const handleComprar =e=>{
//     e.preventDefault()
//     let comprasClick=[...store.productos_carrito];
//     setCompras(!compras)
//     if(!compras=== true) {
//         comprasClick.push ({
//         name: props.name,
//         id: props.id_tipo,
//         precio:props.precio,
//         url_img: props.url_img
//     })

// } else (
//     comprasClick = comprasClick.filter((item) => item.name !== props.name)
//     )

// actions.getProductosCarrito(comprasClick)

// }












// hasta aqui Laura sin incluir - Borrar comentario


















    return (

        <div className="card col-12 col-md-6 col-lg-3 mx-3 border-0 m-2 p-0" style={{ width: "18rem" }}>
            <img src={props.producto.url_img} className="card-img-top  rounded-0" alt="..." />
            <div className="card-body container">
                <div className="d-flex ">
                    <h5 className="card-title me-5 ">{props.producto.nombre}</h5>
                    <p className="text-end fw-lighter text-end">{props.producto.precio} €</p>
                </div>
                <p className="card-text">{props.producto.ingredientes_principales}</p>
                <p className="card-text">{props.producto.propiedes}</p>
                <Link to={"/producto"} type="button" className="btn btn-outline-secondary btn-sm rounded-0 mx-2">Mas información</Link>
                <a href="#" className="btn btn-outline-secondary btn-sm rounded-0" onClick={handleComprar}>Comprar</a>












            </div>
        </div>
    );
};


/**
 * Define the data-types for
 * your component's properties
 **/
ProductoCatalogo.propTypes = {
    producto: PropTypes.object
};
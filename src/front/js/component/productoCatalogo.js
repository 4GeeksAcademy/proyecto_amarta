import React from "react";
import PropTypes from "prop-types";
import "../../styles/producto-catalogo.css";

export const ProductoCatalogo = props => {

    return (

        <div className="card col-12 col-md-6 col-lg-3 mx-3 border-0 pb-4 m-2" style={{ width: "18rem" }}>
            <img src={props.producto.imagen} className="card-img-top  rounded-0" alt="..." />
            <div className="card-body container">
                <div className="d-flex ">
                    <h5 className="card-title me-5 ">{props.producto.nombre}</h5>
                    <p className="text-end fw-lighter text-end">{props.producto.precio} €</p>
                </div>
                <p className="card-text">{props.producto.ingredientes_principales}</p>
                <p className="card-text">{props.producto.propiedes}</p>
                <a href="#" className="btn btn-outline-secondary btn-sm rounded-0">Mas información</a>
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
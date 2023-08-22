import React from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import "../../styles/producto-catalogo.css";

export const ProductoCatalogo = props => {

    // const navigate = useNavigate()

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
                {/* <button type="button" className="btn btn-outline-secondary btn-sm rounded-0 mx-2">Mas información</button> */}
                <Link to={`/producto/${props.producto.id_producto}`} type="button" className="btn btn-outline-secondary btn-sm rounded-0 mx-2">Mas información</Link>
                <a href="#" className="btn btn-outline-secondary btn-sm rounded-0">Comprar</a>
                
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
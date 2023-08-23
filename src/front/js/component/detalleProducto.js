import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "../../styles/detalle-producto.css";

export const DetalleProducto = props => {

    return (

        <div className="container col-xxl-8 px-4 py-5 bg-white mt-5 mb-5">
            <div className="row flex-lg-row align-items-center g-5 py-5">
                <div className="col-10 col-sm-8 col-lg-6">
                    <img src={props.producto.url_img} className="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" loading="lazy" />
                </div>
                <div className="col-lg-6">
                    <h1 className="display-6 fw-bold lh-1 mb-3">{props.producto.nombre}</h1>
                    <p>{props.producto.propiedes}</p>
                    <p className="lead">{props.producto.descripcion}</p>
                    <p>{props.producto.metodo_utilizacion}</p>
                    <p><strong>Tamaños: </strong>{props.producto.tamaño}</p>

                    <hr />

                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                        <label className="form-check-label" for="flexRadioDefault1">
                            1 unidad {props.producto.tamaño}
                        </label>
                    </div>
                    <hr />

                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2"/>
                        <label className="form-check-label" for="flexRadioDefault2">
                            1 unidad {props.producto.tamaño}
                        </label>
                    </div>
                    <hr />

                    <div className="d-grid gap-2 d-md-flex justify-content-md-start mt-5">
                    
                        <button type="button" className="btn btn-dark btn-lg px-4 me-md-2">Añadir al
                            carrito</button>
                        <Link to={"/catalogo"} type="button" className="btn btn-outline-secondary btn-lg px-4">Completar la rutina</Link>
                    </div>
                </div>
            </div>
        </div>

    );
};


/**
 * Define the data-types for
 * your component's properties
 **/
DetalleProducto.propTypes = {
    producto: PropTypes.object
};


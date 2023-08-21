import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";


export const DetalleProducto = props => {

    return (

        <div className="container col-xxl-8 px-4 py-5 bg-white mt-5 mb-5">
        <div className="row flex-lg-row align-items-center g-5 py-5">
            <div className="col-10 col-sm-8 col-lg-6">
                <img src="#" className="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" loading="lazy"/>
            </div>
            <div className="col-lg-6">
                <h1 className="display-6 fw-bold lh-1 mb-3">L{props.producto.nombre}</h1>
                <p>Refrescantes y revitalizantes. Ideal para pieles mixtas</p>
                <p className="lead">Refresca al tiempo que desinfecta. El tónico de romero, salvia y lavanda
                    proporciona una limpieza con grandes propiedades antisépticas y refrescantes. La
                    selección de hidrolatos que la componen fancas y guión tónico completo para la
                    limpieza y tonificación de la piel diaria disfrutando de los aromas íberos de nuestro
                    territorio.</p>
                <p>Uso diario,
                    después de la ducha, mañanas y vísperas antes de la crema o tónico.</p>
                <p><strong>Tamaños</strong> 30ml</p>

                <hr/>

                <div className="form-check">
                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
                    <label className="form-check-label" for="flexRadioDefault1">
                        Default radio
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked/>
                    <label className="form-check-label" for="flexRadioDefault2">
                        Default checked radio
                    </label>
                </div>


                <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                    <button type="button" className="btn btn-dark btn-lg px-4 me-md-2">Añadir al
                        carrito</button>
                    <button type="button" className="btn btn-outline-secondary btn-lg px-4">Completar la rutina</button>
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


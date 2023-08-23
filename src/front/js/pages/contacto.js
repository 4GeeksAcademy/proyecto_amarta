import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const Contacto = () => {
	// const { store, actions } = useContext(Context);

	// const [filter, setFilter] = useState("")


	// useEffect(() => {
	// 	actions.getTipoProducto()
	// 	actions.getProducts()

	// }, [])

	return (
		<div className="min-vh-100">
			<div className="container-fluid bg-secondary-subtle p-5 bg-white bg-opacity-50">
				<div className="container-fluid row">
					<div className="col">
						<p className="h1 pb-5">¡En que te podemos ayudar!</p>
						<p>La belleza de tu historia es que continuará evolucionando y tu sitio evolucionará con ella.</p>
						<p>correoelectronico@ejemplo.com</p>
						<p>555-5555</p>
					</div>
					<div className="col">
						<div className="row">
							<div className="col">
								<label for="nombre" className="form-label">Nombre</label>
								<input type="text" className="form-control" placeholder="Nombre" id="nombre" aria-label="Nombre" />
							</div>
							<div className="col">
								<label for="apellidos" className="form-label">Apellidos</label>
								<input type="text" className="form-control" placeholder="Apellidos" id="apellidos" aria-label="Apellidos" />
							</div>
						</div>
						<div className="row">
							<div className="col">
								<label for="email" className="form-label">Email</label>
								<input type="text" className="form-control" id="email" placeholder="Email" aria-label="Email" />
							</div>
						</div>
						<div className="mb-3">
							<label for="textArea" className="form-label">Mensaje</label>
							<textarea className="form-control" id="textArea" rows="3"></textarea>
						</div>
						<button type="button" className="btn btn-dark btn-lg px-4 me-md-2">Enviar</button>
					</div>
				</div>
			</div>
		</div>
	);
};


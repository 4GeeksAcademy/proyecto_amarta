import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const Contacto = () => {
	const {  actions } = useContext(Context);

	// const [filter, setFilter] = useState("")


	// useEffect(() => {
	// 	actions.getTipoProducto()
	// 	actions.getProducts()

	// }, [])

	const [email, setEmail] = useState("");
	const [mensaje, setMensaje] = useState("");
	const [nombre, setNombre] = useState("");
	const [apellido, setApellido] = useState("");

	// Crear estados donde se elmazenan la info de los inputs
	const handleEnviarMensaje = (e) => {
		e.preventDefault();
		actions.enviarMensaje(nombre, apellido, email, mensaje)
	}


	const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
	const appendAlert = (message, type) => {
		const wrapper = document.createElement('div')
		wrapper.innerHTML = [
			`<div class="alert alert-${type} alert-dismissible mt-3" role="alert">`,
			`   <div>${message}</div>`,
			'   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
			'</div>'
		].join('')

		alertPlaceholder.append(wrapper)
	}

	const alertTrigger = document.getElementById('liveAlertBtn')
	if (alertTrigger) {
		alertTrigger.addEventListener('click', () => {
			appendAlert('Mensaje enviado!', 'dark')
		})
	}

	return (
		<div className="min-vh-100">
			<div className="container-fluid bg-secondary-subtle p-5 bg-white bg-opacity-50">
				<div className="container-fluid row mb-5">
					<div className="col">
						<p className="h1 pb-5">¡En que te podemos ayudar!</p>
						<p>La belleza de tu historia es que continuará evolucionando y tu sitio evolucionará con ella.</p>
						<p className="h5 pb-2">correoelectronico@ejemplo.com</p>
						<p className="h5 ">555-5555</p>
					</div>
					<div className="col">
						<div className="row">
							<div className="col">
								<label for="nombre" className="form-label">Nombre</label>
								<input type="text" className="form-control" placeholder="Nombre" id="nombre" aria-label="Nombre" onChange={e => setNombre(e.target.value)} />
							</div>
							<div className="col">
								<label for="apellidos" className="form-label">Apellidos</label>
								<input type="text" className="form-control" placeholder="Apellidos" id="apellidos" aria-label="Apellidos" onChange={e => setApellido(e.target.value)} />
							</div>
						</div>
						<div className="row">
							<div className="col">
								<label for="email" className="form-label">Email</label>
								<input type="text" className="form-control" id="email" placeholder="Email" aria-label="Email" onChange={e => setEmail(e.target.value)}  />
							</div>
						</div>
						<div className="mb-3">
							<label for="textArea" className="form-label">Mensaje</label>
							<textarea className="form-control" id="textArea" rows="3" onChange={e => setMensaje(e.target.value)} ></textarea>
						</div>
						<div id="liveAlertPlaceholder">
							<button type="button" className="btn btn-dark me-md-2" id="liveAlertBtn" onClick={e => handleEnviarMensaje(e)}>Enviar</button>
						</div>

					</div>
				</div>
				<div className="row g-3 mt-5">
					<div className="col">
						<p className="h3">¡Especialmente para ti!</p>
						<p className="fs-6 mb-0">Regístrate y sé la primera persona en enterarte de los descuentos!</p>
						<p className="fs-6 ">Recibe los consejos y todo lo que ofrece AMARTA.</p>
					</div>
					<div className="col">
						<input type="password" className="form-control mb-3" placeholder="Correo electronico" />
						<button type="submit" className="btn btn-dark  me-md-2">Subscribirse</button>
					</div>



				</div>
			</div>
		</div>
	);
};


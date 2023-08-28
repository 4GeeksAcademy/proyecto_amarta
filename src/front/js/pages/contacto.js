import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const Contacto = () => {
	const { actions } = useContext(Context);

	// const [filter, setFilter] = useState("")


	// useEffect(() => {
	// 	actions.getTipoProducto()
	// 	actions.getProducts()

	// }, [])

	const [email, setEmail] = useState("");
	const [mensaje, setMensaje] = useState("");
	const [nombre, setNombre] = useState("");
	const [apellido, setApellido] = useState("");
	const [alertMessage, setAlertMessage] = useState('');
	const [alertType, setAlertType] = useState('');
	const [alertNL, setAlertNL] = useState('');
	const [alertTypeNL, setAlertTypeNL] = useState('');
	const [subscripcion, setSubscripcion] = useState("")

	// Crear estados donde se elmazenan la info de los inputs
	const enviarMsg = async (nombre, apellido, email, mensaje) => {
		const msg = actions.enviarMensaje(nombre, apellido, email, mensaje)
		return msg
	}

	const enviarEmailNL = async (subscripcion) => {
		const msg = actions.enviarEmailNL(subscripcion)
		return msg
	}

	const handleAlertMensaje = (message, type) => {
		setAlertMessage(message);
		setAlertType(type);
	};

	const handleAlertNL = (message, type) => {
		setAlertNL(message);
		setAlertTypeNL(type);
	};




	//Alert de los boton de enviar formulario
	const handleEnviarMensaje = () => {
		if (nombre === '' || apellido === '' || email === '' || mensaje === '') {
			handleAlertMensaje('Debe rellenar todos los campos!', 'danger');
		} else {
			enviarMsg(nombre, apellido, email, mensaje)
			if (enviarMsg) {
				handleAlertMensaje('Mensaje enviado! Te responderemos lo antes posible', 'dark')
			} else {
				handleAlertMensaje('Error al enviar el mensaje', 'danger')
			}

		}
	}


	//Alert de los boton de subscribirse a la NL
	const handelEnviarEmailNL = () => {
		if (subscripcion === '') {
			handleAlertNL('Debe rellenar todos los campos!', 'danger');
		} else {
			enviarEmailNL(subscripcion)
			if (enviarEmailNL) {
				handleAlertNL('Subscrito correctamente a la newletter!', 'dark');
			} else {
				handleAlertNL('Error al enviar el mensaje', 'danger')
			}

		}
	}




	return (
		<div className="min-vh-100 mt-5">
			<div className="container-fluid bg-secondary-subtle p-5 bg-white bg-opacity-50">
				<div className="container-fluid row mb-5">
					<div className="col">
						<p className="h1 pb-5">¡En qué te podemos ayudar!</p>
						<p className="fw-bold">La belleza de tu historia es que continuará evolucionando y tu sitio evolucionará con ella.</p>
						<p className="h5 pb-2">correoelectronico@ejemplo.com</p>
						<p className="h5 ">555-5555</p>
					</div>
					<div className="col">
						<div className="row">
							<div className="col pb-2">
								{/* <label for="nombre" className="form-label">Nombre</label> */}
								<input type="text" className="form-control" placeholder="Nombre" id="nombre" aria-label="Nombre" onChange={e => setNombre(e.target.value)} />
							</div>
							<div className="col">
								{/* <label for="apellidos" className="form-label">Apellidos</label> */}
								<input type="text" className="form-control" placeholder="Apellidos" id="apellidos" aria-label="Apellidos" onChange={e => setApellido(e.target.value)} />
							</div>
						</div>
						<div className="row">
							<div className="col pb-2">
								{/* <label for="email" className="form-label">Email</label> */}
								<input type="email" className="form-control" id="email" placeholder="Email" aria-label="Email" onChange={e => setEmail(e.target.value)} />
							</div>
						</div>
						<div className="mb-3">
							{/* <label for="textArea" className="form-label">Mensaje</label> */}
							<textarea className="form-control" id="textArea" rows="3" placeholder="¿En qué te podemos ayudar?" onChange={e => setMensaje(e.target.value)} ></textarea>
						</div>

						<button type="button" className="btn btn-dark me-md-2 mb-3" onClick={handleEnviarMensaje}>Enviar</button>
						{/* <div id="liveAlertPlaceholder"></div> */}
						{alertMessage && (
							<div className={`alert alert-${alertType} alert-dismissible`} role="alert">
								<div>{alertMessage}</div>
								<button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
							</div>
						)}
					</div>
				</div>
				<div className="container-fluid row ">
					<div className="col">
						<p className="h3">¡Especialmente para ti!</p>
						<p className="fs-6 mb-0 fw-bold">Regístrate y sé la primera persona en enterarte de los descuentos!</p>
						<p className="fs-6 fw-bold">Recibe los consejos y todo lo que ofrece AMARTA.</p>
					</div>
					<div className="col ">
						<input type="email" className="form-control mb-3" placeholder="Correo electronico" onChange={e => setSubscripcion(e.target.value)}/>
						<button type="button" className="btn btn-dark  me-md-2"  onClick={handelEnviarEmailNL}>Subscribirse</button>
					</div>
				</div>
				<div className="container-fluid row">
					<div className="col"></div>
					<div className="col">
						{alertNL && (
							<div className={`alert alert-${alertTypeNL} alert-dismissible`} role="alert">
								<div>{alertNL}</div>
								<button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};


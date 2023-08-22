import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { ProductoCatalogo } from "../component/productoCatalogo";


export const Catalogo = () => {
	const { store, actions } = useContext(Context);

	const [filter, setFilter] = useState("")


	useEffect(() => {
		actions.getTipoProducto()
		actions.getProducts()

	}, [])

	return (
		<div className=" min-vh-100">
			<div className="container-fluid bg-secondary-subtle p-5 bg-white bg-opacity-50">
				<h4 className="title-catalogo pb-2">Belleza simplificadad.</h4>
				<h4 className="title-catalogo pb-2">Solo con el mejor producto natural en cada categoria de belleza.</h4>
				<h4 className="title-catalogo pb-2">Todo lo que necessitas y nada que no.</h4>
				<ul className="list-group list-group-horizontal p-2">
					<li className="list-group-item" onClick={e => setFilter("")}>Todos</li>
					{store.tipo_producto?.map(item => <li className="list-group-item" key={item.id_tipo} id={item.id_tipo} onClick={e => setFilter(item.id_tipo)}>{item.nombre}</li>)}</ul>
			</div>

			<div className="row justify-content-center">
				{store.productos?.filter(item => filter === "" ? store.productos : item.id_tipo === filter).map(item => (
					<ProductoCatalogo
						key={item.id_producto}
						producto={item}
					/>
				))}
			</div>

		</div>
	);
};

// Single.propTypes = {
// 	match: PropTypes.object
// };

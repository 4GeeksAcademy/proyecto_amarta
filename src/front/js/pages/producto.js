import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { DetalleProducto } from "../component/detalleProducto";


export const Producto = () => {
	const { store, actions } = useContext(Context);

	// const [filter, setFilter] = useState("")


	useEffect(() => {
		actions.getTipoProducto()
		actions.getProducts()

	}, [])

	return (
		<div>
			{store.productos.map(item => (
				<DetalleProducto 
				key={item.id_producto}
				producto={item} />
			))}			
		</div>

	);
};


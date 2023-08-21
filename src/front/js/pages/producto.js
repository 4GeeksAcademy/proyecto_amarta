import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { ProductoCatalogo } from "../component/productoCatalogo";


export const Producto= () => {
	const { store, actions } = useContext(Context);

	// const [filter, setFilter] = useState("")


	// useEffect(() => {
	// 	actions.getTipoProducto()
	// 	actions.getProducts()

	// }, [])

	return (
		<div className="">
			Esto es un producto
			

		</div>
	);
};
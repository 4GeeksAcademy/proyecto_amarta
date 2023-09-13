import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { ProductoCatalogo } from "../component/productoCatalogo";
import "../../styles/catalogo.css"


export const Catalogo = () => {
	const { store, actions } = useContext(Context);

	const [filter, setFilter] = useState("");
	const [busquedaProducto, setbusquedaProducto] = useState("");
	const [busquedaResultado, setbusquedaResultado] = useState([]);
  
	useEffect(() => {
	  actions.getTipoProducto();
	  actions.getProducts();
	}, []);
  
	// Filtrar los productos por tipo si hay un filtro seleccionado
	const filtroProductos =
	  filter === ""
		? store.productos
		: store.productos.filter((item) => item.id_tipo === filter);
  
	// Filtrar los productos por término de búsqueda
	const filtroPorBusqueda =
	  busquedaProducto === ""
		? filtroProductos
		: busquedaResultado.length > 0
		? busquedaResultado
		: [];
  
	useEffect(() => {
	  // Filtrar los productos por nombre si hay un término de búsqueda
	  if (busquedaProducto !== "") {
		const filteredResults = filtroProductos.filter((item) =>
		  item.nombre.toLowerCase().includes(busquedaProducto.toLowerCase())
		);
		setbusquedaResultado(filteredResults);
	  }
	}, [busquedaProducto, filtroProductos]);

	return (
		<div className="min-vh-100">
			<div className="container-fluid bg-secondary-subtle p-5 bg-white bg-opacity-75">
				<h4 className="title-catalogo pb-2  d-flex justify-content-center">Belleza simplificada</h4>
				<h4 className="title-catalogo pb-2  d-flex justify-content-center">Solo con el mejor producto natural en cada categoría de belleza</h4>
				<h4 className="title-catalogo pb-2  d-flex justify-content-center">Todo lo que necesitas</h4>
				<div className="d-flex justify-content-center">
				<ul className="bg-dark list-group list-group-horizontal p-2 d-inline-flex justify-content-center">
					<li className="list-group-item bg-dark text-white" onClick={e => setFilter("")}>Todos</li>
					{store.tipo_producto?.map(item => <li className="list-group-item bg-dark text-white" key={item.id_tipo} id={item.id_tipo} onClick={e => setFilter(item.id_tipo)}>{item.nombre}</li>)}
					
					<form className="d-inline-flex justify-content-center ms-2" role="search">
						<input
							className="form-control me-2 w-auto "
							type="search"
							placeholder="Busca tu producto"
							aria-label="Search"
							value={busquedaProducto}
							onChange={(e) => setbusquedaProducto(e.target.value)}
						></input>
						<button
							className="btn btn-outline-light bg-dark border-0"
							type="submit"
						>
							<i className="fa-solid fa-magnifying-glass"></i>
						</button>
					</form>
				
					</ul>
		</div>
      </div>

      <div className="row justify-content-center">
        {filtroPorBusqueda.map((item) => (
          <ProductoCatalogo key={item.id_producto} producto={item} />
        ))}
      </div>
    </div>
  );
};
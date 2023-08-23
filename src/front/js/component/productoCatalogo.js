import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import "../../styles/producto-catalogo.css";
import { Context } from "../store/appContext";

export const ProductoCatalogo = props => {
    const { store, actions } = useContext(Context)
    const [faved, setFaved] = useState()


// Comenzar aqui
//
// const [compras,setCompras]=useState(false)
// const handleComprar =e=>{
//     e.preventDefault()
//     let comprasClick=[...store.productos_carrito];
//     setCompras(!compras)
//     if(!compras=== true) {
//         comprasClick.push ({
//         name: props.name,
//         id: props.id_tipo,
//         precio:props.precio,
//         url_img: props.url_img
//     })

// } else (
//     comprasClick = comprasClick.filter((item) => item.name !== props.name)
//     )

// actions.getProductosCarrito(comprasClick)

// }







    // CODIGO A PARTIR DE AQUI JOSE
    function handleOnClickFav() {
        actions.toggleFav(props.producto.id_producto)
        if (faved) {
            setFaved(false)
        } else if (!faved) {
            setFaved(true)

        }

    }
    useEffect(() => {
        console.log("useEffect");
        console.log(faved);
        if (props.producto.id_producto in store.favs) {
            setFaved(true)
        }
    }, [faved])




    return (

        <div className="card col-12 col-md-6 col-lg-3 mx-3 border-0 m-2 p-0 position-relative" style={{ width: "18rem" }}>
            <img src={props.producto.url_img} className="card-img-top  rounded-0" alt="..." />
            <div className="card-body container">
                <div className="d-flex ">
                    <h5 className="card-title me-5 ">{props.producto.nombre}</h5>
                    <p className="text-end fw-lighter text-end">{props.producto.precio} €</p>
                </div>
                <p className="card-text">{props.producto.ingredientes_principales}</p>
                <p className="card-text">{props.producto.propiedes}</p>
                <Link to={"/producto"} type="button" className="btn btn-outline-secondary btn-sm rounded-0 mx-2">Mas información</Link>
                <a href="#" className="btn btn-outline-secondary btn-sm rounded-0">Comprar</a>
                {faved ?
                    <button className=" mx-2 bg-transparent border-0 position-absolute top-0" type="button" onClick={handleOnClickFav}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fillRule="currentColor" className="bi bi-heart-fill" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                        </svg>
                    </button> :
                    <button className="mx-2 bg-transparent border-0 position-absolute top-0" type="button" onClick={handleOnClickFav}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fillRule="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
                            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                        </svg>
                    </button>
                }                
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
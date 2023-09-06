import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ProductoCatalogo } from "../component/productoCatalogo";
import "../../styles/pedido.css"

export const Private = () => {
    const { store, actions } = useContext(Context)
    const [status, setStatus] = useState("checking")
    const navigate = useNavigate()

    function logFavs() {
        console.log(store.favs);
    }

    function getPedidoUnico(pedidos) {
        const pedidoId = new Set();
        let contadorPedido = 0;

        for (const pedido of pedidos) {
            if (!pedidoId.has(pedido.id_pedido)) {
                pedidoId.add(pedido.id_pedido);
                contadorPedido++;
            }
        }

        return contadorPedido;
    }

    function getPedidosPorReferencia(pedidos) {
        const pedidosPorReferencia = {};

        for (const pedido of pedidos) {
            const referencia = pedido.id_pedido;

            if (!pedidosPorReferencia[referencia]) {
                pedidosPorReferencia[referencia] = [pedido];
            } else {
                pedidosPorReferencia[referencia].push(pedido);
            }
        }

        return Object.values(pedidosPorReferencia);
    }

    useEffect(() => {
        const validate = async () => {
            let valid = await actions.validToken()
            if (valid) {
                const gotPedidos = await actions.getPedidos()
                const gotFavs = await actions.getFavs()
                setStatus("authorized")
                console.log(store.pedidos)
                return true
            } else {
                setStatus("un-authorized")
                return false
            }
        }
        validate()
    }, [])

    if (status === "authorized") {
        return (
            <div className=" min-vh-100">
                <div className="container-fluid bg-secondary-subtle p-5 bg-white bg-opacity-50 flex-grow-1">
                    <h1>Mi perfil</h1>
                    <hr></hr>
                    <h3 className="d-flex justify-content-center mt-2 mb-2">
                        <p className="d-inline-block">¡Bienvenid@,</p>
                        <p className="fst-italic fw-bolder ms-1 d-inline-block"> {store.user.nombre}!</p></h3>
                    <div id="arrayFavoritos">
                        <h4 className="d-flex">Tus favoritos: ({store.favs.length}) </h4>
                        <div className="d-flex mb-2">
                            {store.favs.length === 0 ? (

                                <h5 className="d-block ms-5 mt-2 mb-2">Aún no tienes favoritos.
                                    <Link to={"/catalogo"} type="button" className=" h-50 w-100 d-block w-25 btn btn btn-dark btn-lg px-4 mt-3">Ir al catálogo</Link></h5>
                            ) : (
                                store.favs.map(item => (
                                    <ProductoCatalogo className="d-flex" key={item.id_producto} producto={item}></ProductoCatalogo>
                                ))
                            )}
                        </div>
                    </div>
                    <div id="arrayPedidos">
                        <h4 className="d-flex">
                            Tus pedidos: ({getPedidoUnico(store.pedidos)})
                        </h4>
                        <div className="d-flex mb-2">
                            {store.pedidos.length === 0 ? (

                                <h5 className="d-block ms-5 mt-2 mb-2">Aún no tienes pedidos.</h5>
                            ) : (
                                <div className="container">
                                    {getPedidosPorReferencia(store.pedidos).map((groupedOrder, index) => (
                                        <div key={`${groupedOrder[0].id_pedido}-${index}`} className="row mb-4">
                                            <div className="col-md-12">
                                                <div className="card">
                                                    <div className="card-body">
                                                        <h5 className="card-title">Referencia: {groupedOrder[0].id_pedido}</h5>
                                                        {groupedOrder.map((item, subIndex) => (
                                                            <div key={`${item.id_producto}-${subIndex}`}>
                                                                <img src={`${item.img}`} className="imgPedido" />
                                                                <p className="card-text mb-0">Producto: {item.nombre}</p>
                                                                <p className="card-text mb-2">Cantidad: {item.cantidad}</p>
                                                                <hr></hr>
                                                            </div>
                                                        ))}
                                                        <p className="card-text">Fecha: {groupedOrder[0].fecha}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (status === "un-authorized") {
        return (
            <Navigate to="/" replace />
        )
    }

    return (
        <>
            <div className="mt-3 text-center min-vh-100">
                <h1>Verificando su cuenta...</h1>
                <div className="spinner-border text-dark" role="status">
                </div>
            </div>

        </>
    )


}
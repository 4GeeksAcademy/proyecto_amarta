import React, { useState, useEffect, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { DetalleProducto } from "../component/detalleProducto";


export const Producto = () => {
    const { store, actions } = useContext(Context);

    // const [filter, setFilter] = useState("")
    const params = useParams()
    const [loaded, setLoaded] = useState(false)
    const navigate = useNavigate()


    useEffect(() => {
        console.log("page producto", params.id_producto);
        async function loadProduct() {
            const load = await actions.getOneProduct(params.id_producto)
            if (load) {
                setLoaded(true)
            } else {
                navigate("/")
                alert("ALGO SALIO MAL")
            }
        }
        loadProduct()

    }, [loaded])

    if (!loaded) {
        return (
            <h1 className="text-center">LOADING...</h1>
        )
    }

    return (

        <div className="container col-xxl-8 px-4 py-5 bg-white mt-5 mb-5">
            <div className="row flex-lg-row align-items-center g-5 py-5">
                <div className="col-10 col-sm-8 col-lg-6">
                    <img src={store.producto.url_img} className="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" loading="lazy" />
                </div>
                <div className="col-lg-6">
                    <h1 className="display-6 fw-bold lh-1 mb-3">{store.producto.nombre}</h1>
                    <p>{store.producto.propiedes}</p>
                    <p className="lead">{store.producto.descripcion}</p>
                    <p>{store.producto.metodo_utilizacion}</p>
                    <p><strong>Tamaños: </strong>{store.producto.tamaño}</p>

                    <hr />

                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                        <label className="form-check-label" htmlFor="flexRadioDefault1">
                            1 unidad {store.producto.tamaño}
                        </label>
                    </div>
                    <hr />

                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                        <label className="form-check-label" htmlFor="flexRadioDefault2">
                            1 unidad {store.producto.tamaño}
                        </label>
                    </div>
                    <hr />

                    <div className="d-grid gap-2 d-md-flex justify-content-md-start mt-5">

                        <button type="button" className="btn btn-dark btn-lg px-4 me-md-2">Añadir al
                            carrito</button>
                        <Link to={"/catalogo"} type="button" className="btn btn-outline-secondary btn-lg px-4">Completar la rutina</Link>
                    </div>
                </div>
            </div>
        </div>


    );
};


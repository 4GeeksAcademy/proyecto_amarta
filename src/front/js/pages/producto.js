import React, { useState, useEffect, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";


export const Producto = () => {
    const { store, actions } = useContext(Context);
    // const [filter, setFilter] = useState("")
    const params = useParams()
    const [loaded, setLoaded] = useState(false)
    const [cantidad, setCantidad] = useState(1)
    const navigate = useNavigate()

    async function handleAddCarrito() {
        const added = await actions.agregarAlCarrito(store.producto, parseInt(cantidad))
        if (added) {
            console.log("added to carrito");
        } else {
            console.log("error");
        }

    }
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
        <div className="container col-xxl-8 px-4 py-5 mt-5 mb-5 min-vh-100">
            <div className="row flex-lg-row bg-white align-items-center g-5 py-5">
                <div className="col-10 col-sm-8 col-lg-6">
                    <img src={store.producto.url_img} className="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" loading="lazy" />
                </div>
                <div className="col-lg-6">
                    <h1 className="display-6 fw-bold lh-1 mb-3">{store.producto.nombre}</h1>
                    <p>{store.producto.propiedes}</p>
                    <p className="lead">{store.producto.descripcion}</p>
                    <p>{store.producto.metodo_utilizacion}</p>
                    <p><strong>Tamaño: </strong>{store.producto.tamaño}</p>

                    <hr />

                    <div className="form-check d-flex align-items-center">
                        <input className=" me-2 form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                        <input value={cantidad} min={1} max={99} className=" form-control w-auto me-2" type="number" onChange={(e) => {
                            setCantidad(e.target.value)
                        }} />
                        <label className="form-check-label" htmlFor="flexRadioDefault1">
                            unidad {store.producto.tamaño}
                        </label>
                    </div>
                    <hr />

                    <div className="d-grid gap-2 d-md-flex justify-content-md-start mt-5">

                        <button onClick={handleAddCarrito} type="button" className="btn btn-dark btn-lg px-4 me-md-2">Añadir al
                            carrito</button>
                        <Link to={"/catalogo"} type="button" className="btn btn-outline-secondary btn-lg px-4">Completar la rutina</Link>
                    </div>
                </div>
            </div>
        </div>



    );
};
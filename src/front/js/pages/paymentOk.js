import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

export const PaymentOk = () => {
    const { store, actions } = useContext(Context)
    const [stripePromise, setStripePromise] = useState(null)
    const [clientSecret, setClientSecret] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        actions.eliminarCarrito()
    }, [])

    return (
        <div className=" min-vh-100 ">
            <h1 className=" bg-white">PAGO OK</h1>
            <Link to={"/"} className="btn btn-success">Volver a home</Link>
        </div>
    )
}
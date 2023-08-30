import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

export const PagoStripe = () => {
    const { store, actions } = useContext(Context)
    const [stripePromise, setStripePromise] = useState(null)
    const [clientSecret, setClientSecret] = useState(null)
    const navigate = useNavigate()



    return (
        <div className=" min-vh-100 ">
            <h1 className=" bg-white">PAGO</h1>
        </div>
    )
}

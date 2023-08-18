import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Navigate, useNavigate } from "react-router-dom";

export const Private = () => {
    const {store,actions} = useContext(Context)
    const [status,setStatus] = useState("checking")
    const navigate = useNavigate()

    useEffect(()=>{
        const validate = async() => {
            let valid = await actions.validToken()
            if(valid){
                setStatus("authorized")
                return true
            }else{
                setStatus("un-authorized")
                return false
            }
        }
        validate()
    },[])

    if(status === "authorized"){
        return(
            <>
                <div className="text-center">
                    <h1>Loggeado como {store.email}</h1>
                </div>
            </>
        )
    }

    if (status === "un-authorized"){
        return(
            <Navigate to="/" replace/>
        )
    }

    return(
        <>
            <div className="text-center">
                <h1>Checking validation...</h1>
            </div>
        </>
    )
    
    
}
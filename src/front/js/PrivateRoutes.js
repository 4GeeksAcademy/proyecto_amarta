import React from "react";
import { Navigate,Route,Routes } from "react-router-dom";
import { Home } from "./pages/home";
import { Private} from "./pages/private";

export const PrivateRoutes = ({validToken,children}) => {
    if (!validToken) {
        return <Navigate to="/" replace/>
    }
    return(children)
}
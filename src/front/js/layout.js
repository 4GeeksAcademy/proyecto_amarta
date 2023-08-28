import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";
import homeImageUrl from "../img/img293.jpg";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import { Catalogo } from "./pages/catalogo";
import { Producto } from "./pages/producto";
import { Contacto } from "./pages/contacto";
import injectContext from "./store/appContext";
import { Carrito } from "./pages/carrito";
import { Recuperar } from "./component/recuperar.js";
import { LoginyRegistro } from "./component/login&register";
import { Private } from "./pages/private"
import { PrivateRoutes } from "./PrivateRoutes";


import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "")
    return <BackendURL />;


  const myImageStyle = {
    backgroundImage: `url(${homeImageUrl})`,
    backgroundSize: "cover",
    backgroundRepeat: "repeat",
    backgroundAttachment: "fixed",
    backgroundPosition: "50% 50%",
  }

  return (
    <div style={myImageStyle}>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Navbar />
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<Demo />} path="/demo" />
            <Route element={<LoginyRegistro />} path="/login" />
            <Route element={<Recuperar />} path="/recuperar" />
            <Route element={<Carrito />} path="/carrito" />
            <Route element={<Single />} path="/single/:theid" />
            <Route element={<Home />} path='*' />
            <Route element={<Private />} path="/private" />
            <Route element={<Catalogo />} path="/catalogo" />
            <Route element={<Producto />} path="/producto/:id_producto" />
            <Route element={<Contacto />} path="/contacto" />
            <Route element={<h1>Not found!</h1>} />
          </Routes>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div >
  );
};

export default injectContext(Layout);
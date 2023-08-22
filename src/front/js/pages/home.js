import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import homeImageUrl from "../../img/img293.jpg";
import img1 from "../../img/1.png"
import img2 from "../../img/2.png"
import img3 from "../../img/3.png"
import img4 from "../../img/4.png"
import img5 from "../../img/5.png"
import img6 from "../../img/6.png"
import "../../styles/home.css";

export const Home = () => {
	// const { store, actions } = useContext(Context);

	const images = [img1, img2, img3, img4, img5, img6]

	return (

		<div className=" min-vh-100" >
			<div className="img-home px-4 pt-5 my-5">

				{/* style={{ backgroundImage: `url(${homeImageUrl})`, backgroundSize: "cover"}} */}

				{/* <img src={homeImageUrl} alt="..." className="img-fluid"  /> */}
				<div className="col-lg-6 mx-auto">

					<h1 className="display-5  text-white mb-5 title-home "> Belleza
						simplificada.
						Solo el
						mejor
						producto natural
						en
						cada categoria
						de belleza.
					</h1>
					<div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5 btn-container">
						<Link to={"/catalogo"} type="button" className="btn-shop mb-2 text-center">Shop</Link>
					</div>
				</div>
			</div>

			{/* //MAPEO DE IMAGENES */}
			<div className="container-fluid">
				<div className="row img-fluid text-center m-1">
					{images.map((item, index) => <div key={index} className="col-sm-12 col-md-2 col-lg-2 m-0"> <img src={item} className="m-1 p-1" alt="..." style={{ width: "100%", height: "100%" }} /> </div>)}

				</div>
			</div>

		</div>
	);
};

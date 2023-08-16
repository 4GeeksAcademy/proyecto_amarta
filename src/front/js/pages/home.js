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
		<div className="text-center">
			<div id="" className="">

				<div className="">
					<img src={homeImageUrl} alt="..." className="img-fluid"  />
					<div className="">
						<h1 className="position-absolute top-50 start-50 translate-middle text-white title-home"> Belleza
							simplificada.
							Solo el
							mejor
							producto natural
							en
							cada categoria
							de belleza. Todo lo que
							necessitas y nada que no.
						</h1>
				
						<Link to={"#"} type="button" className="translate-middle btn-shop">Shop</Link>
					</div>
				</div>

			</div>

			

			{/* //MAPEO DE IMAGENES */}
			<div className="container-fluid">
				<div className="row img-fluid p-0 ">
					<div className="col-sm-12 col-md-2 col-lg-2 m-2" style={{ width: "100%", height: "100%" }}>
						{images.map(item => (item))}
					</div>
					
				</div>
			</div>

		</div>
	);
};

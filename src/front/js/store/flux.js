import axios from 'axios';

const urlBack = process.env.BACKEND_URL

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: "",
			message: "",
			validate: false,
			email: "",
			productos: [],
			tipo_producto: [],
			productos_carrito: []

		},
		actions: {
			login: async (email, password) => {
				try {
					const data = await axios.post(`${urlBack}/api/login`, {
						email: email,
						password: password
					})
					console.log(data);
					localStorage.setItem("token", data.data.access_token)
					setStore({ token: data.data.access_token, email: email })
					return true

				} catch (error) {
					console.log(error);
					return false
				}

			},

			signup: async (nombre, apellidos, email, password) => {
				try {
					const data = await axios.post(`${urlBack}/api/signup`, {
						nombre: nombre,
						apellidos: apellidos,
						email: email,
						password: password
					})
					console.log(data);
					localStorage.setItem("token", data.data.access_token)
					setStore({ token: data.data.access_token })
					return true
				}
				catch (error) {

					return false
				}
			},

			private: async () => {
				try {
					const getToken = {
						headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
					}
					let data = await axios.get(`${urlBack}/api/private`, getToken)
					console.log(data);
					return true
				} catch (error) {
					console.log(error);
					return false
				}
			},

			validToken: async () => {
				let token = localStorage.getItem("token")

				try {
					//codigo exitoso
					let data = await axios.get(`${urlBack}/api/private`, {
						headers: {
							"Authorization": `Bearer ${token}`,
						}
					})
					console.log(data);
					if (data.status === 200)

						return true;
				} catch (error) {
					console.log(error);
					if (error.response.status === 401) {
						setStore({ message: { type: "danger", display: "block", msg: "La sesión ha expirado" } })
						localStorage.removeItem("token")
						return false
					}
					else if (error.response.status === 422) {
						setStore({ message: { type: "danger", display: "block", msg: "No se ha iniciado sesión aun" } })
						return false
					}
					return false
				}
			},

			getProducts: async () => {
				try {
					let data = await axios.get(`${urlBack}/api/catalogo`)
					setStore({productos: data.data});
					console.log(data);
					
				} catch (error) {
					console.log(error);
				}

			},

			getTipoProducto: async () => {
				try {
					let data = await axios.get(`${urlBack}/api/tipo_producto`)
					setStore({tipo_producto: data.data});
					
				} catch (error) {
					console.log(error);
				}

			},
			getProductosCarrito: listaDeCompras=>{
				setStore({productos_carrito:listaDeCompras})
			},

			



			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			// Use getActions to call a function within a fuction
			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
		}
	};
};

export default getState;
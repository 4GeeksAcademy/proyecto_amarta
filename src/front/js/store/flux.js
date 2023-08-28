import axios from 'axios';

const urlBack = process.env.BACKEND_URL

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			message: "",
			validate: false,
			logded: false,
			productos: [],
			tipo_producto: [],
			producto: {},

			favs: [],
			user: {},


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
					setStore({ token: data.data.access_token, user: data.data.user })
					await getActions().getFavs(data.data.user.id)
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
					console.log(data.data);
					if (data.status === 200) {
						setStore({ user: data.data, logged: true })
						return true;
					}
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
					setStore({ productos: data.data });
					console.log(data);

				} catch (error) {
					console.log(error);
				}

			},

			getTipoProducto: async () => {
				try {
					let data = await axios.get(`${urlBack}/api/tipo_producto`)
					setStore({ tipo_producto: data.data });

				} catch (error) {
					console.log(error);
				}

			},

			getOneProduct: async (id_producto) => {
				try {
					let data = await axios.get(`${urlBack}/api/producto/${id_producto}`)
					setStore({ producto: data.data.data });
					return true

				} catch (error) {
					console.log(error);
					return false
				}

			},

			getContrasenya: async (email) => {
				try {
					let data = await axios.post(`${urlBack}/api/forgotpassword`, {
						email: email,
					})
					console.log(data);
				} catch (error) {
					console.log(error);
				}

			},

			enviarMensaje: async (nombre, apellido, email, mensaje) => {
				try {
					let data = await axios.post(`${urlBack}/api/enviarmensaje`, {
						email: email,
						nombre: nombre,
						apellido: apellido,
						mensaje: mensaje
					})
					console.log(data);
				} catch (error) {
					console.log(error);
				}

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

			getFavs: async (user_id) => {
				try {
					const data = await axios.get(`${urlBack}/api/favoritos/${getStore().user.id}`)
					setStore({ favs: data.data.favoritos });
				} catch (error) {

				}
			},
			toggleFav: async (prod_id) => {
				try {
					const data = await axios.post(`${urlBack}/api/favoritos/${getStore().user.id}/${prod_id}`)
					getActions().getFavs(getStore().user.id)
					console.log(data);

				} catch (error) {
					console.log(error);
				}
			},
			logOut: () => {
				setStore({ logged: false, token: null })
				localStorage.removeItem("token")
			}
		}
	};
};

export default getState;
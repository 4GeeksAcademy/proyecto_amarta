import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';

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
			stripePublicKey: null,
			favs: [],
			user: {},
			carrito: [],
			totalCarrito: 0,
			correo_para_verificacion: "",
		},
		actions: {
			login: async (email, password) => {
				try {
					const data = await axios.post(`${urlBack}/api/login`, {
						email: email,
						password: password
					})
					localStorage.setItem("token", data.data.access_token)
					setStore({ token: data.data.access_token, user: data.data.user })
					await getActions().getFavs(data.data.user.id)
					await getActions().getCarrito()
					console.log("Usuario logueado correctamente")
					return { success: true };
				} catch (error) {
					console.log(error);
					return { success: false, errorMsg: "Usuario no registrado o contraseña no válida." };
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
					localStorage.setItem("token", data.data.access_token)
					setStore({ token: data.data.access_token })
					await getActions().getCarrito()
					console.log("Usuario registrado correctamente")
					return { success: true };
				} catch (error) {
					console.log(error);
					return { success: false, errorMsg: "Error al registrarse, completa todos los datos." };
				}
			},

			private: async () => {
				try {
					const getToken = {
						headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
					}
					let data = await axios.get(`${urlBack}/api/private`, getToken)
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
					if (data.status === 200) {
						setStore({ user: data.data, logged: true })
						await getActions().getCarrito()
						await getActions().getFavs()
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

				} catch (error) {
					// console.log(error);
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
			getCarrito: async () => {
				console.log("en carrito");
				try {
					let data = await axios.get(`${urlBack}/api/carrito/${getStore().user.id}`)
					setStore({ carrito: data.data.carrito })
					setStore({ totalCarrito: data.data.total })
					return true
				} catch (error) {
					console.log(error);
					return false
				}
			},

			agregarAlCarrito: async (prod_id, cantidad) => {
				try {
					await axios.post(`${urlBack}/api/carrito/${getStore().user.id}`, {
						producto: prod_id,
						cantidad: cantidad
					});
					await getActions().getCarrito()
					return true
				} catch (error) {
					console.log(error);
					return false
				}
			},
			eliminarDelCarrito: async (prod_id) => {
				try {
					await axios.delete(`${urlBack}/api/carrito/${getStore().user.id}/${prod_id}`);
					await getActions().getCarrito()
					return true
				} catch (error) {
					console.log(error);
					return false
				}
			},
			actualizarCarrito: async (prod_id, cantidad) => {
				try {
					const data = await axios.put(`${urlBack}/api/carrito/${getStore().user.id}/${prod_id}`, {
						cantidad: cantidad
					});
					console.log(data);
					await getActions().getCarrito()
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
					setStore({ correo_para_verificacion: data.data })

					return { success: true, Msg: "Su nueva clave ha sido enviada al correo electrónico ingresado" };
				} catch (error) {
					console.log(error);
					return { success: false, errorMsg: "Error al cargar el correo." };

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
					return true
				} catch (error) {
					console.log(error);
					return false
				}

			},

			enviarEmailNL: async (email) => {
				try {
					let data = await axios.post(`${urlBack}/api/inscribirseNL`, {
						email: email,
					})
					console.log(data);
					return true
				} catch (error) {
					console.log(error);
					return false
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
					await getActions().getFavs(getStore().user.id)
				} catch (error) {
					console.log(error);
				}
			},

			prodIsFaved: (id_prod) => {
				let favs = getStore().favs
				for (let index = 0; index < parseInt(favs["length"]); index++) {
					if (id_prod === favs[index]["id_producto"]) {
						return true
					}
				} return false
			},
			logOut: () => {
				setStore({ logged: false, token: null, carrito: [], favoritos: [] })
				localStorage.removeItem("token")
			},
			getStripePublicKey: async () => {
				try {
					const data = await axios.get(`${urlBack}/config`)
					setStore({ stripePublicKey: data.data.publicKey });
					return true
				} catch (error) {
					console.log(error);
					return false
				}
			},
			processPayment: async () => {
				const stripe = await loadStripe(getStore().stripePublicKey)
				try {
					const data = await axios.post(`${urlBack}/payment`, {
						carrito: getStore().carrito
					})
					console.log(data);
					console.log(stripe.redirectToCheckout({ sessionId: data.data.sessionId }));
				} catch (error) {
					console.log(error);
				}
			},
			eliminarCarrito: async () => {
				const data = await axios.delete(`${urlBack}/api/carrito/${getStore().user.id}`)
				await getActions().getCarrito()
			}
		}
	};
}
export default getState;

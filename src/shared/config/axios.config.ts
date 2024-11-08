import axios from "axios";

const instance = axios.create({
	//   baseURL: "http://localhost:8000/api/v1",
	baseURL: import.meta.env.PUBLIC_VITE_URL_BACKEND, // Cambia la URL base según tu configuración
	headers: {
		"Content-Type": "application/json",
		// Otros headers comunes aquí...
	},
});

// Configurar interceptores
instance.interceptors.request.use(
	(config) => {
		// Lógica para interceptar y modificar la solicitud antes de enviarla
		if (config.url !== "/login") {
			const token = localStorage.getItem("token"); // Suponiendo que el token está almacenado en el almacenamiento local
			if (token) {
				config.headers.Authorization = `Bearer ${token}`;
			} else {
				window.location.href = "/login";
			}
		}

		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

// instance.interceptors.response.use(
//   (response) => {
//     // Lógica para interceptar y modificar la respuesta antes de resolverla
//     if (response.status >= 200 && response.status < 300) {
//       // Verifica si la solicitud no fue de tipo POST
//       if (response.config.method !== "get") {
//         // Realiza acciones adicionales con la respuesta satisfactoria
//         ModalService.openModal("success", response.data.message);
//       }
//     }
//     return response;
//   },
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       // Si la respuesta tiene un código de estado 401 (no autorizado),
//       // redirige al usuario a la página de inicio de sesión
//       // ModalService.openModal("error", "Inicie sesión");
//       router.push("/login"); // Cambia '/login' por la ruta de tu pantalla de inicio de sesión
//     } else {
//       if (error.response.data) {
//         if (error.response.data.errors) {
//           const errors = error.response.data.errors;
//           for (const fieldError in errors) {
//             console.log(fieldError);
//             if (Object.hasOwnProperty.call(errors, fieldError)) {
//               ModalService.openModal("error", errors[fieldError][0]);
//             }
//           }
//         } else {
//           ModalService.openModal("error", error.response.data.message);
//         }
//       } else {
//         ModalService.openModal("error", error.message);
//       }
//     }
//     return Promise.reject(error);
//   }
// );

export default instance;

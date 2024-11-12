import { create, find, getAll, remove, update } from "@service/useHttp.service";
import { METHOD_HTTP } from "@type/MethodsHttp.const";
import { ref } from "vue";

export function useHttp() {
	const loading = ref(false);
	const response = ref<any>();
	const result = ref<any[] | object | string | any>([]);
	const error = ref<any | null>(null);

	const executeRequest = async (
		method: string,
		path: string,
		id = "",
		data: object | null = null,
	) => {
		loading.value = true;
		try {
			// switch (method) {
			//   case METHOD_HTTP.GET:
			//     response.value = await getAll(path);
			//     break;
			//   case METHOD_HTTP.POST:
			//     response.value = await create(path, data);
			//     break;
			//   case METHOD_HTTP.PUT:
			//     response.value = await update(path, id, data);
			//     break;
			//   case METHOD_HTTP.DELETE:
			//     response.value = await remove(path, id);
			//     break;
			//   default:
			//     throw new Error("Unsupported method");
			// }

			// const methodMap = {
			//   [METHOD_HTTP.GET]: getAll,
			//   [METHOD_HTTP.POST]: create,
			//   [METHOD_HTTP.PUT]: update,
			//   [METHOD_HTTP.DELETE]: remove,
			// };

			// Validar argumentos según el método HTTP
			const validateArgs = () => {
				if (method === METHOD_HTTP.POST && !data)
					throw new Error("Data is required for POST requests");
				if (method === METHOD_HTTP.PUT && (!id || !data))
					throw new Error("ID and data are required for PUT requests");
				if (method === METHOD_HTTP.DELETE && !id)
					throw new Error("ID is required for DELETE requests");
			};

			validateArgs();

			// Mapa de funciones con los argumentos requeridos
			const responseMap = {
				[METHOD_HTTP.GET]: () => (id ? find(path, id) : getAll(path)),
				[METHOD_HTTP.POST]: () => create(path, data),
				[METHOD_HTTP.PUT]: () => update(path, id, data),
				[METHOD_HTTP.DELETE]: () => remove(path, id),
			};

			const methodFunction = responseMap[method];
			if (!methodFunction) throw new Error("Unsupported method");

			response.value = await methodFunction();

			result.value = response.value.data;
			error.value = null;
			// console.log(response.value);
		} catch (err: unknown) {
			error.value = err;
			error.value.success = false;
		} finally {
			loading.value = false;
		}
	};

	return { executeRequest, loading, result, error };
}

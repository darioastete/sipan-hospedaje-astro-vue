import axios from "@config/axiosDocument.config";
import { METHOD_HTTP } from "@type/MethodsHttp.const";
import { ref } from "vue";

export function useHttpDNI() {
	const loading = ref(false);
	const response = ref<any>();
	const result = ref<any[] | object | string | any>([]);
	const error = ref<any | null>(null);

	const executeRequest = async (dni = "") => {
		loading.value = true;

		try {
			// console.log(response.value);
			result.value = await axios.get(`/${dni}`);
		} catch (err: unknown) {
			error.value = err;
			error.value.success = false;
		} finally {
			loading.value = false;
		}
	};

	return { executeRequest, loading, result, error };
}

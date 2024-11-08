import {
	createRoom,
	deleteRoom,
	getRooms,
	updateRoom,
} from "@maroom/services/roomMaintenance.service";
import { ref } from "vue";

export function useHttp() {
	const loading = ref(false);
	const response = ref<any>();
	const result = ref<any[] | object | string>([]);
	const error = ref<any>(null);

	const executeRequest = async (
		method: string,
		id: string,
		data: object | null = null,
	) => {
		loading.value = true;
		try {
			switch (method) {
				case "GET":
					response.value = await getRooms();
					break;
				case "POST":
					response.value = await createRoom(data);
					break;
				case "PUT":
					response.value = await updateRoom(id, data);
					break;
				case "DELETE":
					response.value = await deleteRoom(id);
					break;
				default:
					throw new Error("Unsupported method");
			}
			result.value = response.value.data;
			error.value = null;
		} catch (err: unknown) {
			error.value = err;
			error.value.success = false;
		} finally {
			loading.value = false;
		}
	};

	return { executeRequest, loading, result, error };
}

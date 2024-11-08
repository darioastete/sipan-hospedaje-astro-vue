// import { getList, postItem } from "@module/maintenance/services/clientService";

import {
	createRoom,
	deleteRoom,
	getRooms,
	updateRoom,
} from "@maroom/services/roomMaintenance.service";
import { ref } from "vue";

export function createData() {
	const loadingCreate = ref(false);
	const responseCreate = ref<HttpSuccess>();
	const resultCreate = ref<any[] | object | string>([]);
	const errorCreate = ref<HttpError | null>(null);

	const create = async (path: string, data: object) => {
		loadingCreate.value = true;
		try {
			responseCreate.value = await postItem(path, data);
			resultCreate.value = responseCreate.value.data;
			errorCreate.value = null;
			loadingCreate.value = false;
		} catch (err: unknown) {
			errorCreate.value = err as HttpError;
			errorCreate.value.success = false;
			loadingCreate.value = false;
		}
	};
	return { create, loadingCreate, resultCreate, errorCreate };
}

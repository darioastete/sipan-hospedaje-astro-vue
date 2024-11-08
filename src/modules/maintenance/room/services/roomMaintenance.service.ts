import { HttpClientModule } from "@util/httpClient";

const httpClient = new HttpClientModule();

export const getRooms = async (): Promise<any> => {
	return httpClient.get("/rooms");
};

export const getRoom = async (id: string): Promise<any> => {
	return httpClient.get(`/rooms/${id}`);
};

export const createRoom = async (payload: any): Promise<any> => {
	return httpClient.post("/rooms", payload);
};

export const updateRoom = async (id: string, payload: any): Promise<any> => {
	return httpClient.put(`/rooms/${id}`, payload);
};

export const deleteRoom = async (id: string): Promise<any> => {
	return httpClient.delete(`/rooms/${id}`);
};

import { HttpClientModule } from "@util/httpClient";

const httpClient = new HttpClientModule();

export const getAll = async (path: string): Promise<any> => {
	return httpClient.get(`/${path}`);
};

export const find = async (path: string, id: string): Promise<any> => {
	return httpClient.get(`/${path}/${id}`);
};

export const create = async (path: string, payload: any): Promise<any> => {
	return httpClient.post(`/${path}`, payload);
};

export const update = async (
	path: string,
	id: string,
	payload: any,
): Promise<any> => {
	return httpClient.put(`/${path}/${id}`, payload);
};

export const remove = async (path: string, id: string): Promise<any> => {
	return httpClient.delete(`/${path}/${id}`);
};

import axios from "@config/axios.config";
import type { HttpClient } from "@type/HttpClient.type";

export class HttpClientModule implements HttpClient {
	private readonly instance = axios;

	private handleError(error: any): void {
		if (error.response) {
			const { data } = error.response;
			console.error("este es el error", data);
		} else if (error.request) {
			console.log("este es el error REQUEST", error.request);
		} else {
			console.log("aqui tenemos diferentes errores bebe");
		}
	}

	async get<T>(url: string): Promise<T> {
		try {
			const { data } = await this.instance.get<T>(url);
			return data;
		} catch (error: any) {
			this.handleError(error);
			throw error;
		}
	}

	async post<T>(url: string, payload: any): Promise<T> {
		try {
			const { data } = await this.instance.post<T>(url, payload);
			return data;
		} catch (error: any) {
			this.handleError(error);
			throw error;
		}
	}

	async put<T>(url: string, payload: any): Promise<T> {
		try {
			const { data } = await this.instance.put<T>(url, payload);
			return data;
		} catch (error: any) {
			this.handleError(error);
			throw error;
		}
	}

	async delete<T>(url: string): Promise<T> {
		try {
			const { data } = await this.instance.delete<T>(url);
			return data;
		} catch (error: any) {
			this.handleError(error);
			throw error;
		}
	}
}

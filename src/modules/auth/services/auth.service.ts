import { HttpClientModule } from "@util/httpClient";

const httpClient = new HttpClientModule();

export const auth = async (payload: any): Promise<any> => {
	try {
		const response = await httpClient.post("/login", payload);
		// console.log("eta entrando aqui?");
		return response;
	} catch (error) {
		console.log(error);
		// alert("Invalid username or password");
		throw error;
	}
	//   return httpClient.post("/login", payload);
};

export const logout = async () => {
	return httpClient.post("/logout", {});
};

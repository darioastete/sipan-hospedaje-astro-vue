export interface ClientAllResponse {
	success: boolean;
	data: Datum[];
}

export interface Datum {
	id: string;
	name: string;
	last_name: string;
	id_document_type: string;
	document: string;
	cell_phone?: string;
	mail?: string;
	ocupation?: null | string;
	status: number | null;
}

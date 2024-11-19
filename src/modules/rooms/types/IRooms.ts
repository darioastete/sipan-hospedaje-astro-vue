interface CategoryInfo {
	id: string;
	description: string;
	status: number;
	created_at: string;
	updated_at: string;
	deleted_at: string | null;
}

interface FlatInfo {
	id: string;
	description: string;
	status: number;
	created_at: string;
	updated_at: string;
	deleted_at: string | null;
	number: number;
}

interface StatusRoomInfo {
	id: string;
	description: string;
	color: string;
	status: number;
	created_at: string;
	updated_at: string;
	deleted_at: string | null;
}

interface ServicePivot {
	room_id: string;
	service_id: string;
}

interface Service {
	id: string;
	name: string;
	status: number;
	created_at: string;
	updated_at: string;
	deleted_at: string | null;
	pivot: ServicePivot;
}

export interface RoomResponse {
	id: string;
	number: number;
	cost: string;
	created_at: string;
	updated_at: string;
	deleted_at: string | null;
	id_category: string;
	id_flat: string;
	id_status_room: string;
	servicess: string[];
	category_name: string;
	flat_name: string;
	category_info: CategoryInfo;
	flat_info: FlatInfo;
	status_room_info: StatusRoomInfo;
	services: Service[];
}

// export interface RoomResponse {
//   room: Room;
// }

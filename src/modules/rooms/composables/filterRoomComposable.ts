import { ref } from "vue";

export function useFilter() {
  const roomsResult = ref<{ [key: string]: any[] }>({});
  const loadingSearch = ref(false);

  const filterRoom = (
    rooms: any,
    id_status_room: string | null,
    id_flat: string | null,
    id_category_room: string | null
  ) => {
    const fullRooms = rooms;
    loadingSearch.value = true;
    const filteredRooms = fullRooms.value.filter((room: any) => {
      let matches = true;
      if (id_status_room !== "") {
        matches = matches && room.id_status_room === id_status_room;
      }
      if (id_flat !== "") {
        matches = matches && room.id_flat === id_flat;
      }
      if (id_category_room !== "") {
        matches = matches && room.id_category === id_category_room;
      }
      return matches;
    });

    // Agrupar habitaciones por pisos
    const roomsByFlat: { [key: string]: any[] } = {};
    filteredRooms.forEach((room: any) => {
      const flatNumber = room.flat_info.number.toString(); // Convertir el número del piso a cadena
      const flatName = room.flat_name;
      const flatKey = `${flatName} - ${flatNumber}`; // Clave única que combina nombre y número del piso
      if (!roomsByFlat[flatKey]) {
        roomsByFlat[flatKey] = [];
      }
      roomsByFlat[flatKey].push(room);
    });

    const sortedFlatKeys = Object.keys(roomsByFlat).sort((a, b) => {
      const numberA = parseInt(a.split(" - ")[1]);
      const numberB = parseInt(b.split(" - ")[1]);
      return numberA - numberB;
    });

    const sortedRoomsByFlat: { [key: string]: any[] } = {};
    sortedFlatKeys.forEach((flatKey) => {
      const flatName = flatKey.split(" - ")[0];
      sortedRoomsByFlat[flatName] = roomsByFlat[flatKey];
    });

    roomsResult.value = sortedRoomsByFlat;

    loadingSearch.value = false;
  };

  return {
    roomsResult,
    loadingSearch,
    filterRoom,
  };
}

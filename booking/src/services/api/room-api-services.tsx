import { API_URL } from "../../constants";
import { parseResponse } from "../../helpers/parseHttpResponse";
import { CreateRoomModel, Room } from "../../models/Room";

const ROOM_API = "Room";

export function addRoomApi(room: CreateRoomModel) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(room),
  };
  return fetch(`${API_URL}/${ROOM_API}`, requestOptions).then(async (response) => {
    return parseResponse(response);
  });
}

export function getHotelRoomsApi(hotelId: string) {
  return fetch(`${API_URL}/${ROOM_API}/get-hotel-rooms/${hotelId}`).then(async (response) => {
    return parseResponse(response);
  });
}

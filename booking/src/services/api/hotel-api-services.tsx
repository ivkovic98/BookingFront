import { CreateHotelModel, Hotel } from "../../models/Hotel";
import { API_URL } from "../../constants";
import { log } from "console";
import { parseResponse } from "../../helpers/parseHttpResponse";

const HOTEL_API = "Hotel";

export function addHotelApi(hotel: CreateHotelModel) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(hotel),
  };
  return fetch(`${API_URL}/${HOTEL_API}`, requestOptions).then(async (response) => {
    return parseResponse(response);
  });
}

export function getAllHotelsApi() {
  return fetch(`${API_URL}/${HOTEL_API}/get-all/`).then(async (response) => {
    return parseResponse(response);
  });
}

export function getHotelByIdApi(hotelId: string) {
  return fetch(`${API_URL}/${HOTEL_API}/${hotelId}`).then(async (response) => {
    return parseResponse(response);
  });
}

export function deleteHotel(hotelId: number) {
  const requestOptions = {
    method: "DELETE",
    headers: { "Contet-Type": "application/json" },
    body: JSON.stringify(hotelId),
  };
  return fetch(`${API_URL}/${HOTEL_API}`, requestOptions).then(async (response) => {
    return parseResponse(response);
  });
}

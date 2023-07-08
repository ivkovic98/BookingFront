import { CreateHotelModel, Hotel } from "../../models/Hotel";
import { API_URL } from "../../constants";
import { log } from "console";
import { RegisterGuestModel } from "../../models/Guest";
import { LoginModel } from "../../models/Login";
import { RegisterManagerModel } from "../../models/Manager";
import { stringify } from "querystring";
import { parseResponse } from "../../helpers/parseHttpResponse";

const AUTHENTICATION_API = "Authentication";

export function loginApi(model: LoginModel) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(model),
  };

  return fetch(`${API_URL}/${AUTHENTICATION_API}/login`, requestOptions).then(async (response) => {
    return parseResponse(response);
  });
}

export function registerGuestApi(model: RegisterGuestModel) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(model),
  };
  return fetch(`${API_URL}/${AUTHENTICATION_API}/register/guest`, requestOptions).then(async (response) => {
    return parseResponse(response);
  });
}

export function registerManagerApi(model: RegisterManagerModel) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(model),
  };
  return fetch(`${API_URL}/${AUTHENTICATION_API}/register/manager`, requestOptions).then(async (response) => {
    return parseResponse(response);
  });
}

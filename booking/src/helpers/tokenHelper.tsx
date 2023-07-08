import jwtDecode from "jwt-decode";

export const getToken: any = () => {
  var token = localStorage.getItem("token");
  if (token) return jwtDecode(token);
  else return "";
};

export const getUserRole: any = () => {
  var token = getToken();
  return token.Role;
};

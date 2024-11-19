import * as jwtDecode from "jwt-decode";

const token = localStorage.getItem("token");
let role = null; 

if (token) {
  const decodedToken = jwtDecode.jwtDecode(token);
  role = decodedToken.rol ? decodedToken.rol.toLowerCase() : null;
}

export const userRole = role; 
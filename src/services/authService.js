import apiClient from "../api/clients";
import { ENDPOINTS } from "../api/endpoints";

export const AuthService = {
  async login({ username, password }) {
    const payload = { username, password };
    const response = await apiClient.post(ENDPOINTS.LOGIN, payload);

    const data = response?.data || {};
    let token = data.accessToken
      || data.token
      || data.access_token
      || data?.data?.accessToken
      || data?.data?.token;

    if (!token && response?.headers?.authorization) {
      const auth = response.headers.authorization;
      const parts = auth.split(" ");
      if (parts.length === 2 && /^Bearer$/i.test(parts[0])) {
        token = parts[1];
      }
    }

    const tokenType = data.tokenType || "Bearer";
    const expiresIn = data.expiresIn;

    if (!token) {
      throw new Error("Token no encontrado en la respuesta de autenticación");
    }

    localStorage.setItem("token", token);
    return { token, tokenType, expiresIn, raw: data };
  },

  logout() {
    localStorage.removeItem("token");
  }
};

export default AuthService;

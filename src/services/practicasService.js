import ENDPOINTS from "../api/endpoints";
import BaseService from "./baseServices";
import apiClient from "../api/clients";

class PracticasService extends BaseService {
  constructor() {
    super(ENDPOINTS.PRACTICAS);
  }

  async actualizarEstado(idPracticas, estado) {
    const response = await apiClient.patch(`${this.endpoint}/${idPracticas}/estado`, null, {
      params: { estado }
    });
    return response.data;
  }
}

const practicasService = new PracticasService();
export default practicasService;

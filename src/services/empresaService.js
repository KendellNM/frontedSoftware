import ENDPOINTS from "../api/endpoints";
import BaseService from "./baseServices";
import apiClient from "../api/clients";

class EmpresaService extends BaseService {
  constructor() {
    super(ENDPOINTS.EMPRESA);
  }

  async selectByRuc(ruc) {
    return apiClient.post(`${ENDPOINTS.EMPRESA}/seleccionar`, null, {
      params: { ruc }
    });
  }
}

const empresaService = new EmpresaService();
export default empresaService;

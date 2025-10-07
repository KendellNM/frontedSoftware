import ENDPOINTS from "../api/endpoints";
import BaseService from "./baseServices";

class EmpresaService extends BaseService {
  constructor() {
    super(ENDPOINTS.EMPRESA);
  }
}

const empresaService = new EmpresaService();
export default empresaService;

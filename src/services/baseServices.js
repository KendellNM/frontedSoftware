import apiClient from "../api/clients";
  
  
  export class BaseService {

  constructor(endpoint, ModelClass = null) {
    this.endpoint = endpoint;
    this.ModelClass = ModelClass;
  }
  transform(data) {
    if (!this.ModelClass) return data;
    return Array.isArray(data) 
      ? data.map(item => new this.ModelClass(item))
      : new this.ModelClass(data);
  }


  async getAll(params = {}) {
    const { page = 1, limit = 10, search = "", sortBy = "", sortOrder = "asc", ...filters } = params;

    const queryParams = {
      page,
      limit,
      ...(search && { search }),
      ...(sortBy && { sortBy, sortOrder }),
      ...filters
    };

    const response = await apiClient.get(this.endpoint, { params: queryParams });

    return {
      data: this.transform(response.data.data || response.data),
      pagination: response.data.pagination || {
        currentPage: page,
        totalPages: Math.ceil((response.data.total || 0) / limit),
        totalItems: response.data.total || 0,
        pageSize: limit
      }
    };
  }


  async getById(id) {
    const response = await apiClient.get(`${this.endpoint}/${id}`);
    return this.transform(response.data);
  }


  async create(data) {
    const response = await apiClient.post(this.endpoint, data);
    return this.transform(response.data);
  }


  async update(id, data) {
    const response = await apiClient.put(`${this.endpoint}/${id}`, data);
    return this.transform(response.data);
  }


  async patch(id, data) {
    const response = await apiClient.patch(`${this.endpoint}/${id}`, data);
    return this.transform(response.data);
  }


  async delete(id) {
    await apiClient.delete(`${this.endpoint}/${id}`);
    return { id, success: true };
  }

  async customAction(action, id = null, data = null) {
    const url = id ? `${this.endpoint}/${id}/${action}` : `${this.endpoint}/${action}`;
    const response = await apiClient.post(url, data);
    return this.transform(response.data);
  }
}

export default BaseService;
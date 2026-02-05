import { apiRequest, HttpMethod } from '@core/apiClient';

type QueryParams = Record<string, any>;
type CreatePayload<T> = Partial<T>;

export class GenericRepository<T, C = CreatePayload<T>, P extends QueryParams = QueryParams> {
  public base: string;

  constructor(baseEndpoint: string) {
    this.base = baseEndpoint;
  }

  getAll(params?: P): Promise<T[]> {
    return apiRequest<T[]>({ endpoint: this.base, options: { params } });
  }

  getById(id: number): Promise<T> {
    return apiRequest<T>({ endpoint: `${this.base}/${id}` });
  }

  create(data: C): Promise<T> {
    return apiRequest<T>({ endpoint: this.base, options: { method: HttpMethod.POST, body: data } });
  }

  update(id: number, data: C): Promise<T> {
    return apiRequest<T>({ endpoint: `${this.base}/${id}`, options: { method: HttpMethod.PUT, body: data } });
  }

  remove(id: number): Promise<void> {
    return apiRequest<void>({ endpoint: `${this.base}/${id}`, options: { method: HttpMethod.DELETE } });
  }
}

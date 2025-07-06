import { AxiosInstance } from 'axios';
import { ResultType } from './types';

export default class YouyoRequest {
  private readonly instance: AxiosInstance;

  constructor(axiosInstance: AxiosInstance) {
    this.instance = axiosInstance;
  }

  public get<R>(url: string, params?: { [key: string]: string | number | boolean }): Promise<ResultType<R>> {
    return this.instance.get(url, { params });
  }

  public post<R, T>(url: string, data: T): Promise<ResultType<R>> {
    return this.instance.post(url, data);
  }

  public put<R, T>(
    url: string,
    data: T,
    params?: {
      [key: string]: string | number | boolean;
    },
  ): Promise<ResultType<R>> {
    return this.instance.put(url, data, { params });
  }

  public delete<R, T>(
    url: string,
    data?: T,
    params?: {
      [key: string]: string | number | boolean;
    },
  ): Promise<ResultType<R>> {
    return this.instance.delete(url, { data, params });
  }

  public head<R, T>(url: string, data: T): Promise<ResultType<R>> {
    return this.instance.head(url, { data });
  }

  public options<R, T>(url: string, data: T): Promise<ResultType<R>> {
    return this.instance.options(url, { data });
  }

  public patch<R, T>(url: string, data: T): Promise<ResultType<R>> {
    return this.instance.patch(url, data);
  }

  public postForm<R, T>(url: string, data: T): Promise<ResultType<R>> {
    return this.instance.postForm(url, data);
  }

  public putForm<R, T>(url: string, data: T): Promise<ResultType<R>> {
    return this.instance.putForm(url, data);
  }

  public patchForm<R, T>(url: string, data: T): Promise<R> {
    return this.instance.patchForm(url, data);
  }
}

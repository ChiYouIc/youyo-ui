import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import YouyoRequest from './request';
import { handleRequestOnFulfilled, handleRequestOnRejected, handleResponseOnFulfilled, handleResponseOnRejected } from './handle';
import { ErrorResultType } from './types';

let requestTool: YouyoRequest | null = null;

type OptionsType = {
  baseUrl: string;
  headers?: { [key: string]: string };
  requestOnFulfilled?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig;
  requestOnRejected?: (error: Error) => Promise<any>;
  responseOnFulfilled?: (response: AxiosResponse) => any;
  responseOnRejected?: (error: AxiosError<ErrorResultType>) => Promise<any>;
};

function setupRequest(options: OptionsType) {
  console.log('setupRequest');
  const axiosInstance = axios.create({
    baseURL: options.baseUrl,
    headers: { 'Content-Type': 'application/json', ...options.headers },
  });

  const requestOnFulfilled = options.requestOnFulfilled || handleRequestOnFulfilled;
  const requestOnRejected = options.requestOnRejected || handleRequestOnRejected;
  const responseOnFulfilled = options.responseOnFulfilled || handleResponseOnFulfilled;
  const responseOnRejected = options.responseOnRejected || handleResponseOnRejected;

  axiosInstance.interceptors.request.use(requestOnFulfilled, requestOnRejected);
  axiosInstance.interceptors.response.use(responseOnFulfilled, responseOnRejected);

  requestTool = new YouyoRequest(axiosInstance);
}

function useRequest() {
  console.log('useRequest');
  // if (!requestTool) {
  //   throw new Error('request not initialized. use setupRequest(options) instead.');
  // }

  return {
    requestTool,
    get: requestTool?.get,
    post: requestTool?.post,
    put: requestTool?.put,
    delete: requestTool?.delete,
    head: requestTool?.head,
    options: requestTool?.options,
    patch: requestTool?.patch,
    postForm: requestTool?.postForm,
    putForm: requestTool?.putForm,
    patchForm: requestTool?.patchForm,
  };
}

abstract class AbstractRequest {
  static request: YouyoRequest;

  static {
    const { requestTool } = useRequest();
    this.request = requestTool;
  }
}

export { setupRequest, useRequest, YouyoRequest };

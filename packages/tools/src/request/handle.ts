import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { message } from 'ant-design-vue';
import { ErrorResultType } from './types';
import { useRouter } from 'vue-router';

/**
 * 请求之前处理
 * @param config
 */
export function handleRequestOnFulfilled(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
  // 在发送请求之前做些什么
  return config;
}

/**
 * 请求错误处理
 * @param error
 */
export function handleRequestOnRejected(error: Error) {
  // 对请求错误做些什么
  return Promise.reject(error);
}

/**
 * 正常请求处理
 * @param response
 */
export function handleResponseOnFulfilled(response: AxiosResponse) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return response.data;
}

/**
 * 请求异常处理
 * @param error
 */
export function handleResponseOnRejected(error: AxiosError<ErrorResultType>) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  const { response } = error;
  if (response?.status) {
    const router = useRouter();
    switch (response.status) {
      case 401:
        router.push({ path: '/login' }).then();
        break;
    }
    message.error(`${response.data.msg} : ${response.data.exception}`).then();
  }

  return Promise.reject(error);
}

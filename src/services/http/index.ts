import axios from 'axios';
import queryString from 'query-string';
import { LocalStorageService } from '../local-storage';
import './interceptors';


const localStorageService = new LocalStorageService();
export class HttpService {
  getTimeOutDuration() {
    // all api calls will be timeout
    // if server didn't responsed in 15 seconds
    const timeOutDuration = 15000;
    return timeOutDuration;
  }

  async getHeaders(options?: IHttpRequestOptions): Promise<Record<string, string>> {
    let headers: Record<string, string> = {};

    // eslint-disable-next-line prefer-destructuring
    if (options && options.headers) {
      const {headers: customHeaders} = options;
      headers = customHeaders;
      // return headers;
    }

    const token = await localStorageService.fetch('authToken');
    if (token && typeof token === 'string' && !headers.Authorization) headers.Authorization = token;

    if (!headers['Content-Type']) {
      headers['Content-Type'] = 'application/json';
    }

    // headers['App-Type'] = 'WEATHER';
    // prevent axios from caching the API data
    headers['Cache-Control'] = 'no-cache';
    headers['Access-Control-Allow-Origin'] = 'http://localhost:3000';
    return headers;
  }


  async get(
    url: string, queryParams: Record<string, string> | null = null,
    options?: IHttpRequestOptions,
    timeOut?: number,
  ) : Promise<any> {
    const headers: Record<string, string> = await this.getHeaders(options);
    return axios.get(url, {
      params: queryParams,
      paramsSerializer: function (params) {
        return queryString.stringify(params);
      },
      headers,
      timeout: timeOut ? timeOut : this.getTimeOutDuration(),
    });
  }

  async post(url: string, postData: unknown, options?: IHttpRequestOptions, timeOut?: number) : Promise<unknown> {
    const headers: Record<string, string> = await this.getHeaders(options);
    return axios.post(url, postData, { headers, timeout: timeOut ? timeOut : this.getTimeOutDuration() });
  }

  async put(url: string, postData: unknown, queryParams: Record<string, any> | null = null,
    options?: IHttpRequestOptions,
    timeOut?: number,
  ) : Promise<unknown> {
    const headers: Record<string, string> = await this.getHeaders(options);

    return axios.put(url, postData, {
      params: queryParams,
      paramsSerializer: function (params) {
        return queryString.stringify(params);
      },
      headers,
      timeout: timeOut ? timeOut : this.getTimeOutDuration(),
    });
  }

  async patch(url: string, postData: unknown, options?: IHttpRequestOptions, timeOut?: number) : Promise<unknown> {
    const headers: Record<string, string> = await this.getHeaders(options);

    return axios.patch(url, postData, { headers, timeout: timeOut ? timeOut : this.getTimeOutDuration() });
  }

  async delete(url: string, options?: IHttpRequestOptions, timeOut?: number,) : Promise<unknown> {
    const headers: Record<string, string> = await this.getHeaders(options);

    return axios.delete(url, { headers, timeout: timeOut ? timeOut : this.getTimeOutDuration() });
  }
}

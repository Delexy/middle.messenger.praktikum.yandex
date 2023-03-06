import { dataToJSON } from "../../utils/dataPrepare";
import queryStringify from "../../utils/queryStringify";

const METHODS: Record<string, string> = {
  GET: "GET",
  PUT: "PUT",
  POST: "POST",
  DELETE: "DELETE",
};

type ResponseType = {
  status: number;
  response?: {
    [key: string]: unknown;
    reason?: string;
  };
};

class HTTPTransport<T = ResponseType> {
  private _baseUrl: string;

  constructor(baseUrl = "") {
    this._baseUrl = baseUrl;
  }

  get = (url: string, options: Record<string, any> = { timeout: 5000 }): Promise<T> => {
    return this.request(this._baseUrl + url, { ...options, method: METHODS.GET }, options.timeout);
  };
  put = (url: string, options: Record<string, any> = { timeout: 5000 }): Promise<T> => {
    return this.request(this._baseUrl + url, { ...options, method: METHODS.PUT }, options.timeout);
  };
  post = (url: string, options: Record<string, any> = { timeout: 5000 }): Promise<T> => {
    return this.request(this._baseUrl + url, { ...options, method: METHODS.POST }, options.timeout);
  };
  delete = (url: string, options: Record<string, any> = { timeout: 5000 }): Promise<T> => {
    return this.request(this._baseUrl + url, { ...options, method: METHODS.DELETE }, options.timeout);
  };

  request = (url: string, options: Record<string, any> = { method: METHODS.GET, data: "" }, timeout = 5000): Promise<T> => {
    return new Promise((resolve, reject) => {
      const { headers } = options;
      let { method, data } = options;
      if (!method) {
        method = METHODS.GET;
      }
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);
      xhr.withCredentials = true;

      const handleError = (err: Error) => {
        reject({ status: 0, response: { reason: err.message } });
      };

      if (method === METHODS.GET && data) {
        data = queryStringify(data);
        url += `?${data}`;
      }
      if (method !== METHODS.GET && data) {
        data = dataToJSON(data);
        xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
      }

      // Headers
      if (headers) {
        for (const header in headers) {
          xhr.setRequestHeader(header, headers[header]);
        }
      }

      // Errors and abort
      xhr.onerror = handleError as () => never;
      xhr.onabort = handleError as () => never;
      xhr.ontimeout = () => {
        reject({ status: 0, response: "Timeout" });
      };

      const timer = setTimeout(() => {
        xhr.abort();
      }, timeout);

      // Send request
      xhr.onload = function () {
        try {
          resolve({ status: xhr.status, response: JSON.parse(xhr.response) } as T);
        } catch (err) {
          resolve({ status: xhr.status, response: xhr.response } as T);
        }
        clearTimeout(timer);
      };

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  };
}

function fetchWithRetry(url: string, options = { retries: 5 }) {
  let retriesAmount = options?.retries;
  const http = new HTTPTransport();

  const handler: any = (xhr: XMLHttpRequest) => {
    if (`${xhr.status}`.startsWith("2")) {
      return xhr;
    } else {
      retriesAmount--;
      if (retriesAmount > 0) {
        return http.request(url, options).then(handler).catch(handler);
      } else {
        throw new Error("Error");
      }
    }
  };

  return http.request(url, options).then(handler).catch(handler);
}

export { HTTPTransport as default, fetchWithRetry };

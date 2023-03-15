import queryStringify from "../../utils/queryStringify";

enum METHODS {
  GET = "GET",
  PUT = "PUT",
  POST = "POST",
  DELETE = "DELETE",
}

type ResponseType = {
  status: number;
  response?: {
    [key: string]: unknown;
    reason?: string;
  };
};

type Options = {
  timeout?: number;
  method?: string;
  headers?: Record<string, string>;
  data?: string | Record<string, unknown> | FormData;
  [key: string]: unknown;
};

type HTTPMethod<T = ResponseType> = (url: string, options?: Options, timeout?: number) => Promise<T>;

class HTTPTransport {
  private _baseUrl: string;

  constructor(baseUrl = "") {
    this._baseUrl = baseUrl;
  }

  get: HTTPMethod = (url, options = { timeout: 5000 }) => {
    return this.request(this._baseUrl + url, { ...options, method: METHODS.GET }, options.timeout);
  };
  put: HTTPMethod = (url, options = { timeout: 5000 }) => {
    return this.request(this._baseUrl + url, { ...options, method: METHODS.PUT }, options.timeout);
  };
  post: HTTPMethod = (url, options = { timeout: 5000 }) => {
    return this.request(this._baseUrl + url, { ...options, method: METHODS.POST }, options.timeout);
  };
  delete: HTTPMethod = (url, options = { timeout: 5000 }) => {
    return this.request(this._baseUrl + url, { ...options, method: METHODS.DELETE }, options.timeout);
  };

  request: HTTPMethod = (url, options = { method: METHODS.GET, data: "" }, timeout = 5000) => {
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
        if(typeof data !== 'string' && !(data instanceof FormData)) {
          data = queryStringify(data);
        }

        url += `?${data}`;
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
          try {
            resolve({ status: xhr.status, response: JSON.parse(xhr.response) });
          } catch (err) {
            resolve({ status: xhr.status, response: xhr.response });
          }
        } catch (err) {
          resolve({ status: xhr.status, response: xhr.response });
        }
        clearTimeout(timer);
      };

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.send(data as XMLHttpRequestBodyInit);
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

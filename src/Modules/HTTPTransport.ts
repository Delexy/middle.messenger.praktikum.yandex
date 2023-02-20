const METHODS: Record<string, string> = {
  GET: "GET",
  PUT: "PUT",
  POST: "POST",
  DELETE: "DELETE",
};

function queryStringify(data: string) {
  return (
    "?" +
    Object.entries(data)
      .map((entry) => `${entry[0]}=${entry[1]}`)
      .join("&")
  );
}

class HTTPTransport {
  get = (url: string, options = { timeout: 5000 }) => {
    return this.request(url, { ...options, method: METHODS.GET }, options.timeout);
  };

  // PUT, POST, DELETE
  put = (url: string, options = { timeout: 5000 }) => {
    return this.request(url, { ...options, method: METHODS.PUT }, options.timeout);
  };
  post = (url: string, options = { timeout: 5000 }) => {
    return this.request(url, { ...options, method: METHODS.POST }, options.timeout);
  };
  delete = (url: string, options = { timeout: 5000 }) => {
    return this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);
  };

  request = (url: string, options: Record<string, any> = { method: METHODS.GET, data: ""}, timeout = 5000) => {
    return new Promise((resolve, reject) => {
      let { method, data, headers } = options;
      if (!method) {
        method = METHODS.GET;
      }
      const xhr = new XMLHttpRequest();

      const handleError = (err: Error) => {
        console.log(err);
      };

      if (method === METHODS.GET && data) {
        data = queryStringify(data);
        url += data;
      }

      if (method !== METHODS.GET && data) {
        data = JSON.stringify(data);
        xhr.setRequestHeader("Content-Type", "application/json");
      }

      xhr.open(method, url);

      // Headers
      xhr.setRequestHeader("Content-Type", "text/plain");
      if (headers) {
        for (const header in headers) {
          xhr.setRequestHeader(header, headers[header]);
        }
      }

      // Errors and abort
      xhr.onerror = handleError as () => never;
      xhr.onabort = handleError as () => never;
      xhr.ontimeout = () => {
        reject(new Error("Timeout"));
      };

      const timer = setTimeout(() => {
        xhr.abort();
      }, timeout);

      // Send request
      xhr.onloadend = () => {
        if (xhr.readyState === 4) {
          resolve(xhr);
          clearTimeout(timer);
        }
      };

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  };
}

function fetchWithRetry(url: string, options = { retries: 5,  }) {
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

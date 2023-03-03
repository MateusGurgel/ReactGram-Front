export const api = "http://localhost:5234/api";
export const uploads = "http://localhost:5234/uploads";

export const requestConfig = (
  method: string,
  data?: BodyInit,
  token?: string,
  image?: true
) => {
  let config: RequestInit;
  method = method.toUpperCase();

  if (image) {
    config = {
      method: method,
      body: data,
      headers: {},
    };
  } else if (method === "DELETE" || data === null) {
    config = {
      method: method,
    };
  } else {
    config = {
      method: method,
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  if (token) {
    config.headers = {...config.headers, "Authorization" : `Bearer ${token}`}
  }

  return config;
};

interface HandlerFunction {
  (path: string, params?: any, headers?: any): any
}

interface Methods {
  [key: string]: HandlerFunction
}

interface OpenAI {
  [method: string]: HandlerFunction
}

export const fetcher = async (requestUrl: string, options: any) =>
  fetch(requestUrl, options)
    .then(async (res) => {
      const { url, status } = res

      const { errors, error, ...restData } = await res.json().catch(() => ({}))

      return {
        url,
        status,
        data: Object.keys(restData).length ? restData : null,
        errors: errors || (error && [error]),
      }
    })
    .catch((err) => {
      console.error(err)
    })

const uriString = (path: string) => `/api/${path}`
const getHeaders = (headers = {}) => ({
  Accept: 'application/json',
  'Content-Type': 'application/json',
  ...headers,
})

export const api = {
  get: (path: string, params: any, headers = {}) =>
    fetcher(uriString(path), {
      method: 'GET',
      headers: getHeaders(headers),
    }),
  post: (path: string, body: object, headers = {}) =>
    fetcher(uriString(path), {
      method: 'POST',
      headers: getHeaders(headers),
      body: JSON.stringify(body),
    }),
}

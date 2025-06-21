import axios, { type AxiosRequestConfig, type Method, type AxiosResponse } from 'axios'

export const commonAPI = async <T = any>(
  httpMethod: Method,
  url: string,
  reqBody?: any,
  reqHeader?: Record<string, string>
): Promise<AxiosResponse<T>> => {

  const reqConfig: AxiosRequestConfig = {
    method: httpMethod,
    url,
    data: reqBody,
    headers: reqHeader || {
      'Content-Type': 'application/json',
    },
  }

  try {
    const response = await axios<T>(reqConfig)
    return response
  } catch (error: any) {
    // If you want to handle or transform errors, you can do it here
    if (error.response) return error.response
    throw error
  }
}



// import axios from 'axios'

// export const commonAPI = async (
//   method: 'GET' | 'POST' | 'PUT' | 'DELETE',
//   url: string,
//   body?: any,
//   headers?: Record<string, string>
// ) => {
//   try {
//     const response = await axios({
//       method,
//       url,
//       data: body,
//       headers: headers || {
//         'Content-Type': 'application/json',
//       },
//     })
//     return response
//   } catch (error) {
//     return error
//   }
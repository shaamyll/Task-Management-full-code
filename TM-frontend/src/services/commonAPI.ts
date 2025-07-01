import axios, {
  type AxiosRequestConfig,
  type Method,
  type AxiosResponse,
} from 'axios'
import axiosInstance from './AxiosInstance'

export const commonAPI = async <T = any>(
  httpMethod: Method,
  url: string,
  reqBody?: any,
  reqHeader?: Record<string, string>
): Promise<AxiosResponse<T>> => {
  const config: AxiosRequestConfig = {
    method: httpMethod,
    url,
    headers: {
      'Content-Type': 'application/json',
      ...(reqHeader || {}),
    },
  }

  // Only set 'data' if the method is not GET
  if (httpMethod !== 'GET' && reqBody) {
    config.data = reqBody
  }

  try {
    const response = await axiosInstance<T>(config)
    return response
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        return error.response
      } else {
        console.error("Axios error:", error.message)
        throw new Error("Network error. Please try again.")
      }
    }

    console.error("Unexpected error:", error)
    throw new Error("Something went wrong.")
  }
}

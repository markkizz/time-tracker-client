import { AxiosError } from 'axios'
import { clearToken } from '@/features/authentication/utils'
import { HttpClient } from '../http'
import { ILatestTimeEntry, ILoginResponse } from './types'

export class TimeTrackerHttpClient {
  private _httpClient: HttpClient

  constructor() {
    const client = HttpClient.create({
      baseURL: import.meta.env.VITE_BASE_API_URL
    })

    client.registerRequestInterceptor(
      (config) => {
        if (localStorage.getItem('token')) {
          const token = localStorage.getItem('token')
          config.headers = {
            ...config.headers,
            authorization: `Bearer ${token}`
          }
        }
        return config
      },
      (error) => Promise.reject(error)
    )

    client.registerResponseInterceptor(
      (response) => response,
      (error) => {
        const err = error as AxiosError
        if (err.response?.status === 401) {
          clearToken()
        }
        Promise.reject(error)
      }
    )

    this._httpClient = client
  }

  public async healthCheck() {
    await this._httpClient.get('/')
  }

  public async login(username: string, password: string) {
    const response = await this._httpClient.post<
      { username: string; password: string },
      ILoginResponse
    >('/v1/timetracker/auth/login', {
      username,
      password
    })
    return response.data
  }

  public async getLatestTimeEntry() {
    const response = await this._httpClient.get<ILatestTimeEntry>('/v1/timetracker')
    return response.data
  }
}

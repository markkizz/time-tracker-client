import { HttpClient } from '../http'
import { ILoginResponse } from './types'

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

    this._httpClient = client
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
}

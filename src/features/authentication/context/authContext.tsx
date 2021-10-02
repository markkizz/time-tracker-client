import {
  createContext,
  FunctionalComponent,
} from 'preact'
import { useEffect, useState } from 'preact/hooks'
import { useLocation } from 'wouter-preact'

import TimeTrackerService, {
  ILoginResponse
} from '@/common/services/timetracker'
import { parseJwt } from '@/common/helpers/convertor'
import { IUser } from '@/common/services/timetracker/types'

export interface IAuthContext {
  isAuthenticated: boolean
  user: IUser | undefined
  signIn: (username: string, password: string) => Promise<ILoginResponse>
  signOut: () => Promise<void>
}

// @ts-ignore
export const authContext = createContext<IAuthContext>()

export const useProvideAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [user, setUser] = useState<IUser>()

  const [location, setLocation] = useLocation()

  const signIn = async (username: string, password: string) => {
    try {
      const response = await TimeTrackerService.login(username, password)
      localStorage.setItem('token', response.accessToken)
      const user = parseJwt<IUser>(response.accessToken)
      setIsAuthenticated(true)
      setUser(user)
      return response
    } catch (error) {
      setIsAuthenticated(false)
      throw error
    }
  }

  const signOut = async () => {
    setIsAuthenticated(false)
    setLocation('/login')
    setUser(undefined)
  }

  useEffect(() => {
    const token = localStorage.getItem('token') ?? ''
    const userAuth = user ? user : parseJwt<IUser>(token)
    const expiredAt = userAuth?.exp ? Number(new Date(userAuth.exp * 1000)) : 0
    const nowInUnix = Number(new Date())

    if (!token || nowInUnix > expiredAt) {
      isAuthenticated && setIsAuthenticated(false)
      setLocation('/login')
    } else {
      if (!user) {
        setUser(userAuth)
      }
      setIsAuthenticated(true)
    }


  }, [location])

  return {
    user,
    isAuthenticated,
    signIn,
    signOut
  }
}

export const AuthProvider: FunctionalComponent = ({ children }) => {
  const auth = useProvideAuth()
  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

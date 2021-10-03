import { useCallback, useEffect } from 'preact/hooks'
import { Redirect, Route, Switch, useLocation } from 'wouter-preact'

import Home from '@/features/clock'
import { Login } from '@/features/authentication'
import { useAuth } from '@/features/authentication/hooks/useAuth'
import Navbar from '@/common/components/Navbar'
import TimeTracker from '@/common/services/timetracker'

const Routes = () => {
  const auth = useAuth()
  const [location, setLocation] = useLocation()

  const serverHealthCheck = useCallback(async () => {
    await TimeTracker.healthCheck()
  }, [location])

  useEffect(() => {
    if (location === '/') {
      setLocation('/clock')
    }

    if (location === '/login' && auth.isAuthenticated) {
      setLocation('/clock')
    }
  }, [location, auth.isAuthenticated])

  useEffect(() => {
    serverHealthCheck()
  }, [])

  return (
    <>
      <Switch location={location}>
        {!auth.isAuthenticated ? (
          <Route path="/login" component={Login} />
        ) : (
          <Navbar>
            <Route path="/clock" component={Home} />
          </Navbar>
        )}
        <Redirect to="/" />
      </Switch>
    </>
  )
}

export default Routes

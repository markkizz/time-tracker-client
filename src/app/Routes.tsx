import { useEffect } from 'preact/hooks'
import { Redirect, Route, Switch, useLocation } from 'wouter-preact'

import Home from '../features/clock'
import { Login } from '@/features/authentication'
import { useAuth } from '@/features/authentication/hooks/useAuth'

const Routes = () => {
  const auth = useAuth()
  const [location, setLocation] = useLocation()
  useEffect(() => {
    if (location === '/') {
      setLocation('/clock')
    }
  }, [location])

  return (
    <>
      <Switch location={location}>
        {!auth.isAuthenticated ? (
          <Route path="/login" component={Login} />
        ) : (
          <Route path="/clock" component={Home} />
        )}
        <Redirect to="/" />
      </Switch>
    </>
  )
}

export default Routes

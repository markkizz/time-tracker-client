import { useEffect } from 'preact/hooks'
import { Redirect, Route, Switch, useLocation } from 'wouter-preact'

import Home from '../features/clock'
import { Login } from '@/features/authentication'

const Routes = () => {
  const isAuthenticated = true
  const [location, setLocation] = useLocation()
  useEffect(() => {
    if (location === '/') {
      setLocation('/clock')
    }
  }, [location])

  useEffect(() => {
    if (!isAuthenticated) {
      setLocation('/login')
    }
  }, [isAuthenticated])
  return (
    <>
      <Switch location={location}>
        <Route path="/login" component={Login} />
        <Route path="/clock" component={Home} />
        <Redirect to="/" />
      </Switch>
    </>
  )
}

export default Routes

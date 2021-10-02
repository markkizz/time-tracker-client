import { useEffect } from 'preact/hooks'
import { Redirect, Route, Switch, useLocation } from 'wouter-preact'

import Home from '@/features/clock'
import { Login } from '@/features/authentication'
import { useAuth } from '@/features/authentication/hooks/useAuth'
import Navbar from '@/common/components/Navbar'

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

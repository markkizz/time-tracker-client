import { FunctionalComponent } from 'preact'
import { Route, Redirect, RouteProps, useLocation } from 'wouter-preact'

interface IPrivateRouteProps extends RouteProps {
  render: FunctionalComponent
}

const PrivateRoute = ({
  render: Component,
  ...props
}: IPrivateRouteProps) => {
  const [location, setLocation] = useLocation()
  const isAuthenticated = false
  console.log('isAuthenticated route');
  // if (!isAuthenticated) {
  //   console.log('set location');
  //   setLocation('/auth/login')
  //   return null
  // }
  // const isAuthenticated = useSelector((state: any) => state.authenticationReducer.isAuthenticated)
  // return <Component />
  return isAuthenticated ? (
    <Component />
  ) : (
    <Redirect to="/auth/login" />
  )
}

export default PrivateRoute

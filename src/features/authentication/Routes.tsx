import { NestedRoute } from '@/routes/NestedRoute'
import {
  Redirect,
  Route,
} from 'wouter-preact'
import { Login } from './Login'

const routes = [{ path: '/login', component: Login }]

export const AuthenticationRoutes = (props: { base?: string }) => {
  const isAuthenticated = true
  return (
    <>
    {/* <NestedRoute base={props.base || '/'}> */}
      {routes.map(({ path, component: Component }) => (
        isAuthenticated ? (
          <Route key={path} path={path} component={Component} />
        ) : (
          <Redirect to="/" />
        )
      ))}
    {/* </NestedRoute> */}
    </>
  )
}

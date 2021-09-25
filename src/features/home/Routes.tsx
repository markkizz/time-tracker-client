import { NestedRoute } from '@/routes/NestedRoute'
import { Route } from 'wouter-preact'
import { Home } from './Home'

const routes = [{ path: '/home', component: Home }]

export const HomeRoutes = (props: { base?: string }) => {
  return (
    <>
      {/* <NestedRoutebase={props.base || '/'}> */}
      {routes.map(({ path, component: Component }) => (
        <Route key={path} path={path} component={Component} />
      ))}
      {/* </NestedRoute> */}
    </>
  )
}

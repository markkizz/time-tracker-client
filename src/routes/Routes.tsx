import {
  Redirect,
  Route,
  Router,
  Switch,
  useLocation,
  useRoute,
  useRouter
} from 'wouter-preact'
import { HomeRoutes } from '../features/home'
import { AuthenticationRoutes } from '../features/authentication'
import PrivateRoute from './PrivateRoute'
import { Login } from '../features/authentication/Login'
import { Home } from '../features/home/Home'

const routes = [
  { name: 'Home', restricted: true, path: '/', component: HomeRoutes },
  {
    name: 'Auth',
    restricted: false,
    path: '/',
    component: AuthenticationRoutes
  }
]

const Routes = () => {
  const isAuthenticated = true
  const router = useRouter()
  const [parentLocation] = useLocation()
  // console.log(router.matcher())
  const [isMatch, smth] = useRoute(parentLocation)
  console.log('router', router)
  console.log('parentLocation', parentLocation)
  console.log('route', isMatch, smth)
  console.log(`${router.base}`)
  return (
    <Router base="/app">
      {routes.map(
        ({ component: Component, ...route }) =>
          route.restricted ? (
            isAuthenticated ? (
              <Component base={route.path} />
            ) : (
              <Redirect to="/login" />
            )
          ) : (
            <Component base={route.path} />
          )
        // route.restricted ? (
        //   <PrivateRoute
        //     key={route.name}
        //     render={() => <Component base={route.path} />}
        //     // render={() => <Component base={route.path} />}
        //   />
        // ) : (
        //   <Component base={route.path} />
        // )
      )}
      <Route>Not found</Route>
      {/* <Redirect to="/home"></Redirect> */}
    </Router>
  )
}

export default Routes

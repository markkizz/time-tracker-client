import {
  Redirect,
  useLocation,
  useRouter,
  RouterProps,
  Router,
  RouteProps,
  Route,
  Switch,
  useRoute
} from 'wouter-preact'
import { INestedRouteProps } from '@/routes/types'

export const NestedRoute = (props: INestedRouteProps) => {
  const router = useRouter()
  const [parentLocation] = useLocation()
  const route = useRoute(parentLocation)
  const nestedBase = `${router.base}${props.base || ''}`
  console.log(nestedBase);
  console.log(parentLocation);
  console.log(route);
  // if (!parentLocation.startsWith(nestedBase)) return <Redirect to="/404" />

  return (
    <Router base={nestedBase}>
      {props.children}
      {/* <Redirect to={`${router.base}/home`} /> */}
      <Route path="/:rest*">
        {(params) => `404, Sorry the page ${params.rest} does not exist!`}
      </Route>
    </Router>
  )
}

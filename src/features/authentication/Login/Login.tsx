import { useEffect } from "preact/hooks";
import { useLocation } from "wouter-preact";

export const Login = () => {
  const isAuthenticated = false
  const [_, setLocaltion] = useLocation()
  useEffect(() => {
    console.log('isAuthenticated', isAuthenticated);
    if (isAuthenticated) {
      setLocaltion('/')
    }
  }, [isAuthenticated])
  return <div>Login</div>
}

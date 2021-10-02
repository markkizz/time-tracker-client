import { useAuth } from "../hooks/useAuth"

export function clearToken() {
  const auth = useAuth()
  auth.signOut()
}
import { useAuth } from '@/features/authentication/hooks/useAuth'
import { FunctionalComponent } from 'preact'
import { useCallback } from 'preact/hooks'

export const Navbar: FunctionalComponent = ({ children }) => {
  const auth = useAuth()
  const handleSignOut = useCallback(() => {
    auth.signOut()
  }, [auth.isAuthenticated])
  return (
    <>
      <div className="bg-white rounded-b-md flex items-center w-full px-3 shadow-sm border border-gray-200 absolute">
        <div
          className="cursor-pointer ml-auto text-size-sm text-primary p-3"
          onClick={handleSignOut}
        >
          Sign out
        </div>
      </div>
      {children}
    </>
  )
}

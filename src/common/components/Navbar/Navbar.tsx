import { useAuth } from "@/features/authentication/hooks/useAuth";
import { FunctionalComponent } from "preact";

export const Navbar: FunctionalComponent = ({ children }) => {
  const auth = useAuth()
  return (
    <>
      <div className="bg-white rounded-b-md flex items-center w-full px-3 shadow-sm border border-gray-200 absolute">
        <div className="cursor-pointer ml-auto text-size-sm text-primary p-3" onClick={auth.signOut}>
          Sign out
        </div>
      </div>
      {children}
    </>
  )
}
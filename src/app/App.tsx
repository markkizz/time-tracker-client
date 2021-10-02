import Routes from './Routes'
import { AuthProvider } from '@/features/authentication/context/authContext'

export function App() {
  return (
    <div className="bg-neutralBlue w-screen h-screen">
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </div>
  )
}

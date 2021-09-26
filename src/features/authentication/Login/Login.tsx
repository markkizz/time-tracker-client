import { useEffect } from 'preact/hooks'
import { useLocation } from 'wouter-preact'
import logoSrc from '@/assets/hourglass.png'

import Card from '@/common/components/Card'
import Input, { PasswordInput } from '@/common/components/Input'

export const Login = () => {
  const isAuthenticated = false
  const [_, setLocaltion] = useLocation()
  useEffect(() => {
    if (isAuthenticated) {
      setLocaltion('/')
    }
  }, [isAuthenticated])
  return (
    <div className="flex justify-center items-center w-full h-full">
      <Card>
        <div className="row space-y-4">
          <div className="col-12 flex justify-center">
            <img src={logoSrc} alt="logo hour glass" width="80" height="80" />
          </div>
          <div className="col-12 flex justify-center">
            <Input
              label="Email"
              type="email"
              className="w-250px"
              errorMessage="Invalid username field !"
            />
          </div>
          <div className="col-12 flex justify-center">
            <PasswordInput
              label="Password"
              className="w-250px"
              hideDetails
            />
          </div>
        </div>
      </Card>
    </div>
  )
}

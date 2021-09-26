import { useEffect, useState } from 'preact/hooks'
import { useLocation } from 'wouter-preact'
import logoSrc from '@/assets/hourglass.png'

import Card from '@/common/components/Card'
import Input, { PasswordInput } from '@/common/components/Input'
import Button from '@/common/components/Button'
import { Banner } from './components/Banners'

export const Login = () => {
  const isAuthenticated = false
  const [_, setLocaltion] = useLocation()

  const [btnLoading, setBtnLoading] = useState<boolean>(false)

  const errorLogin = ''

  useEffect(() => {
    if (isAuthenticated) {
      setLocaltion('/')
    }
  }, [isAuthenticated])

  useEffect(() => {
    setBtnLoading(true)
    setTimeout(() => {
      setBtnLoading(false)
    }, 2500);
  }, [])
  return (
    <div className="flex justify-center items-center w-full h-full">
      <Card className="py-32px">
        <div className="row space-y-4">
          <div className="col-12 flex justify-center">
            <img src={logoSrc} alt="logo hour glass" width="80" height="80" />
          </div>
          <div className="col-12 flex justify-center">
            {errorLogin && <Banner />}
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
            <PasswordInput label="Password" className="w-250px" hideDetails />
          </div>
          <div className="col-12 flex justify-center !mt-24px">
            <Button className="w-250px h-40px flex items-center justify-center" btnLoading={btnLoading}>
              Sign In
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

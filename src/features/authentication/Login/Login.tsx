import { useEffect, useState } from 'preact/hooks'
import { useLocation } from 'wouter-preact'
import { useFormik } from 'formik'

import { loginSchema } from './schema'

import logoSrc from '@/assets/hourglass.png'

import Card from '@/common/components/Card'
import Input, { PasswordInput } from '@/common/components/Input'
import Button from '@/common/components/Button'
import { Banner } from './components/Banners'

export const Login = () => {
  const isAuthenticated = false
  const [_, setLocaltion] = useLocation()

  const [btnLoading, setBtnLoading] = useState<boolean>(false)

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      console.log('Submit')
      console.log(values)
      console.log('-----------')
    }
  })

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
    }, 2500)
  }, [])
  return (
    <div className="flex justify-center items-center w-full h-full">
      <Card className="py-32px">
        <form onSubmit={formik.handleSubmit}>
          <div className="row space-y-4">
            <div className="col-12 flex justify-center">
              <img src={logoSrc} alt="logo hour glass" width="80" height="80" />
            </div>
            <div className="col-12 flex justify-center">
              {errorLogin && <Banner />}
            </div>
            <div className="col-12 flex justify-center">
              <Input
                name="username"
                label="Email"
                type="email"
                className="w-250px"
                value={formik.values.username}
                errorMessage={formik.errors.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            <div className="col-12 flex justify-center">
              <PasswordInput
                name="password"
                label="Password"
                className="w-250px"
                value={formik.values.password}
                errorMessage={formik.errors.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            <div className="col-12 flex justify-center">
              <Button
                className="w-250px h-40px flex items-center justify-center"
                type="submit"
                btnLoading={btnLoading}
              >
                Sign In
              </Button>
            </div>
          </div>
        </form>
      </Card>
    </div>
  )
}

import { useEffect, useState } from 'preact/hooks'
import { useLocation } from 'wouter-preact'
import { useFormik } from 'formik'

import { loginSchema } from './schema'

// import logoSrc from '@/assets/hourglass.png'

import Card from '@/common/components/Card'
import Input, { PasswordInput } from '@/common/components/Input'
import Button from '@/common/components/Button'
import { Banner } from './components/Banners'
import { AxiosError } from 'axios'
import { useAuth } from '../hooks/useAuth'

const initialFormLoginState = {
  username: '',
  password: ''
}

export const Login = () => {
  const [_, setLocaltion] = useLocation()

  const [errorLogin, setErrorLogin] = useState('')
  const [btnLoading, setBtnLoading] = useState<boolean>(false)

  const auth = useAuth()

  const formik = useFormik({
    initialValues: initialFormLoginState,
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        setBtnLoading(true)
        await auth.signIn(values.username, values.password)
        setLocaltion('/clock')
        setErrorLogin('')
      } catch (error) {
        const err = error as AxiosError
        if (
          err.response &&
          (err.response.status < 200 ||
            (err.response.status >= 400 && err.response.status < 500))
        ) {
          setErrorLogin('The email or password you entered is incorrect.')
          return
        } else {
          setErrorLogin('Something went wrong.')
        }
      } finally {
        setBtnLoading(false)
      }
    }
  })

  useEffect(() => {
    return () => {
      setErrorLogin('')
      formik.resetForm()
      formik.setErrors(initialFormLoginState)
    }
  }, [])

  return (
    <div className="flex justify-center items-center w-full h-full">
      <Card className="py-32px">
        <form onSubmit={formik.handleSubmit}>
          <div className="row space-y-4">
            <div className="col-12 flex justify-center">
              <img src="/hourglass.png" alt="logo hour glass" width="80" height="80" />
            </div>
            <div className="col-12 flex justify-center">
              {errorLogin && <Banner text={errorLogin} />}
            </div>
            <div className="col-12 flex justify-center">
              <Input
                name="username"
                label="Email"
                type="email"
                className="w-250px transition"
                value={formik.values.username}
                errorMessage={
                  formik.touched.username ? formik.errors.username : ''
                }
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            <div className="col-12 flex justify-center">
              <PasswordInput
                name="password"
                label="Password"
                className="w-250px transition"
                value={formik.values.password}
                errorMessage={
                  formik.errors.password && formik.touched.password
                    ? formik.errors.password
                    : ''
                }
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

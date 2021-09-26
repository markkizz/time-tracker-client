import * as yup from 'yup'

export const loginSchema = yup.object({
  email: yup.string().email('Invalid email format.').required('required.'),
  password: yup.string()
})
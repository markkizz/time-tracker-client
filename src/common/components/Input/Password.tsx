import { FunctionalComponent } from 'preact'
import { useState } from 'preact/hooks'
import { Input } from './Input'

export interface IPasswordInputProps {
  id?: string
  label?: string
  labelFor?: string
  inputFor?: string
  placeHolder?: string
  className?: string
  errorMessage?: string
  hideDetails?: boolean
  inputName?: string
  // onShowClick?: JSX.MouseEventHandler<HTMLDivElement>
}

export const PasswordInput: FunctionalComponent<IPasswordInputProps> = (props) => {
  const [showPassword, setShowPassword] = useState(false)

  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }
  return (
    <Input
      type={showPassword ? 'text' : 'password'}
      {...props}
      append={() => (
        <div
          onClick={handleShowPassword}
          className="flex items-center justify-center rounded-tl rounded-bl z-10 text-gray-600 text-xs h-full w-full mr-2"
        >
          <div className="text-primary">{showPassword ? 'hide' : 'show'}</div>
        </div>
      )}
    />
  )
}

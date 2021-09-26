import { FunctionalComponent } from 'preact'
import Loading from '../Loading'

export interface IButtonProps extends JSX.HTMLAttributes<HTMLButtonElement> {
  btnLoading?: boolean
}

export const Button: FunctionalComponent<IButtonProps> = ({
  className,
  btnLoading = false,
  ...props
}) => {
  // hover:bg-blue-600 active:bg-blue-700
  const buttonClassName =
    'flex justify-center items-center justtify px-4 py-2 rounded-md text-sm font-medium border-0 focus:outline-none focus:ring transition text-white bg-primary hover:bg-primary-dark' +
    ` ${className}`
  return (
    <>
      <button {...props} className={buttonClassName}>
        {btnLoading ? <Loading size="28" /> : props.children}
      </button>
    </>
  )
}

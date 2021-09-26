import { FunctionalComponent } from 'preact'

export interface IButtonProps extends JSX.HTMLAttributes<HTMLButtonElement> {
  //
}

export const Button: FunctionalComponent<IButtonProps> = ({
  className,
  ...props
}) => {
  // hover:bg-blue-600 active:bg-blue-700
  const buttonClassName =
    'px-4 py-2 rounded-md text-sm font-medium border-0 focus:outline-none transition text-white bg-primary ' +
    ` ${className}`
  return (
    <button {...props} className={buttonClassName}>
      {props.children}
    </button>
  )
}

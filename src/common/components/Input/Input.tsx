import { ComponentType, FunctionalComponent, JSX } from 'preact'

export interface InputProps extends JSX.HTMLAttributes<HTMLInputElement> {
  id?: string
  label?: string
  labelFor?: string
  inputFor?: string
  placeHolder?: string
  type?: 'text' | 'number' | 'password' | 'email'
  className?: string
  errorMessage?: string
  hideDetails?: boolean
  inputName?: string
  append?: ComponentType
}

export const Input: FunctionalComponent<InputProps> = ({
  className,
  inputFor,
  hideDetails = false,
  errorMessage,
  id,
  label,
  labelFor,
  placeHolder,
  type = 'text',
  inputName,
  append: AppendComponent,
  ...props
}) => {
  const inputClassName = `text-sm sm:text-base relative w-full bg-secondary border ${
    errorMessage ? 'border-error' : 'border-secondary'
  } rounded placeholder-gray-400  focus:outline-none p-2 ${
    className ? ` ${className}` : ''
  }`
  return (
    <div className="flex flex-col">
      {label && (
        <label
          for={inputFor}
          className="mb-1 text-10px sm:text-xs tracking-wide text-gray-600"
        >
          {label}
        </label>
      )}
      <div
        className={`relative ${!errorMessage && !hideDetails ? 'mb-5.5' : ''}`}
      >
        <input
          id={id}
          name={inputName}
          type={type}
          placeholder={placeHolder}
          className={inputClassName}
          {...props}
        />
        {AppendComponent && (
          <div className="absolute flex right-0 top-0 h-full w-10">
            {<AppendComponent />}
          </div>
        )}
      </div>
      {errorMessage && (
        <span class="flex items-center tracking-wide text-red-500 text-xs mt-1 ml-2 transition">
          {errorMessage}
        </span>
      )}
    </div>
  )
}

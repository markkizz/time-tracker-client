import { FunctionalComponent } from 'preact'

export interface ICardProps {
  className?: string
}

export const Card: FunctionalComponent<ICardProps> = (props) => {
  const className = `bg-white rounded-md w-sm p-4 shadow-dropShadow${props.className ? ` ${props.className}` : ''}`
  return (
    <div className={className}>
      {props.children}
    </div>
  )
}
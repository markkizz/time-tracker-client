import { FunctionalComponent } from 'preact'
import './Loading.css'

export interface ILoadingProps {
  thickSize?: string
  size?: string
}

export const Loading: FunctionalComponent<ILoadingProps> = () => {
  return (
    <div
      className="lds-dual-ring after:w-32px after:h-32px after:border-3px"
    />
  )
}

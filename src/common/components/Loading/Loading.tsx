import { FunctionalComponent } from 'preact'
import './Loading.css'

export interface ILoadingProps {
  thickSize?: string
  size?: string
}

export const Loading: FunctionalComponent<ILoadingProps> = ({
  size = '32',
  thickSize = '3'
}) => {
  return (
    <div
      className={`lds-dual-ring after:w-${size}px after:h-${size}px after:border-${thickSize}px`}
    />
  )
}

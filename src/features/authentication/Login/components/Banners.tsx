import { FunctionalComponent } from 'preact'

export interface IBannerProps {
  text?: string
}

export const Banner: FunctionalComponent<IBannerProps> = (props) => {
  return (
    <div className="w-250px text-xs p-2 bg-error-light text-error border border-error rounded">
      {props.text}
    </div>
  )
}

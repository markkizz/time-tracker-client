import { FunctionalComponent } from 'preact'

export const Card: FunctionalComponent = (props) => {
  return (
    <div className="bg-white rounded-md <md:w-xs lg:w-sm p-4">
      {props.children}
    </div>
  )
}
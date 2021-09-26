import { FunctionalComponent } from 'preact'

export const Banner: FunctionalComponent = () => {
  return (
    <div className="w-250px h-52px text-xs p-2 bg-error-light text-error border border-error rounded">
      The email or password you entered is incorrect
    </div>
  )
}

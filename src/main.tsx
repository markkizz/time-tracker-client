import { render } from 'preact'
import { App } from './app'
import 'virtual:windi-base.css'
import 'virtual:windi-components.css'
import './index.css'
import 'virtual:windi-utilities.css'

(async () => {
  // @ts-ignore
  const devtools = () => import('virtual:windi-devtools')
  if (import.meta.env.MODE === 'production') return
  await devtools()
})()

render(<App />, document.getElementById('app')!)

import { render } from 'preact'
import { App } from './app'
import 'virtual:windi-base.css'
import 'virtual:windi-components.css'
import './index.css'
import 'virtual:windi-utilities.css'
import { registerSW } from 'virtual:pwa-register'

(async () => {
  // @ts-ignore
  const devtools = () => import('virtual:windi-devtools')
  if (import.meta.env.MODE === 'production') return
  await devtools()
})()

const intervalMS = 60 * 60 * 1000

const updateSW = registerSW({
  onRegistered(r) {
    // r && setInterval(() => {
    //   r.update()
    // }, intervalMS)
  }
})

render(<App />, document.getElementById('app')!)

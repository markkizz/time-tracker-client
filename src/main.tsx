import { render } from 'preact'
import { App } from './app'
import 'virtual:windi-base.css'
import 'virtual:windi-components.css'
import './index.css'
import 'virtual:windi-utilities.css'
import 'virtual:windi-devtools'

render(<App />, document.getElementById('app')!)

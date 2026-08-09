import { renderToString } from 'react-dom/server'
import App from './App'

export { routeDefinitions } from './routes'

export function render(pathname) {
  return renderToString(<App pathname={pathname} />)
}

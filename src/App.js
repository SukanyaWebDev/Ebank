import {Switch, Route, Redirect} from 'react-router-dom'
import Login from './components/Login/index'
import Home from './components/Home/index'
import NotFound from './components/NotFound/index'
import './App.css'

const App = () => (
  <>
    <Switch>
      <Route exact path="/ebank/login" component={Login} />
      <Route exact path="/" component={Home} />
      <Route exact path="/random-path" component={NotFound} />
      <Redirect to="/random-path" />
    </Switch>
  </>
)
export default App

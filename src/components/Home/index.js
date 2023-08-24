import Cookies from 'js-cookie'
import {Redirect, withRouter} from 'react-router-dom'

import './index.css'

const Home = props => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/ebank/login" />
  }

  const callTheReturnFunction = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/ebank/login')
  }

  return (
    <div className="mainDiv">
      <div className="navDiv">
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png "
          alt="website logo"
          className="myImg"
        />
        <button type="button" className="myBu" onClick={callTheReturnFunction}>
          Logout
        </button>
      </div>
      <div className="myDiv3">
        <h1>Your Flexibility, Our Excellence</h1>
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png "
          alt="digital card"
        />
      </div>
    </div>
  )
}
export default withRouter(Home)

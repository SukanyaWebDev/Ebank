import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {userName: '', userPin: '', showMsg: false, errorMsg: ''}

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    history.replace('/')
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {userName, userPin} = this.state
    const data = {
      user_id: userName,
      pin: userPin,
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(data),
    }

    const fetchingData = await fetch(
      'https://apis.ccbp.in/ebank/login',
      options,
    )
    const dataFor = await fetchingData.json()
    if (fetchingData.ok === true) {
      this.setState({showMsg: false})
      this.onSubmitSuccess(dataFor.jwt_token)
    } else {
      this.setState({showMsg: true, errorMsg: dataFor.error_msg})
    }

    console.log(fetchingData)
    console.log(dataFor)
  }

  userInputTaker = event => {
    this.setState({userName: event.target.value})
  }

  userPinTaker = event => {
    this.setState({userPin: event.target.value})
  }

  render() {
    const {userName, userPin, showMsg, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="myDiv">
        <div className="dd">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            alt="website login"
          />
        </div>
        <form onSubmit={this.onSubmitForm}>
          <h1>Welcome Back</h1>
          <label htmlFor="userId">User ID</label>
          <input
            type="text"
            id="userId"
            value={userName}
            onChange={this.userInputTaker}
          />
          <label htmlFor="userPin">PIN</label>
          <input
            type="password"
            id="userPin"
            value={userPin}
            onChange={this.userPinTaker}
          />
          <button className="myButton" type="submit">
            Login
          </button>
          {showMsg ? <p>{errorMsg}</p> : null}
        </form>
      </div>
    )
  }
}

export default Login

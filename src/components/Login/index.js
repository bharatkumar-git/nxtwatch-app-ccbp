import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import AppContext from '../../context/AppContext'

import {MainContainer, ContentContainer} from './styled'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    passwordType: 'password',
    showErrorMsg: false,
    errorMsg: '',
  }

  onFormSubmitHandler = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const body = {username, password}
    const apiUrl = ' https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(body),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      const {history} = this.props
      Cookies.set('jwt_token', data.jwt_token, {expires: 10})
      history.replace('/')
    } else {
      this.setState({showErrorMsg: true, errorMsg: data.error_msg})
    }
  }

  showPasswordOnchangeHandler = () => {
    const {passwordType} = this.state
    if (passwordType === 'password') {
      this.setState({passwordType: 'text'})
    } else if (passwordType === 'text') {
      this.setState({passwordType: 'password'})
    }
  }

  usernameOnchangeHandler = event => {
    this.setState({username: event.target.value})
  }

  passwordOnchangeHandler = event => {
    this.setState({password: event.target.value})
  }

  render() {
    if (Cookies.get('jwt_token') !== undefined) {
      return <Redirect to="/" />
    }
    const {
      username,
      password,
      passwordType,
      showErrorMsg,
      errorMsg,
    } = this.state
    return (
      <AppContext.Consumer>
        {value => {
          const {theme} = value
          return (
            <MainContainer mode={theme}>
              <ContentContainer mode={theme}>
                {theme === 'DARK_MODE' ? (
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png"
                    alt="website logo"
                    width="70%"
                  />
                ) : (
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                    alt="website logo"
                    width="70%"
                  />
                )}
                <form
                  onSubmit={this.onFormSubmitHandler}
                  className="login-form-box"
                >
                  <div className="login-username-div-container">
                    <label
                      className="login-username-label-text"
                      htmlFor="username"
                    >
                      USERNAME
                    </label>
                    <input
                      className="login-username-input-box"
                      onChange={this.usernameOnchangeHandler}
                      type="text"
                      id="username"
                      value={username}
                      placeholder="use - deepak"
                    />
                  </div>
                  <div className="login-username-div-container">
                    <label
                      className="login-username-label-text"
                      htmlFor="password"
                    >
                      PASSWORD
                    </label>
                    <input
                      className="login-username-input-box"
                      onChange={this.passwordOnchangeHandler}
                      type={passwordType}
                      id="password"
                      value={password}
                      placeholder="use - lightstar@1"
                    />
                  </div>
                  <div className="login-checkbox-div-container">
                    <input
                      onChange={this.showPasswordOnchangeHandler}
                      type="checkbox"
                      id="checkbox"
                    />
                    <label
                      className="login-username-label-text"
                      htmlFor="checkbox"
                      style={{marginLeft: '8px'}}
                    >
                      Show Password
                    </label>
                  </div>
                  <button className="login-form-submit-button" type="submit">
                    Login
                  </button>
                  {showErrorMsg && (
                    <p style={{color: 'red', fontSize: '14px'}}>*{errorMsg}</p>
                  )}
                </form>
              </ContentContainer>
            </MainContainer>
          )
        }}
      </AppContext.Consumer>
    )
  }
}
export default Login

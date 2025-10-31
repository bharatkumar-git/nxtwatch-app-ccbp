import {withRouter, Link} from 'react-router-dom'
import {BsSun} from 'react-icons/bs'
import {BiSolidMoon} from 'react-icons/bi'
import Cookies from 'js-cookie'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'

import AppContext from '../../context/AppContext'

import {MainContainer, LogoutButton, ModalContainer} from './styled'
import './index.css'

const Navbar = props => (
  <AppContext.Consumer>
    {value => {
      const {theme, changeTheme} = value
      return (
        <MainContainer mode={theme}>
          <div className="navbar-content-box">
            {theme === 'DARK_MODE' ? (
              <Link to="/">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png"
                  alt="website logo"
                  width="120px"
                />
              </Link>
            ) : (
              <Link to="/">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                  alt="website logo"
                  width="120px"
                />
              </Link>
            )}
            <div className="navbar-logout-box">
              <Tippy content="Change Theme">
                <button
                  className="theme-button"
                  type="button"
                  data-testid="theme"
                  onClick={() => changeTheme(theme)}
                >
                  {theme === 'DARK_MODE' ? (
                    <BsSun color="white" size={24} />
                  ) : (
                    <BiSolidMoon size={24} />
                  )}
                </button>
              </Tippy>
              <Tippy content="Profile">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                  alt="profile"
                  className="navbar-profile-image"
                />
              </Tippy>
              <Popup
                modal
                trigger={
                  <LogoutButton type="button" mode={theme}>
                    <Tippy content="Logout">
                      <span>Logout</span>
                    </Tippy>
                  </LogoutButton>
                }
                className="popup-content"
              >
                {close => (
                  <ModalContainer mode={theme}>
                    <p
                      style={{
                        margin: '0px',
                        marginBottom: '18px',
                        textAlign: 'center',
                      }}
                    >
                      Are you sure you want to logout?
                    </p>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-evenly',
                        alignItem: 'center',
                      }}
                    >
                      <button
                        className="navbar-popup-button"
                        onClick={() => close()}
                        type="button"
                      >
                        Cancel
                      </button>
                      <button
                        className="navbar-popup-button"
                        onClick={() => {
                          const {history} = props
                          Cookies.remove('jwt_token')
                          history.replace('/login')
                        }}
                        type="button"
                      >
                        Confirm
                      </button>
                    </div>
                  </ModalContainer>
                )}
              </Popup>
            </div>
          </div>
        </MainContainer>
      )
    }}
  </AppContext.Consumer>
)
export default withRouter(Navbar)

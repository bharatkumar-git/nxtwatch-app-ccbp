import {Link} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {FaFire} from 'react-icons/fa'
import {SiYoutubegaming} from 'react-icons/si'
import {MdPlaylistAdd} from 'react-icons/md'

import AppContext from '../../context/AppContext'

import MainContainer from './styled'
import './index.css'

const navItemsList = [
  {id: 'HOME', displayText: 'Home', icon: AiFillHome, path: '/'},
  {id: 'TRENDING', displayText: 'Trending', icon: FaFire, path: '/trending'},
  {id: 'GAMING', displayText: 'Gaming', icon: SiYoutubegaming, path: '/gaming'},
  {
    id: 'SAVED_VIDEOS',
    displayText: 'Saved Videos',
    icon: MdPlaylistAdd,
    path: '/saved-videos',
  },
]
const Sidebar = () => (
  <AppContext.Consumer>
    {value => {
      const {theme} = value
      return (
        <MainContainer theme={theme}>
          <nav className="sidebar-nav-box">
            <ul className="sidebar-nav-items-ul-box">
              {navItemsList.map(item => (
                <li
                  key={item.id}
                  className={`${
                    theme === 'DARK_MODE' ? 'dark-mode' : 'light-mode'
                  } sidebar-li-item`}
                >
                  <Link to={item.path} className="sidebar-link-text">
                    <item.icon size={20} color="red" />
                    <p className="sidebar-list-item-text">{item.displayText}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <h1 style={{fontSize: '22px', fontWeight: '600'}}>CONTACT US</h1>
            <div style={{display: 'flex'}}>
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                alt="facebook logo"
                width="30px"
                style={{marginRight: '4px'}}
              />
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                alt="twitter logo"
                width="30px"
                style={{marginRight: '4px'}}
              />
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                alt="linkedin logo"
                width="30px"
              />
            </div>
            <p style={{fontSize: '12px'}}>
              Enjoy! Now to see your channels and recommendations!
            </p>
          </div>
        </MainContainer>
      )
    }}
  </AppContext.Consumer>
)
export default Sidebar

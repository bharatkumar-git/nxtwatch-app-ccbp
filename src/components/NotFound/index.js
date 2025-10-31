import AppContext from '../../context/AppContext'
import Navbar from '../Navbar'
import Sidebar from '../Sidebar'

import MainContainer from './styled'
import './index.css'

const NotFound = () => {
  const renderNotFoundPage = () => (
    <div className="not-found-content-box">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png"
        alt="not found"
        width="300px"
      />
      <h1>Page Not Found</h1>
      <p>We are sorry, the page you requested could not be found.</p>
    </div>
  )
  return (
    <AppContext.Consumer>
      {value => {
        const {theme} = value
        return (
          <div className="page-with-navbar-box">
            <Navbar />
            <div className="sidebar-home-box">
              <Sidebar />
              <MainContainer mode={theme} data-testid="notFound">
                {renderNotFoundPage(theme)}
              </MainContainer>
            </div>
          </div>
        )
      }}
    </AppContext.Consumer>
  )
}
export default NotFound

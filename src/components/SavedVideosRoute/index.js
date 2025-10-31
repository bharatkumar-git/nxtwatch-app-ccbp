import AppContext from '../../context/AppContext'
import Navbar from '../Navbar'
import Sidebar from '../Sidebar'
import SavedVideosItem from '../SavedVideosItem'

import MainContainer from './styled'
import './index.css'

const SavedVideosRoute = () => {
  const savedVideosView = (savedVideosList, theme) => (
    <>
      <h1>Saved Videos</h1>
      <ul className="saved-videos-ul-box">
        {savedVideosList.map(item => (
          <SavedVideosItem key={item.id} detailsObj={item} theme={theme} />
        ))}
      </ul>
    </>
  )
  const savedVideosRouteNoVideosView = () => (
    <div className="no-saved-videos-box">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
        alt="no saved videos"
        width="300px"
      />
      <h3>No saved videos found</h3>
      <p>You can save your vidoes while watching them</p>
    </div>
  )

  const renderSavedVideosPage = (savedVideosList, theme) => {
    if (savedVideosList.length === 0) {
      return savedVideosRouteNoVideosView()
    }
    return savedVideosView(savedVideosList, theme)
  }

  return (
    <AppContext.Consumer>
      {value => {
        const {theme, savedVideosList} = value
        return (
          <div className="page-with-navbar-box">
            <Navbar />
            <div className="sidebar-home-box">
              <Sidebar />
              <MainContainer mode={theme} data-testid="savedVideos">
                {renderSavedVideosPage(savedVideosList, theme)}
              </MainContainer>
            </div>
          </div>
        )
      }}
    </AppContext.Consumer>
  )
}
export default SavedVideosRoute

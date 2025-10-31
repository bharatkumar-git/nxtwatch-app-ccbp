import {Component} from 'react'
import Cookies from 'js-cookie'
import {IoIosClose, IoIosSearch} from 'react-icons/io'
import Loader from 'react-loader-spinner'

import HomeSingleVideoMapping from '../HomeSingleVideoMapping'
import AppContext from '../../context/AppContext'
import Navbar from '../Navbar'
import Sidebar from '../Sidebar'

import {
  HomeContainer,
  HomeSearchElement,
  HomeSearchBox,
  HomeSearchButton,
} from './styled'
import './index.css'

const apiStatusConstants = {
  pending: 'loading',
  failure: 'failed',
  success: 'success',
}
class Home extends Component {
  state = {
    showBanner: JSON.parse(localStorage.getItem('bannerVisible')) ?? true,
    videoApiStatus: apiStatusConstants.pending,
    homeVideosList: [],
    searchInput: '',
  }

  componentDidMount() {
    this.makeHomeVideoApiCall()
  }

  makeHomeVideoApiCall = async () => {
    this.setState({videoApiStatus: apiStatusConstants.pending})
    const {searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/videos/all?search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      // console.log(data)
      const wntdList = data.videos
      const homeVideosList = wntdList.map(item => ({
        id: item.id,
        channel: item.channel,
        publishedAt: item.published_at,
        thubmnailUrl: item.thumbnail_url,
        title: item.title,
        viewCount: item.view_count,
      }))
      this.setState({
        videoApiStatus: apiStatusConstants.success,
        homeVideosList,
      })
    } else {
      this.setState({videoApiStatus: apiStatusConstants.failure})
    }
  }

  renderVideoApiPendingView = theme => (
    <div className="home-loader-box" data-testid="loader">
      <Loader
        type="ThreeDots"
        color={theme === 'DARK_MODE' ? 'white' : 'black'}
        height="50"
        width="50"
      />
    </div>
  )

  renderVideoApiFaliureView = () => (
    <AppContext.Consumer>
      {value => {
        const {theme} = value
        const failureViewImgSrc =
          theme === 'DARK_MODE'
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
        return (
          <div className="home-failure-view-box">
            <img
              src={failureViewImgSrc}
              alt="failure view"
              width="300px"
              style={{marginRight: '44px'}}
            />
            <h1 style={{fontSize: '24px', marginTop: '24px'}}>
              Oops! Something Went Wrong
            </h1>
            <p style={{fontSize: '24px'}}>
              we are having some trouble to complete your request.
            </p>
            <p style={{fontSize: '16px', textDecoration: 'underline'}}>
              Please try again.
            </p>
            <button
              onClick={() => this.makeHomeVideoApiCall()}
              className="home-failure-view-retry-button"
              type="button"
            >
              Retry
            </button>
          </div>
        )
      }}
    </AppContext.Consumer>
  )

  noVideosView = () => (
    <div className="home-failure-view-box">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
        alt="no videos"
        width="300px"
      />
      <h1>No Search results found</h1>
      <p>Try different keywords or remove search filters</p>
      <button
        type="button"
        onClick={() => this.makeHomeVideoApiCall()}
        className="home-failure-view-retry-button"
      >
        Retry
      </button>
    </div>
  )

  renderVideoApiSuccessView = theme => {
    const {homeVideosList} = this.state
    if (homeVideosList.length === 0) {
      return this.noVideosView()
    }
    return (
      <ul className="home-successView-ul-box">
        {homeVideosList.map(item => (
          <HomeSingleVideoMapping
            theme={theme}
            key={item.id}
            detailsObj={item}
          />
        ))}
      </ul>
    )
  }

  renderHomePage = theme => {
    const {videoApiStatus} = this.state
    switch (videoApiStatus) {
      case apiStatusConstants.pending:
        return this.renderVideoApiPendingView(theme)
      case apiStatusConstants.failure:
        return this.renderVideoApiFaliureView()
      case apiStatusConstants.success:
        return this.renderVideoApiSuccessView(theme)
      default:
        return null
    }
  }

  changeBannerState = () => {
    this.setState({showBanner: false})
    localStorage.setItem('bannerVisible', JSON.stringify(false))
  }

  renderHomeBanner = () => (
    <div className="home-banner-box" data-testid="banner">
      <button
        onClick={this.changeBannerState}
        className="home-close-button"
        data-testid="close"
        type="button"
      >
        <IoIosClose size={20} />
      </button>
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
        alt="nxt watch logo"
        width="140px"
      />
      <p style={{color: 'black'}}>
        Buy Nxt Watch Premium prepaid plans with UPI
      </p>
      <button className="home-getItNow-button" type="button">
        GET IT NOW
      </button>
    </div>
  )

  render() {
    const {showBanner, searchInput} = this.state
    return (
      <div className="page-with-navbar-box">
        <Navbar />
        <div className="sidebar-home-box">
          <Sidebar />
          <AppContext.Consumer>
            {value => {
              const {theme} = value
              return (
                <HomeContainer mode={theme} data-testid="home">
                  {showBanner ? this.renderHomeBanner() : ''}
                  <div className="homePage-content-box">
                    <HomeSearchBox mode={theme}>
                      <HomeSearchElement
                        onChange={event =>
                          this.setState({searchInput: event.target.value})
                        }
                        type="search"
                        mode={theme}
                        value={searchInput}
                      />
                      <HomeSearchButton
                        mode={theme}
                        type="button"
                        data-testid="searchButton"
                        onClick={() => this.makeHomeVideoApiCall()}
                      >
                        <IoIosSearch
                          color={theme === 'DARK_MODE' ? 'white' : 'black'}
                          size={22}
                        />
                      </HomeSearchButton>
                    </HomeSearchBox>
                    {this.renderHomePage(theme)}
                  </div>
                </HomeContainer>
              )
            }}
          </AppContext.Consumer>
        </div>
      </div>
    )
  }
}
export default Home

import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import AppContext from '../../context/AppContext'
import Navbar from '../Navbar'
import Sidebar from '../Sidebar'
import TrendingVideoItem from '../TrendingVideoItem'

import MainContainer from './styled'
import './index.css'

const apiStatusConstants = {
  pending: 'loading',
  failure: 'failed',
  success: 'success',
}
class TrendingRoute extends Component {
  state = {apiStatus: '', trendingVideosList: []}

  componentDidMount() {
    this.makeTrenignVideosApiCall()
  }

  makeTrenignVideosApiCall = async () => {
    this.setState({apiStatus: apiStatusConstants.pending})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/videos/trending'
    const options = {
      method: 'GET',
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const wntdList = data.videos
      const trendingVideosList = wntdList.map(item => ({
        id: item.id,
        channel: item.channel,
        publishedAt: item.published_at,
        thubmnailUrl: item.thumbnail_url,
        title: item.title,
        viewCount: item.view_count,
      }))
      this.setState({apiStatus: apiStatusConstants.success, trendingVideosList})
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderTrendingVideoApiPendingView = theme => (
    <div className="trending-loader-box" data-testid="loader">
      <Loader
        type="ThreeDots"
        color={theme === 'DARK_MODE' ? 'white' : 'black'}
        height="50"
        width="50"
      />
    </div>
  )

  renderTrendingVideoApiFaliureView = theme => {
    const failureViewImgSrc =
      theme === 'DARK_MODE'
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
    return (
      <div className="trending-failure-view-box">
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
          onClick={() => this.makeTrenignVideosApiCall()}
          className="home-failure-view-retry-button"
          type="button"
        >
          Retry
        </button>
      </div>
    )
  }

  renderTrendingVideoApiSuccessView = theme => {
    const {trendingVideosList} = this.state
    return (
      <div className="trending-success-view-box">
        <div>
          <h1>Trending</h1>
        </div>
        <ul className="trending-videos-ul-box">
          {trendingVideosList.map(item => (
            <TrendingVideoItem key={item.id} detailsObj={item} theme={theme} />
          ))}
        </ul>
      </div>
    )
  }

  renderTrendingPage = theme => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.pending:
        return this.renderTrendingVideoApiPendingView(theme)
      case apiStatusConstants.failure:
        return this.renderTrendingVideoApiFaliureView(theme)
      case apiStatusConstants.success:
        return this.renderTrendingVideoApiSuccessView(theme)
      default:
        return null
    }
  }

  render() {
    return (
      <AppContext.Consumer>
        {value => {
          const {theme} = value
          return (
            <div className="page-with-navbar-box">
              <Navbar />
              <div className="sidebar-home-box">
                <Sidebar />
                <MainContainer mode={theme} data-testid="trending">
                  {this.renderTrendingPage(theme)}
                </MainContainer>
              </div>
            </div>
          )
        }}
      </AppContext.Consumer>
    )
  }
}
export default TrendingRoute

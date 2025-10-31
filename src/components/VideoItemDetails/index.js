import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import ReactPlayer from 'react-player'
import {formatDistanceToNow} from 'date-fns'
import {BiDislike, BiLike} from 'react-icons/bi'
import {MdPlaylistAdd} from 'react-icons/md'

import AppContext from '../../context/AppContext'
import Navbar from '../Navbar'
import Sidebar from '../Sidebar'

import {
  MainContainer,
  LikeButton,
  DislikeButton,
  SaveButton,
  HrElement,
} from './styled'
import './index.css'

const apiStatusConstants = {
  pending: 'loading',
  failure: 'failed',
  success: 'success',
}
// static contextType = AppContext
class VideoItemDetails extends Component {
  state = {
    apiStatus: '',
    videoDetails: {},
    isSaved: false,
    isLiked: false,
    isDisliked: false,
  }

  componentDidMount() {
    this.makeVideoItemDetailsApiCall()
  }

  makeVideoItemDetailsApiCall = async () => {
    this.setState({apiStatus: apiStatusConstants.pending})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const videoId = match.params.id
    const apiUrl = `https://apis.ccbp.in/videos/${videoId}`
    const options = {
      method: 'GET',
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const item = data.video_details
      const videoDetails = {
        id: item.id,
        channel: item.channel,
        publishedAt: item.published_at,
        thubmnailUrl: item.thumbnail_url,
        title: item.title,
        viewCount: item.view_count,
        description: item.description,
        videoUrl: item.video_url,
      }
      const {savedVideosList} = this.context
      let isSaved = savedVideosList.find(obj => obj.id === item.id)
      isSaved = isSaved !== undefined
      this.setState({
        apiStatus: apiStatusConstants.success,
        videoDetails,
        isSaved,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  likeButtonHandler = () => {
    this.setState({isLiked: true, isDisliked: false})
  }

  dislikeButtonHandler = () => {
    this.setState({isDisliked: true, isLiked: false})
  }

  changeSavedVideosList = () => {
    const {isSaved, videoDetails} = this.state
    const {
      addItemToSavedVideosList,
      removeItemFromSavedVideosList,
    } = this.context
    if (isSaved) {
      addItemToSavedVideosList(videoDetails)
    } else {
      removeItemFromSavedVideosList(videoDetails.id)
    }
  }

  saveButtonHandler = () => {
    this.setState(
      prev => ({isSaved: !prev.isSaved}),
      this.changeSavedVideosList,
    )
  }

  renderVideoApiSuccessView = theme => {
    const {videoDetails, isSaved, isLiked, isDisliked} = this.state
    return (
      <div className="videoDetails-content-box">
        <ReactPlayer
          url={videoDetails.videoUrl}
          width="100%"
          height="84%"
          controls
        />
        <p style={{marginBottom: '0px'}}>{videoDetails.title}</p>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '0px',
          }}
        >
          <div style={{display: 'flex', alignItems: 'center'}}>
            <p>{videoDetails.viewCount} views</p>
            <p
              style={{
                fontWeight: 900,
                paddingBottom: '6px',
                marginRight: '14px',
                marginLeft: '14px',
              }}
            >
              .
            </p>
            <p>
              {formatDistanceToNow(new Date(videoDetails.publishedAt), {
                addSuffix: true,
              })}
            </p>
          </div>

          <div style={{display: 'flex'}}>
            <LikeButton
              onClick={this.likeButtonHandler}
              liked={isLiked}
              type="button"
            >
              <BiLike style={{marginRight: '4px'}} />
              <p>Like</p>
            </LikeButton>
            <DislikeButton
              onClick={this.dislikeButtonHandler}
              disliked={isDisliked}
              type="button"
            >
              <BiDislike style={{marginRight: '4px'}} />
              <p>Dislike</p>
            </DislikeButton>
            <SaveButton
              onClick={this.saveButtonHandler}
              saved={isSaved}
              type="button"
            >
              <MdPlaylistAdd style={{marginRight: '4px'}} />
              {isSaved ? <p>Saved</p> : <p>Save</p>}
            </SaveButton>
          </div>
        </div>

        <HrElement mode={theme} />

        <div style={{display: 'flex'}}>
          <img
            src={videoDetails.channel.profile_image_url}
            alt="channel logo"
            width="50px"
            height="50px"
          />
          <div style={{marginLeft: '14px'}}>
            <p style={{marginTop: '0px'}}>{videoDetails.channel.name}</p>
            <p>{videoDetails.channel.subscriber_count} subscribers</p>
            <p>{videoDetails.description}</p>
          </div>
        </div>
      </div>
    )
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
              onClick={() => this.makeVideoItemDetailsApiCall()}
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

  renderVideoItemDetailsView = theme => {
    const {apiStatus} = this.state
    switch (apiStatus) {
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
                <MainContainer data-testid="videoItemDetails" mode={theme}>
                  {this.renderVideoItemDetailsView(theme)}
                </MainContainer>
              </div>
            </div>
          )
        }}
      </AppContext.Consumer>
    )
  }
}
export default VideoItemDetails
VideoItemDetails.contextType = AppContext

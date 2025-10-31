import {Component} from 'react'
import {formatDistanceToNow} from 'date-fns'
import {Link} from 'react-router-dom'

import MainContainer from './styled'
import './index.css'

class SavedVideosItem extends Component {
  render() {
    const {detailsObj, theme} = this.props
    const {
      id,
      channel,
      title,
      thubmnailUrl,
      publishedAt,
      viewCount,
    } = detailsObj
    return (
      <MainContainer mode={theme}>
        <Link to={`/videos/${id}`} className="trending-video-link-box">
          <img
            src={thubmnailUrl}
            alt="video thumbnail"
            width="50%"
            height="300px"
          />
          <div style={{marginLeft: '14px'}}>
            <h3 style={{marginTop: '0px', lineHeight: '22px'}}>{title}</h3>
            <p style={{marginBottom: '0px'}}>{channel.name}</p>
            <div style={{display: 'flex', alignItems: 'center'}}>
              <p>{viewCount} views</p>
              <p
                style={{
                  fontWeight: 900,
                  paddingBottom: '6px',
                  marginRight: '8px',
                  marginLeft: '8px',
                }}
              >
                .
              </p>
              <p>
                {formatDistanceToNow(new Date(publishedAt), {
                  addSuffix: true,
                })}
              </p>
            </div>
          </div>
        </Link>
      </MainContainer>
    )
  }
}
export default SavedVideosItem

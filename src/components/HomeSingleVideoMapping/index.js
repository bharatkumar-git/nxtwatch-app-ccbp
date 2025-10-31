import {formatDistanceToNow} from 'date-fns'

import './index.css'
import ThemeBackground from './styled'

const HomeSingleVideoMapping = props => {
  const {detailsObj, theme} = props
  const {id, channel, publishedAt, thubmnailUrl, title, viewCount} = detailsObj
  return (
    <li className="home-successView-thumbnail-box">
      <ThemeBackground to={`/videos/${id}`} mode={theme}>
        <img src={thubmnailUrl} alt="video thumbnail" width="100%" />
        <div style={{display: 'flex', marginTop: '4px'}}>
          <img
            src={channel.profile_image_url}
            alt="channel logo"
            width="30px"
            height="30px"
          />
          <div style={{marginLeft: '8px'}}>
            <p
              className="home-successView-thumbnail-title-text"
              style={{margin: '0px', fontSize: '14px'}}
            >
              {title}
            </p>
            <p style={{margin: '0px', marginBlock: '4px'}}>{channel.name}</p>
            <div style={{}}>
              <p
                style={{
                  margin: '0px',
                  marginBlock: '4px',
                  fontSize: '12px',
                }}
              >
                {viewCount} views .{' '}
                {formatDistanceToNow(new Date(publishedAt), {
                  addSuffix: true,
                }).replace(/over|almost|about/g, '')}{' '}
              </p>
            </div>
          </div>
        </div>
      </ThemeBackground>
    </li>
  )
}
export default HomeSingleVideoMapping

import {Link} from 'react-router-dom'

import MainContainer from './styled'
import './index.css'

const GamingVideoItem = props => {
  const {detailsObj, theme} = props
  const {id, title, thubmnailUrl, viewCount} = detailsObj
  return (
    <MainContainer mode={theme}>
      <Link to={`/videos/${id}`} className="gaming-video-link-box">
        <img src={thubmnailUrl} alt="video thumbnail" width="100%" />
        <p>{title}</p>
        <p>{viewCount} Watching Worldwide</p>
      </Link>
    </MainContainer>
  )
}
export default GamingVideoItem

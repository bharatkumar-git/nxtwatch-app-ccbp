import {Link} from 'react-router-dom'
import styled from 'styled-components'

const ThemeBackground = styled(Link)`
  color: ${props => (props.mode === 'DARK_MODE' ? 'white' : 'black')};
  text-decoration: none;
  &: hover {
    color: ${props => (props.mode === 'DARK_MODE' ? '#cccccc' : '#333333')};
  }
`
export default ThemeBackground

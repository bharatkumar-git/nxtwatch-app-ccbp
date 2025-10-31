import styled from 'styled-components'

const MainContainer = styled.li`
  color: ${props => (props.mode === 'DARK_MODE' ? 'white' : 'black')};
  text-decoration: none;
  &: hover {
    color: ${props => (props.mode === 'DARK_MODE' ? '#cccccc' : '#333333')};
  }
  width: 100%;
  margin-bottom: 24px;
  line-height: 14px;
`
export default MainContainer

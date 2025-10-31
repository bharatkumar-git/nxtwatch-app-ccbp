import styled from 'styled-components'

const MainContainer = styled.li`
  color: ${props => (props.mode === 'DARK_MODE' ? 'white' : 'black')};
  &: hover {
    color: ${props => (props.mode === 'DARK_MODE' ? '#cccccc' : '#333333')};
  }
  width: 22%;
  margin-bottom: 24px;
  // margin-right: 24px;
  line-height: 8px;
`
export default MainContainer

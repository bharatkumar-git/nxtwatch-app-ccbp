import styled from 'styled-components'

const MainContainer = styled.div`
  height: 100%;
  width: 85%;
  background-color: ${props =>
    props.mode === 'DARK_MODE' ? '#0f0f0f' : '#f9f9f9'};
  color: ${props => (props.mode === 'DARK_MODE' ? 'white' : 'black')};
  overflow: auto;
`
export default MainContainer

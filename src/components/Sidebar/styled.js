import styled from 'styled-components'

const MainContainer = styled.div`
  background-color: ${props =>
    props.theme === 'DARK_MODE' ? '#181818' : '#f9f9f9'};
  width: 15%;
  flex-shrink: 0;
  padding: 14px;
  display: flex;
  flex-direction: column;
  color: ${props => (props.theme === 'DARK_MODE' ? 'white' : 'black')};
  box-shadow: ${props =>
    props.theme === 'DARK_MODE'
      ? 'inset 0px 0px 16px -10px rgba(255, 255, 255, 0.5)'
      : 'inset 0px 0px 16px -10px rgba(0, 0, 0, 0.7)'};
  border-radius: 4px;
  height: 100%;
`
export default MainContainer

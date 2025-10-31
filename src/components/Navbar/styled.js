import styled from 'styled-components'

export const MainContainer = styled.nav`
  background-color: ${props =>
    props.mode === 'DARK_MODE' ? '#181818' : '#f9f9f9'};
  color: ${props => (props.mode === 'DARK_MODE' ? 'white' : 'black')};
  border-bottom: ${props =>
    props.mode === 'DARK_MODE' ? '1px white solid' : '1px black solid'};
  height: 10vh;
`
export const LogoutButton = styled.button`
  border: ${props =>
    props.mode === 'DARK_MODE' ? '1px white solid' : '1px black solid'};
  border-radius: 8px;
  height: 28px;
  width: 80px;
  background-color: transparent;
  margin-left: 14px;
  cursor: pointer;
  color: ${props => (props.mode === 'LIGHT_MODE' ? 'black' : 'white')};
`
export const ModalContainer = styled.div`
  background-color: black;
  color: ${props => (props.mode === 'DARK_MODE' ? 'white' : 'white')};
  margin: 0px;
  padding-inline: 14px;
`

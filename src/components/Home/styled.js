import styled from 'styled-components'

export const HomeContainer = styled.div`
  background-color: ${props =>
    props.mode === 'DARK_MODE' ? '#181818' : '#f9f9f9'};
  color: ${props => (props.mode === 'DARK_MODE' ? 'white' : 'black')};
  width: 85%;
  flex-shrink: 0;
  padding: 24px;
  height: 100%;
  display: flex;
  flex-direction: column;
`
export const HomeSearchBox = styled.div`
  border: ${props =>
    props.mode === 'DARK_MODE'
      ? '1px rgba(218, 234, 235, 0.334) solid'
      : '1px rgba(56, 52, 52, 0.334) solid'};
  width: 50%;
  display: flex;
  height: 30px;
  border-radius: 4px;
  position: sticky;
  top: 0;
`
export const HomeSearchElement = styled.input`
  flex-grow: 1;
  height: 100%;
  padding: 4px;
  padding-left: 8px;
  padding-right: 8px;
  color: ${props => (props.mode === 'DARK_MODE' ? 'white' : 'black')};
  font-weight: 600;
  background-color: ${props =>
    props.mode === 'DARK_MODE' ? '#181818' : '#f9f9f9'};
  border: none;
  outline: none;
  border-radius: 4px;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
`
export const HomeSearchButton = styled.button`
  background-color: ${props =>
    props.mode === 'LIGHT_MODE'
      ? 'rgba(224, 246, 247, 0.546)'
      : 'rgba(56, 52, 52, 0.776)'};
  width: 44px;
  height: 28px;
  cursor: pointer;
  border: none;
`

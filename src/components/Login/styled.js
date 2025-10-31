import styled from 'styled-components'

export const MainContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${props => {
    console.log(props)
    return props.mode === 'DARK_MODE' ? '#181818' : 'rgb(219, 216, 212)'
  }};
  color: ${props => (props.mode === 'DARK_MODE' ? 'white' : 'black')};
`
export const ContentContainer = styled.div`
  width: 340px;
  height: 400px;
  border-radius: 14px;
  padding: 24px;
  background-color: ${props =>
    props.mode === 'DARK_MODE' ? '#0f0f0f' : 'white'};
  display: flex;
  flex-direction: column;
  align-items: center;
`

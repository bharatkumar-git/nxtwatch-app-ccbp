import styled from 'styled-components'

export const MainContainer = styled.div`
  background-color: ${props =>
    props.mode === 'DARK_MODE' ? '#0f0f0f' : '#f9f9f9'};
  color: ${props => (props.mode === 'DARK_MODE' ? 'white' : 'black')};
  width: 85%;
  flex-shrink: 0;
  padding: 24px;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: auto;
`
export const LikeButton = styled.button`
  display: flex;
  align-items: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: ${props => (props.liked ? '#2563eb' : '#64748b')};
  outline: none;
`
export const DislikeButton = styled(LikeButton)`
  color: ${props => (props.disliked ? '#2563eb' : '#64748b')};
  margin-left: 8px;
`
export const SaveButton = styled(DislikeButton)`
  color: ${props => (props.saved ? '#2563eb' : '#64748b')};
  width: 80px;
`
export const HrElement = styled.hr`
  color: ${props => (props.mode === 'DARK_MODE' ? '#cccccc' : '#424242')};
  width: 100%;
  height: 2px;
  border-radius: 4px;
  margin-bottom: 24px;
`

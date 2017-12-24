/* @flow */
import styled from 'styled-components'

export default styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 200px;
  grid-template-rows: 100vh 100vh;
  grid-template-areas: 'left right';
`

export const Left = styled.div`
  grid-area: left;
  overflow-y: scroll;
`

export const Right = styled.div`
  grid-area: right;
`

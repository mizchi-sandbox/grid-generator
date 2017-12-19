/* @flow */
import styled from 'styled-components'

export const AppLayout = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 200px;
  grid-template-rows: 1fr 300px;
  grid-template-areas: 'left right' 'output right';
`

export const AppLeft = styled.div`
  grid-area: left;
`

export const AppRight = styled.div`
  grid-area: right;
`

export const AppOutput = styled.div`
  height: 300px;
  overflow-y: scroll;
  background-color: #333;
  color: #ddd;
  grid-area: output;
`

/* @flow */
import styled from 'styled-components'

export default styled.div`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  display: grid;
  grid-template-columns: 60px 1fr 50px;
  grid-template-rows:
    30px
    1fr
    30px;
  grid-template-areas:
    '.    columns addc'
    'rows edit    .'
    'addr .       .';
`

export const Columns = styled.div`
  grid-area: columns;
`

export const AddColumnsButton = styled.div`
  grid-area: addc;
`

export const AddRowsButton = styled.div`
  grid-area: addr;
`

export const Rows = styled.div`
  grid-area: rows;
`

export const Edit = styled.div`
  grid-area: edit;
`

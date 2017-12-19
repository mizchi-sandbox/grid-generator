/* @flow */
import styled from 'styled-components'

export const GridEditorLayout = styled.div`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  display: grid;
  grid-template-columns: 60px 1fr 50px;
  grid-template-rows:
    30px
    1fr
    30px;
  grid-template-areas:
    '.   columns addc'
    'rows edit    .'
    'addr .      .';
`

export const ColumnsArea = styled.div`
  grid-area: columns;
`

export const AddColumnsButtonArea = styled.div`
  grid-area: addc;
`

export const AddRowsButtonArea = styled.div`
  grid-area: addr;
`

export const RowsArea = styled.div`
  grid-area: rows;
`

export const EditArea = styled.div`
  grid-area: edit;
`


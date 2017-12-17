/* @flow */
export default {
  previewWidth: '100%',
  previewHeight: '100%',
  width: '100%',
  height: '100%',
  columns: ['120px', '4fr', '1fr'],
  rows: ['60px', '1fr', '40px'],
  rowCount: 3,
  columnCount: 3,
  cells: [
    {
      id: 0,
      gridArea: 'header'
    },
    {
      id: 3,
      gridArea: 'header'
    },
    {
      id: 6,
      gridArea: 'header'
    },
    {
      id: 1,
      gridArea: 'left'
    },
    {
      id: 4,
      gridArea: 'content'
    },
    {
      id: 7,
      gridArea: 'right'
    },
    {
      id: 2,
      gridArea: 'footer'
    },
    {
      id: 5,
      gridArea: 'footer'
    },
    {
      id: 8,
      gridArea: 'footer'
    }
  ],
  selectedPaneId: null
}

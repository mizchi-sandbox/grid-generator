/* @flow */
import * as React from 'react'
import range from 'lodash.range'

export default function ColumnsEditor({
  columns,
  onChangeColumn
}: {
  columns: string[],
  onChangeColumn: (index: number, value: string) => void
}) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: columns.join(' '),
        gridTemplateAreas:
          '"' +
          range(columns.length)
            .map(i => 'g' + i.toString())
            .join(' ') +
          '"'
      }}
    >
      {columns.map((column, index) => {
        return (
          <div key={index} style={{ gridArea: 'g' + index.toString() }}>
            <input
              style={{ width: '100%', boxSizing: 'border-box' }}
              value={column}
              onChange={ev => onChangeColumn(index, ev.target.value)}
            />
          </div>
        )
      })}
    </div>
  )
}

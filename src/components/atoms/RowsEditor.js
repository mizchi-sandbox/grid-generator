/* @flow */
import * as React from 'react'
import range from 'lodash.range'

export default function RowsEditor({
  rows,
  onChangeRow
}: {
  rows: string[],
  onChangeRow: (index: number, value: string) => void
}) {
  return (
    <div
      style={{
        display: 'grid',
        height: '100%',
        gridTemplateRows: rows.join(' '),
        gridTemplateAreas: range(rows.length)
          .map(i => `"r${i}"`)
          .join('\n')
      }}
    >
      {rows.map((row, index) => {
        return (
          <div key={index} style={{ gridArea: 'r' + index.toString() }}>
            <input
              style={{ width: '100%', boxSizing: 'border-box' }}
              value={row}
              onChange={ev => {
                onChangeRow(index, ev.target.value)
              }}
            />
          </div>
        )
      })}
    </div>
  )
}

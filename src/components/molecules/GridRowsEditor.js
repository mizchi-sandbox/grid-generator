/* @flow */
import * as React from 'react'
import range from 'lodash.range'
import StyleLengthInput from '../atoms/StyleLengthInput'

export default function RowsEditor({
  rows,
  onChangeRowValue
}: {
  rows: string[],
  onChangeRowValue: (index: number, value: string) => void
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
            <StyleLengthInput
              value={row}
              onChangeValidly={value => {
                onChangeRowValue(index, value)
              }}
            />
          </div>
        )
      })}
    </div>
  )
}

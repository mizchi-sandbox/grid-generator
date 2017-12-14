/* @flow */
import test from 'ava'
import range from 'lodash.range'
import uniq from 'lodash.range'

type Area = {
  name: string
}

type Cell = string

type State = {|
  gridTemplateColumns: Array<string | number>,
  gridTemplateRows: Array<string | number>,
  rowCount: number,
  columnCount: number,
  cells: Array<Cell>
|}

const cellsToAreas = ({
  cells,
  rowCount,
  columnCount
}: State): {
  areas: Area[],
  gridTemplateAreas: string
} => {
  const areas = uniq(cells).map(name => ({ name }))

  let cur = 0
  const areas = []
  areas.push({ name: cells[0] })
  const addArea = name => {
    if (!areas.find(a => a.name === name)) {
      areas.push({ name })
    }
  }

  while (cur < cells.length) {
    // check upper cell
    const current = cells[cur]
    // const upper = cells[cur - columnCount]
    const bottom = cells[cur + columnCount]
    const next = cells[cur + 1]

    // check next cell
    if (cur % rowCount !== rowCount - 1) {
      // check next row is different
      if (next && current !== next) {
        // add new area and switch context
        console.log('next: add new area:', next, 'on', cur + 1)
        addArea(next)
      }
    }
    // check bottom cell
    if (cur < cells.length) {
      // check next column is different
      if (bottom && current !== bottom) {
        // add new area and switch context
        console.log('bottom: add new area:', next, 'on', cur + rowCount)
        addArea(bottom)
      }
    }
    cur += 1
  }
  return {
    areas,
    gridTemplateAreas: `"a"`
  }
}

test(t => {
  const state = {
    gridTemplateColumns: [],
    gridTemplateRows: [],
    rowCount: 2,
    columnCount: 1,
    cells: ['a', 'a']
  }
  t.deepEqual(cellsToAreas(state), {
    areas: [{ name: 'a' }],
    gridTemplateAreas: `"a"`
  })
})

test(t => {
  const state = {
    gridTemplateColumns: [],
    gridTemplateRows: [],
    rowCount: 2,
    columnCount: 1,
    cells: ['a', 'b']
  }
  t.deepEqual(cellsToAreas(state), {
    areas: [{ name: 'a' }, { name: 'b' }],
    gridTemplateAreas: `"a"`
  })
})
//
// /*
// a b
// a c
// */
test(t => {
  const state = {
    gridTemplateColumns: [],
    gridTemplateRows: [],
    rowCount: 2,
    columnCount: 2,
    cells: ['a', 'b', 'a', 'c']
  }
  t.deepEqual(cellsToAreas(state), {
    areas: [{ name: 'a' }, { name: 'b' }, { name: 'c' }],
    gridTemplateAreas: `"a"`
  })
})
//
// /*
// a b
// a b
// */
test(t => {
  const state = {
    gridTemplateColumns: [],
    gridTemplateRows: [],
    rowCount: 2,
    columnCount: 2,
    cells: ['a', 'b', 'a', 'b']
  }
  console.log('----')
  t.deepEqual(cellsToAreas(state), {
    areas: [{ name: 'a' }, { name: 'b' }],
    gridTemplateAreas: `"a"`
  })
})

test(t => {
  const cells = ['a', 'b']
  const state = {
    gridTemplateColumns: [],
    gridTemplateRows: [],
    rowCount: 2,
    columnCount: 1,
    cells
  }
  console.log(cellsToAreas(state))
  t.deepEqual(cellsToAreas(state), {
    areas: [{ name: 'a' }, { name: 'b' }],
    gridTemplateAreas: `"a"`
  })
})

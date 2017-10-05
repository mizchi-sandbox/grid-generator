/* @flow */
import test from 'ava'
import bar from '../bar'

const noopAction: any = { type: 'nop' }

test(t => {
  const data = bar(undefined, noopAction)
  t.deepEqual(data, { barProp: 0 })
})

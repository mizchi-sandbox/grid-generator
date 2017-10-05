/* @flow */
import test from 'ava'
import foo from '../foo'

const noopAction: any = { type: 'nop' }

test(t => {
  const data = foo(undefined, noopAction)
  t.deepEqual(data, { fooProp: 0 })
})

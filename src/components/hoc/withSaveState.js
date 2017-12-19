/* @flow */
import type { State as RootState } from '../../reducers'
import { compose, lifecycle, pure, type HOC } from 'recompose'
import { connect } from 'react-redux'
import * as StateSave from '../../infrastructure/StateSave'

type Props = RootState

const connector = connect((state: RootState) => state, () => ({}))

const enhancer: HOC<Props, any> = compose(
  connector,
  pure,
  lifecycle({
    componentWillUpdate(props) {
      StateSave.save(props)
      console.log('saved')
    }
  })
)

export default enhancer

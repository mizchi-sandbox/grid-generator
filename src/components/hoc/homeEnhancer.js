/* @flow */
import type { GridState } from '../../domain/GridState'
import * as GridManagerActions from '../../reducers/gridManager'
import type { State as RootState } from '../../reducers'
import { bindActionCreators } from 'redux'
import { compose, pure, setDisplayName, type HOC } from 'recompose'
import { connect } from 'react-redux'
import withStateSave from './withSaveState'

type Props = {
  actions: typeof GridManagerActions,
  gridState: GridState
}

const connector = connect(
  (state: RootState) => state.gridManager,
  dispatch => ({ actions: bindActionCreators(GridManagerActions, dispatch) })
)

const enhancer: HOC<Props, {}> = compose(
  withStateSave,
  setDisplayName('Home'),
  connector,
  pure
)

export default enhancer

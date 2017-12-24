/* @flow */
import type { GridState } from '../domain/GridState'
import type { EditMode } from '../reducers/gridManager'
import * as GridManagerActions from '../reducers/gridManager'
import type { State as RootState } from '../reducers'
import { bindActionCreators } from 'redux'
import { compose, pure, setDisplayName, type HOC } from 'recompose'
import { connect } from 'react-redux'
import withStateSave from './withSaveState'
import withKeyControl from './withKeyControl'

type Props = {
  actions: typeof GridManagerActions,
  editMode: EditMode,
  selectedCellId: ?number,
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
  withKeyControl,
  pure
)

export default enhancer

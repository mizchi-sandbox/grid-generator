/* @flow */
import { lifecycle } from 'recompose'

let _handler
export default lifecycle({
  componentDidMount() {
    if (_handler) {
      return
    }
    _handler = (ev: any) => {
      const actions = this.props.actions
      // Ctrl-1
      if (ev.ctrlKey && ev.keyCode === 49) {
        actions.changeEditMode('panes')
      }
      if (ev.ctrlKey && ev.keyCode === 50) {
        actions.changeEditMode('cells')
      }
      if (ev.ctrlKey && ev.keyCode === 51) {
        actions.changeEditMode('output')
      }
      // Arrow
      if (ev.shiftKey && ev.keyCode === 37) {
        actions.deleteColumn()
      }
      if (ev.shiftKey && ev.keyCode === 39) {
        actions.addColumn()
      }
      if (ev.shiftKey && ev.keyCode === 38) {
        actions.deleteRow()
      }
      if (ev.shiftKey && ev.keyCode === 40) {
        actions.addRow()
      }
    }
    document.addEventListener('keydown', _handler)
  },

  componentWillUnmount() {
    _handler = null
    document.removeEventListener('keydown', _handler)
  }
})

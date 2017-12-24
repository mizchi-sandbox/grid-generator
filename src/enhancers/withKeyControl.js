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
        ev.preventDefault()
        actions.changeEditMode('panes')
      }
      if (ev.ctrlKey && ev.keyCode === 50) {
        ev.preventDefault()
        actions.changeEditMode('cells')
      }
      if (ev.ctrlKey && ev.keyCode === 51) {
        ev.preventDefault()
        actions.changeEditMode('output')
      }
      // Arrow
      if (ev.shiftKey && ev.keyCode === 37) {
        ev.preventDefault()
        actions.deleteColumn()
      }
      if (ev.shiftKey && ev.keyCode === 39) {
        ev.preventDefault()
        actions.addColumn()
      }
      if (ev.shiftKey && ev.keyCode === 38) {
        ev.preventDefault()
        actions.deleteRow()
      }
      if (ev.shiftKey && ev.keyCode === 40) {
        ev.preventDefault()
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

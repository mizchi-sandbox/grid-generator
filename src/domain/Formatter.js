/* @flow */
import type { GridState } from './GridState'
function toCSS(state: GridState): string {
  const cssString =
    '.container {\n' +
    Object.keys(containerStyle)
      .map(key => {
        const value = containerStyle[key]
        return `  ${paramCase(key)}: ${value};`
      })
      .join('\n') +
    '\n}\n' +
    panes
      .map(
        pane => `.area-${pane.gridArea} {\n  grid-area: ${pane.gridArea};\n}`
      )
      .join('\n')
}

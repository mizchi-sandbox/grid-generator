/* @flow */
import type { GridState, Pane } from '../../domain/GridState'
import React, { Fragment } from 'react'
import paramCase from 'param-case'

export default class Output extends React.Component<
  {
    gridState: GridState,
    containerStyle: any,
    panes: Pane[]
  },
  {
    outputMode: 'css' | 'react' | 'internal'
  }
> {
  state = {
    outputMode: 'css'
  }

  render() {
    const { gridState, containerStyle, panes } = this.props
    const { outputMode } = this.state

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
    return (
      <div style={{ padding: '10px' }}>
        {/* <div>
          OutputMode:
          <button onClick={() => this.setState({ outputMode: 'react' })}>
            React
          </button>
          <button onClick={() => this.setState({ outputMode: 'css' })}>
            CSS
          </button>
          <button onClick={() => this.setState({ outputMode: 'internal' })}>
            Internal
          </button>
        </div> */}
        {outputMode === 'react' && (
          <Fragment>
            <pre>const Layout = styled.div`\n{cssString}\n`</pre>
          </Fragment>
        )}
        {outputMode === 'css' && (
          <Fragment>
            <div style={{ display: 'flex' }}>
              <div style={{ flex: 1 }}>
                <h3>HTML</h3>
                <pre>
                  {`
<div class='container'>
${panes.map(pane => `  <div class='area-${pane.gridArea}'></div> `).join('\n')}
</div>`}
                </pre>
              </div>
              <div style={{ flex: 1 }}>
                <h3>CSS</h3>
                <pre> {cssString} </pre>
              </div>
            </div>
          </Fragment>
        )}
        {outputMode === 'internal' && (
          <Fragment>
            <h3>Grid Generator Internal Expression</h3>
            <pre> {JSON.stringify(gridState, null, 2)} </pre>
          </Fragment>
        )}
      </div>
    )
  }
}

/* @flow */
import type { GridState } from '../../domain/GridState'
import { toCSS, toStyledComponents } from '../../domain/Formatter'
import React, { Fragment } from 'react'

export default class Output extends React.Component<
  {
    gridState: GridState
  },
  {
    outputMode: 'css' | 'react' | 'internal'
  }
> {
  state = {
    outputMode: 'css'
  }

  render() {
    const { gridState } = this.props
    const { outputMode } = this.state

    return (
      <div style={{ padding: '10px' }}>
        <div>
          OutputMode:
          <button onClick={() => this.setState({ outputMode: 'css' })}>
            CSS
          </button>
          <button onClick={() => this.setState({ outputMode: 'react' })}>
            styled-components
          </button>
          {/* <button onClick={() => this.setState({ outputMode: 'internal' })}>
            Internal
          </button> */}
        </div>
        {outputMode === 'react' && (
          <Fragment>
            <pre>{toStyledComponents(gridState)}</pre>
          </Fragment>
        )}
        {outputMode === 'css' && (
          <Fragment>
            <pre>{toCSS(gridState)}</pre>
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

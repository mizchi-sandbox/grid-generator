/* @flow */
import React, { Fragment } from 'react'
import paramCase from 'param-case'

export default class Output extends React.Component<
  {
    state: any,
    containerStyle: any,
    outputMode: any
  },
  {
    outputMode: 'css' | 'react' | 'internal'
  }
> {
  state = {
    outputMode: 'css'
  }

  render() {
    const { state, containerStyle } = this.props
    const { outputMode } = this.state

    const cssString =
      '.container {\n' +
      Object.keys(containerStyle)
        .map(key => {
          const value = containerStyle[key]
          return `  ${paramCase(key)}: ${value};`
        })
        .join('\n') +
      '\n}'
    return (
      <Fragment>
        <div>
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
        </div>
        {outputMode === 'react' && (
          <Fragment>
            <h3>React Style Object</h3>
            <pre>const style = {JSON.stringify(containerStyle, null, 2)}</pre>
          </Fragment>
        )}
        {outputMode === 'css' && (
          <Fragment>
            <h3>CSS</h3>
            <pre> {cssString} </pre>
          </Fragment>
        )}
        {outputMode === 'internal' && (
          <Fragment>
            <h3>Grid Generator Internal Expression</h3>
            <pre> {JSON.stringify(state, null, 2)} </pre>
          </Fragment>
        )}
      </Fragment>
    )
  }
}

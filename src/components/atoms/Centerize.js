/* @flow */
import * as React from 'react'
export default function Centerize({ children }: { children: any }) {
  return (
    <div style={{ height: '100%' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          height: '100%',
          alignItems: 'center'
        }}
      >
        {children}
      </div>
    </div>
  )
}

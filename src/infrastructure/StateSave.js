/* @flow */
import type { State } from '../reducers'

export const VERSION = '5'
export const LAST_SAVE_VERSION = 'last-save-version'
export const STATE = 'state'

export function load(): ?State {
  const lastState = window.localStorage.getItem(STATE)
  if (lastState) {
    const state = JSON.parse(lastState)
    return state
  }
}

export function save(props: State) {
  window.localStorage.setItem(STATE, JSON.stringify(props))
  window.localStorage.setItem(LAST_SAVE_VERSION, VERSION)
}

export function checkLastVersion() {
  const lastSaveVersion = window.localStorage.getItem(LAST_SAVE_VERSION)
  if (VERSION !== lastSaveVersion) {
    window.localStorage.clear()
  }
}

/* @flow */
export type Dispatch<Action, State = *> = (

    | Action // normal, dispatch
    | Promise<Action> // redux-promise
    | (((Action) => any, () => State) => any) // redux-thunk
) => Action

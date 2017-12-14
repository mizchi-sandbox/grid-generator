# Concept

## Layer

* 型定義
* Tree 定義
* GUI

## Event

```js
type Update = {
  type: ''
}
```

## Abstract UI Layer

```yml
# Event Layer
- :events
  - a
  - b
- :reducers
  - conunter
    - $events
      -
        name: increment
      -
        name: decrement
      -
        name: add
        payload: number

# UI Layer
- $atoms
  - Label
- $molecules
  - UserList
    - m:UserProfile
  - UserProfile
    - a:Label
    - a:Icon
- $organisms
  - Header
  - Cotent
    - $Router
      - route:/
        - o:Home
      - route:/users
        - o:Users
      - route:/users/:uid
        - o:User
  - Home
    - Label
  - Users
    - m:UserList
  - User
    - m:UserProfile
  - $Layout
    - Header
    - Content
    - Footer
```

```js
const Layout = () => (
  <>
    <Layout>
      <Header />
      <Content />
      <Footer />
    </Layout>
  </>
)
```

## Grid mapping

```
-----
|   |
-----
```

# react-css-variables

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

[build-badge]: https://img.shields.io/travis/jide/react-css-variables.git/master.png?style=flat-square
[build]: https://travis-ci.org/jide/react-css-variables.git

[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package

[coveralls-badge]: https://img.shields.io/coveralls/jide/react-css-variables.git/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/jide/react-css-variables.git

```
npm install --save styled-components
npm install --save react-css-variables
```

Until [this issue](https://github.com/facebook/react/issues/6411) is fixed, it is not possible to inject css variables in React through inline props.

This component leverages [styled-components](https://github.com/styled-components/styled-components) to allow easy injection of css variables.

## Usage

```jsx
const Title = styled.h1`
  color: var(--color)
`

const Demo = () => (
  <CSSVariables color='red'>
    <Title>
      Hello world
    </Title>
  </CSSVariables>
```

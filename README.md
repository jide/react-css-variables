# react-css-variables

[![npm package][npm-badge]][npm]

[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package

```
npm install --save react-css-variables
```

# A React HOC for CSS variables

Provides a HOC to create a component with props mapped to CSS variables. It allows to update CSS of underlying components without any DOM operation.

The HOC won't trigger a render if only one of the variables is changed. This can be a huge performance improvement if you have a component with a deep VDOM tree, since instead of passing props in elements as inline styles, you can only set variables no render will be triggered.

## Usage

```jsx
import styled from 'styled-components'
import variables from 'react-css-variables'

// We use styled-components, but it's totally up to you, as long as the css uses variables.
const Title = styled.h1`
  color: var(--color);
  background: var(--background);
`

// Wrap our component with provided HOC.
const VariablesTitle = variables('color', 'background')(Title)

// Changing "color" or "background" will not trigger a render.
const Demo = () => (
  <VariablesTitle color='red' background='blue'>
    Hello world
  </VariablesTitle>
)
```

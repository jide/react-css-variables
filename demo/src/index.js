import React, { Component } from 'react'
import { render } from 'react-dom'
import styled from 'styled-components'

import variables from '../../src'

const Circle = styled.div`
  position: absolute;
  width: 10px;
  height: 10px;
  background: blue;
  border-radius: 50%;
  left: calc(var(--x) * 1px);
  top: calc(var(--y) * 1px);
`

const VariablesCircle = variables('x', 'y')(Circle)

const InlineCircle = (({ x, y }) => <Circle style={{ left: `${x}px`, top: `${y}px` }}/>)

class Demo extends Component {
  state = { type: 'variables', x: 0, y: 0 }

  componentDidMount() {
    document.addEventListener('mousemove', this.handleMouseMove)
  }
  
  componentWillUnmount() {
    document.removeEventListener('mousemove', this.handleMouseMove)
  }

  handleMouseMove = event => {
    this.setState({
      x: event.screenX,
      y: event.screenY,
    })
  }

  handleChange = event => {
    this.setState({
      type: event.target.value
    })
  }

  render() {
    const { x, y, type } = this.state
    const Comp = type === 'variables' ? VariablesCircle : InlineCircle
    const items = []
    let yy = 0

    for (let i = 0; i < 500; i++) {
      const j = i % 25
      const xx = j * 10

      if (j === 0) {
        yy += 10
      }

      items.push(<Comp key={ i } x={ x + xx } y={ y + yy }/>)
    }

    return (
      <div>
        <label>
          <input type='radio' value='variables' checked={ type === 'variables' } onChange={ this.handleChange }/>
          Use variables
        </label>
        <label>
          <input type='radio' value='inline' checked={ type === 'inline' } onChange={ this.handleChange }/>
          Use inline styles
        </label>
        { items }
      </div>
    )
  }
}

render(<Demo/>, document.querySelector('#demo'))

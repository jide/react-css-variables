import React, { Component } from 'react'
import { render } from 'react-dom'
import styled from 'styled-components'

import variables from '../../src'

const Circle = styled.div`
  position: absolute;
  left: var(--x);
  top: var(--y);
  width: 10px;
  height: 10px;
  background: blue;
  border-radius: 50%;
`

const VariablesCircle = variables('x', 'y')(Circle)

const VanillaCircle = (({ x, y }) => <Circle style={{ left: x, top: y }}/>)

class Demo extends Component {
  state = {}

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

  render() {
    const items = []
    let y = 0

    for (let i = 0; i < 500; i++) {
      const j = i % 25
      const x = j * 10

      if (j === 0) {
        y += 10
      }

      items.push(<VariablesCircle key={ i } x={ `${x + this.state.x}px` } y={ `${y  + this.state.y}px` }/>)
    }

    return (
      <div>{ items }</div>
    )
  }
}

render(<Demo/>, document.querySelector('#demo'))

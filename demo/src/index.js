import React, { Component } from 'react'
import {render} from 'react-dom'
import styled from 'styled-components'
import { Motion, spring } from 'react-motion' 

import Variables from '../../src'

const Title = styled.h1`
  font-size: 3.5em
  text-align: center
  transform: var(--transform)
  color: var(--color, palevioletred)
`

const SubTitle = styled(Title)`
  font-size: 1.5em
`

const Button = styled.button`
  font-size: 1.4em
  background: none
  margin: 1em
  padding: 0.25em 1em
  border-radius: 3px
  outline: none
  position: relative
  z-index: 10
  color: var(--color, palevioletred)
  border: 2px solid var(--color, palevioletred)
`

class Demo extends Component {
  state = {
    color: 'palevioletred',
    open: false
  }

  handleClick = () => {
    this.setState({
      color: this.state.color === 'lightgray' ? 'palevioletred' : 'lightgray',
      open: !this.state.open
    })
  }

  render() {
    return (
      <Motion defaultStyle={{ y: 0 }} style={{ y: spring(this.state.open ? 5 : 0) }}>
        { ({ y }) => (
          <Variables
            color={ this.state.color }
            transform={ `translate3d(0, ${y}em, 0)` }
          >
            <div>
              <Title>
                Hello world
              </Title>
              <SubTitle>
                CSS Variables !
              </SubTitle>
              <Button onClick={ this.handleClick }>Click me</Button>
            </div>
          </Variables>
        ) }
      </Motion>
    )
  }
}

render(<Demo/>, document.querySelector('#demo'))

import expect from 'expect'
import React from 'react'
import { mount } from 'enzyme'
import styled from 'styled-components'

import variables from 'src/'

const Rect = styled.div`
  position: absolute;
  width: 10px;
  height: 10px;
  background: red;
  left: calc(var(--x, 0) * 1px);
  top: calc(var(--y, 0) * 1px);
`

describe('CSSVariables', () => {
  let root

  beforeEach(() => {
    root = document.createElement('div')
    document.body.appendChild(root)
  })

  afterEach(() => {
    document.body.removeChild(root)
  })

  it('correctly sets initial variable', () => {
    const Demo = variables('x')(Rect)
    const wrapper = mount(
      <Demo x={ 30 }/>, { attachTo: root }
    )

    const node = wrapper.getDOMNode()

    expect(window.getComputedStyle(node).getPropertyValue('left')).toEqual('30px')
  })

  it('correctly sets multiple initial variables', () => {
    const Demo = variables('x', 'y')(Rect)
    const wrapper = mount(
      <Demo x={ 30 } y={ 20 }/>, { attachTo: root }
    )

    const node = wrapper.getDOMNode()

    expect(window.getComputedStyle(node).getPropertyValue('left')).toEqual('30px')
    expect(window.getComputedStyle(node).getPropertyValue('top')).toEqual('20px')
  })

  it('correctly updates single variable', () => {
    const Demo = variables('x')(Rect)
    const wrapper = mount(
      <Demo/>, { attachTo: root }
    )

    const node = wrapper.getDOMNode()

    expect(window.getComputedStyle(node).getPropertyValue('left')).toEqual('0px')
    wrapper.setProps({ x: 10 })
    expect(window.getComputedStyle(node).getPropertyValue('left')).toEqual('10px')
    wrapper.setProps({ x: 30 })
    expect(window.getComputedStyle(node).getPropertyValue('left')).toEqual('30px')
  })

  it('correctly updates multiple variables', () => {
    const Demo = variables('x', 'y')(Rect)
    const wrapper = mount(
      <Demo/>, { attachTo: root }
    )

    const node = wrapper.getDOMNode()

    expect(window.getComputedStyle(node).getPropertyValue('left')).toEqual('0px')
    wrapper.setProps({ x: 10 })
    expect(window.getComputedStyle(node).getPropertyValue('left')).toEqual('10px')
    wrapper.setProps({ y: 30 })
    expect(window.getComputedStyle(node).getPropertyValue('top')).toEqual('30px')
  })

  it('correctly updates variable when setting style', () => {
    const Demo = variables('x')(Rect)
    const wrapper = mount(
      <Demo/>, { attachTo: root }
    )

    const node = wrapper.getDOMNode()

    wrapper.setProps({ style: { top: 20 } })
    expect(window.getComputedStyle(node).getPropertyValue('top')).toEqual('20px')
    wrapper.setProps({ x: 30 })
    expect(window.getComputedStyle(node).getPropertyValue('top')).toEqual('20px')
    expect(window.getComputedStyle(node).getPropertyValue('left')).toEqual('30px')
  })
})

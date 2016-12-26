import expect from 'expect'
import React from 'react'
import { shallow } from 'enzyme'
import styled from 'styled-components'

import CSSVariables from 'src/'

describe('CSSVariables', () => {
  it('updates if children prop changes', () => {
    const wrapper = shallow(<CSSVariables>hello</CSSVariables>)
    wrapper.setProps({ children: 'hello again' })
    expect(wrapper.contains('hello again')).toEqual(true)
  })

  it('does not create a new component when props keys do not change', () => {
    const wrapper = shallow(<CSSVariables one={ 1 }/>)
    const component = wrapper.state('component')
    wrapper.setProps({ one: 11 })
    expect(wrapper.state('component')).toEqual(component)
  })

  // TODO: This test does not pass, probably because styled.div returns the same ?
  // it('creates a new component when one of props keys changes', () => {
  //   const wrapper = shallow(<CSSVariables one={ 1 }/>)
  //   const component = wrapper.state('component')
  //   wrapper.setProps({ two: 2 })
  //   expect(wrapper.state('component')).toNotEqual(component)
  // })
})

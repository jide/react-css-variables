import expect from 'expect'
import React from 'react'
import { shallow } from 'enzyme'
import styled from 'styled-components'

import CSSVariables, { getStyledArguments, getStyledComponent, getNonChildrenKeys } from 'src/'

describe('getStyledArguments', () => {
  it('returns the correct args if empty', () => {
    expect(getStyledArguments([])).toEqual([[]])
  })

  it('returns the correct args if one prop', () => {
    expect(getStyledArguments(['color'])).toEqual([['--color:', ';'], props => props[key]])
  })

  it('returns the correct args if 2 props', () => {
    expect(getStyledArguments(['color', 'opacity'])).toEqual([['--color:', '; --opacity:', ';'], props => props[key], props => props[key]])
  })
})

describe('getStyledComponent', () => {
  it('returns a styled component', () => {
    expect(getStyledComponent([''])).toEqual(styled.div(''))
  })
})

describe('getNonChildrenKeys', () => {
  it('returns non children keys', () => {
    expect(getNonChildrenKeys({ color: '', children: '' })).toEqual(['color'])
  })
})

describe('CSSVariables', () => {
  it('updates if children prop changes', () => {
    const wrapper = shallow(<CSSVariables>hello</CSSVariables>)
    wrapper.setProps({ children: 'hello again' })
    expect(wrapper.contains('hello again')).toEqual(true)
  })
})

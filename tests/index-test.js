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
    const args = getStyledArguments(['color'])
    expect(args[0]).toEqual(['--color:', ';'])
    expect(args.length).toEqual(2)
  })

  it('returns the correct args if 2 props', () => {
    const args = getStyledArguments(['color', 'opacity'])
    expect(args[0]).toEqual(['--color:', '; --opacity:', ';'])
    expect(args.length).toEqual(3)
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

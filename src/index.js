import React, { PureComponent } from 'react'
import styled from 'styled-components'
import isEqual from 'lodash.isequal'

export function getStyledArguments(keys) {
  const last = keys.length - 1
  const args = keys.reduce((acc, key, i) => {
    switch (i) {
      case 0:
        acc[0].push(`--${key}:`)
        if (last === 0) {
          acc[0].push(';')
        }
        break
      case last:
        acc[0].push(`; --${key}:`)
        acc[0].push(';')
        break
      default:
        acc[0].push(`; --${key}:`)
    }

    acc.push(props => props[key])

    return acc
  }, [[]])

  return args
}

export function getStyledComponent(keys) {
  return styled.div(...getStyledArguments(keys))
}

export function getNonChildrenKeys(props) {
  return Object.keys(props).filter(key => key !== 'children')
}

export default class CSSVariables extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      component: getStyledComponent(getNonChildrenKeys(props))
    }
  }

  componentWillReceiveProps(nextProps) {
    const nextNonChildrenKeys = getNonChildrenKeys(nextProps)

    if (!isEqual(getNonChildrenKeys(this.props), nextNonChildrenKeys)) {
      this.setState({
        component: getStyledComponent(nextNonChildrenKeys)
      })
    }
  }

  render() {
    return <this.state.component { ...this.props }/>
  }
}

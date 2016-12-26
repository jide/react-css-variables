import React, { PureComponent } from 'react'
import styled from 'styled-components'
import isEqual from 'lodash.isequal'

export default class CSSVariables extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      component: this.getStyledComponent(this.getNonChildrenKeys(props))
    }
  }

  componentWillReceiveProps(nextProps) {
    const nextNonChildrenKeys = this.getNonChildrenKeys(nextProps)

    if (!isEqual(this.getNonChildrenKeys(this.props), nextNonChildrenKeys)) {
      this.setState({
        component: this.getStyledComponent(nextNonChildrenKeys)
      })
    }
  }

  getNonChildrenKeys(props) {
    return Object.keys(props).filter(key => key !== 'children')
  }

  getStyledComponent(keys) {
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
          acc[0].push(` --${key}:`)
          acc[0].push(';')
          break
        default:
          acc[0].push(` --${key}:`)
      }

      acc.push(props => props[key])

      return acc
    }, [[]])

    return styled.div(...args)
  }

  render() {
    return <this.state.component { ...this.props }/>
  }
}

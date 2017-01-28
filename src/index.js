import React, { Component } from 'react'
import shallowEqual from './shallowEqual'
import omit from 'lodash.omit'

export function getNonChildren(props) {
  return omit(props, 'children')
}

export function getStyle(props) {
  return Object.keys(props)
    .filter(key => key !== 'children')
    .map(key => `--${key}:${props[key]};`)
    .join('')
}

export default class CSSVariables extends Component {
  componentDidMount() {
    const nonChildren = getNonChildren(this.props)
    this.node.setAttribute('style', getStyle(nonChildren))
  }

  componentWillReceiveProps(nextProps) {
    const nonChildren = getNonChildren(this.props)
    const nextNonChildren = getNonChildren(nextProps)

    if (!shallowEqual(nonChildren, nextNonChildren)) {
      this.node.setAttribute('style', getStyle(nextNonChildren))
    }
  }

  shouldComponentUpdate(nextProps) {
    return !shallowEqual(this.props.children, nextProps.children)
  }

  handleRef = node => this.node = node

  render() {
    return (
      <div ref={ this.handleRef }>
        { this.props.children }
      </div>
    );
  }
}

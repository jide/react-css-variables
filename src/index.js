import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import { shallowEqual, setStyle } from './utils'

export default class Variables extends Component {
  componentDidMount() {
    this.node = findDOMNode(this)
    setStyle(this.node, this.props)
  }

  componentWillReceiveProps(nextProps) {
    setStyle(this.node, this.props, nextProps)
  }

  shouldComponentUpdate(nextProps) {
    return !shallowEqual(this.props.children, nextProps.children)
  }

  setVariables(variables) {
    setStyle(this.node, this.props, { ...this.props, ...variables })
  }

  render() {
    return this.props.children
  }
}

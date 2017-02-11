import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import pick from 'lodash.pick'
import omit from 'lodash.omit'
import { shallowEqual, setVariables, getDisplayName } from './utils'

export default function(...varNames) {
  return WrappedComponent => class extends Component {
    displayName = getDisplayName(WrappedComponent)

    constructor(props) {
      super(props)

      this.state = {
        varProps: pick(props, ...varNames),
        ownProps: omit(props, ...varNames)
      }
    }

    componentDidMount() {
      setVariables(findDOMNode(this), this.state.ownProps)
    }

    componentWillReceiveProps(nextProps) {
      const prevVarProps = this.state.varProps

      this.setState({
        varProps: pick(nextProps, ...varNames),
        ownProps: omit(nextProps, ...varNames)
      }, () => {
        if (!shallowEqual(prevVarProps, this.state.varProps)) {
          setVariables(findDOMNode(this), this.state.varProps)
        }
      })
    }

    shouldComponentUpdate(nextProps, nextState) {
      return !shallowEqual(this.state.ownProps, nextState.ownProps)
    }

    render() {
      return <WrappedComponent { ...this.state.ownProps }/>
    }
  }
}

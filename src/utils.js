import omit from 'lodash.omit'

const hasOwn = Object.prototype.hasOwnProperty

export function applyNodeStyle(node, styles) {
  const length = Object.keys(styles).length

  if (length === 0) {
    return
  }
  else if (length === 1) {
    node.style.setProperty(styles[0].key, styles[0].value)
  }
  else {
    node.setAttribute('style', styles.map(({ key, value }) => `${key}:${value};`).join(''))
  }
}

export function getStyles(props) {
  return Object.keys(props).map(key => ({ key: `--${key}`, value: props[key] }))
}

export function setVariables(node, variables = {}) {
  if (node) {
    applyNodeStyle(node, getStyles(variables))
  }
}

export function getDisplayName(WrappedComponent) {
  const name = WrappedComponent.displayName
    || WrappedComponent.name
    || 'Component'

  return `Variables(${name})`
}

export function shallowEqual(a, b) {
  if (a === b) return true

  let countA = 0
  let countB = 0
  
  for (let key in a) {
    if (hasOwn.call(a, key) && a[key] !== b[key]) return false
    countA++
  }

  for (let key in b) {
    if (hasOwn.call(b, key)) countB++
  }

  return countA === countB
}

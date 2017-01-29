import omit from 'lodash.omit'

const hasOwn = Object.prototype.hasOwnProperty

export function applyNodeStyle(node, styles) {
  const length = Object.keys(styles).length

  if (!length) {
    return
  }
  else if (length === 1) {
    node.style.setProperty(styles[0].key, styles[0].value)
  }
  else {
    node.setAttribute('style', styles.map(({ key, value }) => `${key}:${value};`).join(''))
  }
}

export function getNonChildren(props) {
  return omit(props, 'children')
}

export function getStyles(props) {
  return Object.keys(props)
    .filter(key => key !== 'children')
    .map(key => ({ key: `--${key}`, value: `${props[key]};` }))
}

export function setStyle(node, props, nextProps) {
  const nonChildren = getNonChildren(props)

  if (nextProps === undefined) {
    applyNodeStyle(node, getStyles(nonChildren))
  }
  else {
    const nextNonChildren = getNonChildren(nextProps)

    if (!shallowEqual(nonChildren, nextNonChildren)) {
      applyNodeStyle(node, getStyles(nonChildren))
    }
  }
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

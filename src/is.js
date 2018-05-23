import {css} from 'styled-components'
import invariant from 'invariant'

export default function is(checker) {
  const type = typeof checker

  invariant(
    type === 'string' || type === 'function',
    '[styled-fns]: `is()` should accept string or function as argument',
  )

  return (...args) => props => {
    if (typeof checker === 'function') {
      return checker(props) ? css(...args) : null
    }

    return props[checker] ? css(...args) : null
  }
}

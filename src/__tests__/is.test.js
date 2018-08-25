import React from 'react'
import renderer from 'react-test-renderer'
import styled from 'styled-components'
// eslint-disable-next-line import/no-unassigned-import
import 'jest-styled-components'

import is from '../is'

describe('is', () => {
  it('should throw error if argument is not type of string or function', () => {
    expect(() => {
      // eslint-disable-next-line no-unused-vars
      const Comp = styled.div`
        ${is(true)``};
      `
    }).toThrowErrorMatchingSnapshot()
  })

  it('should accept a string as argument `name` to check whether `props[name]` is true or false', () => {
    // const checker = is('loading')`colors`;
    const Example = styled.div`
      ${is('loading')`
        display: none;
      `};
    `

    const tree1 = renderer.create(<Example loading />).toJSON()

    expect(tree1).toHaveStyleRule('display', 'none')
    expect(tree1).toMatchSnapshot()

    const tree2 = renderer.create(<Example />).toJSON()

    expect(tree2).not.toHaveStyleRule('display', 'none')
    expect(tree2).toMatchSnapshot()
  })

  it('should accept a function as argument `checker` to check whether `checker(props) is true or false`', () => {
    const Example = styled.div`
      ${is(({loading, primary}) => loading && primary)`
        display: none;
      `};
    `

    const tree1 = renderer.create(<Example loading primary />).toJSON()

    expect(tree1).toHaveStyleRule('display', 'none')
    expect(tree1).toMatchSnapshot()

    const tree2 = renderer.create(<Example loading />).toJSON()

    expect(tree2).not.toHaveStyleRule('display', 'none')
    expect(tree2).toMatchSnapshot()

    const tree3 = renderer.create(<Example primary />).toJSON()

    expect(tree3).not.toHaveStyleRule('display', 'none')
    expect(tree3).toMatchSnapshot()
  })
})

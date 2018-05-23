### `variants`

```javascript
({ [key: any]: any }, (propName: string = 'variant'), defaultValue: any)
```

The first argument is an object whose keys represent the value of variant, and values correspond to the specified variant value.

The second argument is a property key used for reading the variant value from `props`.

```javascript
import styled from 'styled-components'
import {variants} from 'styled-fns'

// use `type` as the property name to pick matched branch
const getColor = variants(
  {
    primary: 'blue',
    secondary: 'violet',
    danger: 'red',
  },
  'type',
  'black'
)

const Button = styled.button`
  color: ${getColor};
`

<Button type="primary" /> // color: blue;
<Button type="no-match" /> // color: black;
```

### ` calc`` `

` calc`` ` is a tagged template used to calculate math expression that involves calculations of unit.

For example:

```javascript
const WIDTH = '100px'

const ANOTHER_WIDTH = calc`(${WIDTH} * 2) + ${'100px'}`
// ANOTHER_WIDTH -> '300px'
```

It's worth noting that ` calc`` ` leverage the placeholder in template literal to recognize the variable with a unit.

**So if you want to declare a value with a unit in your expression, you must put them inside placeholder `${}`, throwing an exception otherwise**.

If the expression doesn't contain a unit, then the return value of `calc` would by type of `number` instead of a `string`.

> Warning: there can only be one unit in the expression. It's not same as `calc()` function in css properties which calculates layout dynamically with multiple units.

### ` is()`` `

This utility is a function accepts an argument is `string` or `function` and return a tagged template function. The other types of params will cause it throwing an error.

While param is `string`, check whether `props[checker]` is true:

```javascript
import {is} from 'styled-fns'

const Example = styled.div`
  ${is('loading')`
    display: none;
  `};
`

// only while `props.loading` is true, the component will display as `none`
```

While param is `function`, the checker will accept `props` as its argument:

```javascript
import {is} from 'styled-fns'

const Example = styled.div`
  ${is(({loading, primary}) => loading && primary)`
    display: none;
  `};
`

// while both `props.loading` and `props.primary` are true, the component will display as `none`
```

### `variants`

```javascript
;({[key]: any}, (propName = 'variant'))
```

The first argument is

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
)

const Button = styled.button`
  color: ${getColor};
`
;<Button type="primary" />
```

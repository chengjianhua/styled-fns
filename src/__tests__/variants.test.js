import variants from '../variants'

describe('variants', () => {
  it('should return matched value', () => {
    const primaryValue = 'red'
    const getMatched = variants({
      primary: primaryValue,
      secondary: 'blue',
    })
    const matched = getMatched({variant: 'primary'})

    expect(matched).toBe(primaryValue)
  })

  it('should use the specified property key to pick the matched value', () => {
    const primaryValue = 'red'
    const getMatched = variants(
      {
        primary: primaryValue,
        secondary: 'blue',
      },
      'type',
    )
    const matched = getMatched({type: 'primary'})

    expect(matched).toBe(primaryValue)
  })
})

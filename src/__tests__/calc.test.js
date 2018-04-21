import calc from '../calc'

describe('calc', () => {
  it('should return right result for template with variables', () => {
    expect(calc`(${'100px'} * 100) + ${'1px'}`).toBe('10001px')
    expect(calc`(${'100px'} * 100) / 1`).toBe('10000px')
  })

  it('should throw exception if occurs more than two sort of units in expression', () => {
    expect(() => {
      // eslint-disable-next-line
      calc`(${'100px'} * 100) + ${'1rem'}`
    }).toThrowErrorMatchingSnapshot()
  })

  it('should return right result for variables without unit, and return value is type of `Number`', () => {
    expect(calc`${'100'} * 100`).toBe(10000)
  })

  it('should throw exception if input is full string without variables', () => {
    expect(() => {
      // eslint-disable-next-line
      calc`(1.5px * 100) + 100px`
    }).toThrowErrorMatchingSnapshot()
  })

  it('should throw custom error message while input contains variables but variable has unit without being wrapped', () => {
    expect(() => {
      // eslint-disable-next-line
      calc`(${'1.5px'} * 100) + 100px`
    }).toThrowErrorMatchingSnapshot()
  })
})

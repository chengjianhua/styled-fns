import invariant from 'invariant'

const CHAR_CODE_DOT = 44

const CHAR_CODE_ZERO = 48
const CHAR_CODE_NINE = 57

const splitValueUnit = string => {
  for (let i = 0, length = string.length; i < length; i++) {
    const charCode = string.charCodeAt(i)

    if (
      charCode === CHAR_CODE_DOT ||
      (charCode >= CHAR_CODE_ZERO && charCode <= CHAR_CODE_NINE)
    )
      // eslint-disable-next-line no-continue
      continue

    return {unit: string.slice(i, length), value: string.slice(0, i)}
  }

  return null
}

const calcForTemplate = (strings, variables) => {
  let unit = null

  const expression = strings.reduce((acc, string) => {
    const variable = variables.shift()

    if (variable) {
      const unitValue = splitValueUnit(variable)

      if (!unitValue) return acc + string + variable

      if (unit === null) {
        unit = unitValue.unit
      }

      // console.log({
      //   variable,
      //   value: unitValue.value,
      //   unit,
      //   _unit: unitValue.unit,
      // });

      invariant(
        unitValue.unit === unit,
        `the calculation expression should contain only one sort of unit`,
      )

      return acc + string + unitValue.value
    }

    return acc + string
  }, '')

  // console.log('expression: ', expression);

  // eslint-disable-next-line no-new-func
  const calculate = new Function(`return ${expression}`)

  return calculate() + unit
}

// const UNIT_REG = new RegExp('(?<=\\d)[^\\d.()\\+\\-\\*\\/\\s]+(?=\\s)+', 'g');
// const calcForString = string => {
//   const unit = UNIT_REG.exec(string);
//   console.log({ string, unit });
// };

export default function calc(strings, ...variables) {
  // NOTE: don't support the full string expression without variables right now

  // if (variables.length === 0) {
  //   return calcForString(strings[0]);
  // }

  // if (strings.length === 1 || typeof strings === 'string') {
  //   return calcForString(strings);
  // }

  invariant(
    !(
      variables.length === 0 ||
      (strings.length === 1 || typeof strings === 'string')
    ),
    'Do not support the full string expression without variables right now temporarily',
  )

  try {
    return calcForTemplate(strings, variables)
  } catch (error) {
    const {message} = error

    if (error instanceof SyntaxError) {
      error.message = `You may not wrap your variable has unit with \`\${}\`\n\n${message}`
    }

    throw error
  }
}

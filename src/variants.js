export default function variants(values, name = 'variant') {
  return function getVariant(props) {
    const variant = props[name]

    return variant && values[variant]
  }
}

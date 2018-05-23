export default function variants(values, name, defaultValue) {
  return function getVariant(props) {
    const variant = props[name || 'variant']

    if (!variant) return null

    return values[variant] || defaultValue
  }
}

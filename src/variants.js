export default function variants(values, name, defaultValue) {
  return function getVariant(props) {
    const variant = props[name || 'variant']

    if (variant === undefined) return null

    const value = values[variant]

    return value === undefined ? defaultValue : value
  }
}

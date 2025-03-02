export function snakeToCamel(text: string) {
  return text.replace(/([-_][a-z])/g, (group) =>
    group.toUpperCase()
      .replace('-', '')
      .replace('_', '')
  )
}

export function camelToSnake(text: string) {
  return text.replace(/([A-Z])/g, (group) => `_${group.toLowerCase()}`)
}

export function replaceObjectKeys(obj: Record<string, any>, keyReplacer: (key: string) => string): Record<string, any> {
  if (!obj) return obj
  
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [
      keyReplacer(key),
      value && typeof value === 'object'
        ? Array.isArray(value)
          ? value.map((item) => (typeof item === 'object' ? replaceObjectKeys(item, keyReplacer) : item))
          : replaceObjectKeys(value, keyReplacer)
        : value
    ])
  )
}

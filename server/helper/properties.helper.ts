export function snakeToCamel(str: string) {
  return str.replace(/([-_][a-z])/g, (group) =>
    group.toUpperCase()
      .replace('-', '')
      .replace('_', '')
  )
}

export function replaceObjectKeys(obj: Record<string, any>, keyReplacer: (key: string) => string): Record<string, any> {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [keyReplacer(key), value])
  )
}

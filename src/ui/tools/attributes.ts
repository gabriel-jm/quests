export function attrs(record: Record<string, string|number|boolean|undefined>) {
  return Object.entries(record).reduce((acc, [key, value]) => {
    let attribute = value ? `${key}="${value}" ` : ''
    
    if (typeof value === 'boolean') {
      attribute = `${key} `
    }

    return acc + attribute
  }, '')
}

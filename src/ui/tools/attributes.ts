export function attrs(record: Record<string, string|number|boolean>) {
  return Object.entries(record).reduce((acc, [key, value]) => {
    let attribute = `${key}="${value}" `
    
    if (typeof value === 'boolean') {
      attribute = `${key} `
    }

    return acc + attribute
  }, '')
}

export const getColumnNames = asset => {
  const parsedColumnFields = []
  Object.entries(asset).map(a => {
    parsedColumnFields.push({
      name: parseColumnFields(a[0]),

      label: [a[0]],
    })
  })
  return parsedColumnFields
}

const parseColumnFields = columnFields => {
  return columnFields
    .replace(/([A-Z])/g, ' $1')
    .trim()
    .split(' ')
    .join(' ')
}

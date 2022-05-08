export function constantToMap(constant) {
  const map = Object.keys(constant).reduce((map, name) => {
    const mapKey = constant[name].key
    map[mapKey] = constant[name]
    return map
  }, {})
  return Object.freeze(map)
}

export function constantToList(constant) {
  const list = Object.values(constant)
  return Object.freeze(list)
}

export function constantToKeyMap(constant, keyName = 'key') {
  const keyMap = Object.keys(constant).reduce((map, name) => {
    map[name] = constant[name][keyName]
    return map
  }, {})
  return Object.freeze(keyMap)
}

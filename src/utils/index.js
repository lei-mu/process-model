export function deepClone(target) {
  // weakMap 防止循环引用
  const map = new WeakMap()
  // obj
  function isObject(target) {
    return (
      (typeof target === 'object' && target) || typeof target === 'function'
    )
  }

  function clone(data) {
    // 基础类型
    if (!isObject(data)) {
      return data
    }
    // 日期 正则对象
    if ([Date, RegExp].includes(data.constructor)) {
      return new data.constructor(data)
    }
    // function
    if (typeof data === 'function') {
      return new Function('return ' + data.toString())()
    }

    // 对象已存在则直接返回
    const exit = map.get(data)
    if (exit) {
      return exit
    }

    // Map
    if (data instanceof Map) {
      const result = new Map()
      data.forEach((key, value) => {
        if (isObject(value)) {
          result.set(key, clone(value))
        } else {
          result.set(key, value)
        }
      })
      map.set(data, result)
      return result
    }

    // Set
    if (data instanceof Set) {
      const result = new Set()
      data.forEach((value) => {
        if (isObject(value)) {
          result.add(clone(value))
        } else {
          result.add(value)
        }
      })
      map.set(data, result)
      return result
    }
    if (Array.isArray(data)) {
      const result = []
      data.forEach((item) => {
        if (isObject(item)) {
          result.push(clone(item))
        } else {
          result.push(item)
        }
      })
      map.set(data, result)
      return result
    }
    // 收集键名
    const keys = Reflect.ownKeys(data)
    const allDesc = Object.getOwnPropertyDescriptors(data)
    const result = Object.create(Object.getPrototypeOf(data, allDesc))

    keys.forEach((key) => {
      const value = data[key]

      if (isObject(value)) {
        result[key] = clone(value)
      } else {
        result[key] = value
      }
    })
    map.set(data, result)
    return result
  }

  return clone(target)
}

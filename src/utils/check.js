// import { protocol } from './regix'
// import { isObject, isFunction } from 'lodash-es'
// import isPlainObject from 'lodash-es/isPlainObject'

// export const checkProtocol = (val) => {
//   return protocol.test(val)
// }

// export const isPromise = (val) => {
//   return isObject(val) && isFunction(val.then) && isFunction(val.catch)
// }
const kindOf = (cache => thing => {
  const str = toString.call(thing);
  return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
})(Object.create(null));

const typeOfTest = type => thing => typeof thing === type;

const {getPrototypeOf} = Object;

const isPlainObject = (val) => {
  if (kindOf(val) !== 'object') {
    return false;
  }

  const prototype = getPrototypeOf(val);
  return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(Symbol.toStringTag in val) && !(Symbol.iterator in val);
}



export const isString = typeOfTest('string');


export const isUndefined = typeOfTest('undefined');



/***
 * 是否为空
 * @param val
 * @return {boolean}
 */
export function isEmpty(val) {
  return (val === null) || (val === undefined) || (val === '')
}

/***
 * 是否是一个 不为空的真对象
 */

export function isNotEmptyObj(val) {
  return isPlainObject(val) && Object.getOwnPropertyNames(val).length !== 0
}

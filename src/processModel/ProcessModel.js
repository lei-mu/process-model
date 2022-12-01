import { isEmpty as myIsEmpty, isNotEmptyObj, isString, isUndefined } from '../utils/check'
import {deepClone} from '../utils/index.js'

import defaultsConfig from './config'
import {version} from '../../package.json'
// import isObject from 'lodash-es/isObject'
// import isEmpty from 'lodash-es/isEmpty'

// 无参数命令 的默认值
// eslint-disable-next-line no-void
const NO_ARG_COMMAND_VAL = void (0)

// 没有参数的标识key
const WITHOUT_PARAMETERS = 'without'
// 单参数命令
const SINGLE_PARAMETER = 'single'
// 多参数标识
const MULTI_PARAMETER = 'multi'

// 参数的key
const ARGUMENTS_NAME = 'value'

// 参数类型
const COMMAND_TYPE_KEY = 'type'
/**
 * @example
 * https://shigongbang.obs.cn-east-3.myhuaweicloud.com/material/650000/20210720219212964129485?x-image-process=image/resize,m_fill,w_270,h_205,limit_0
 * 只处理 x-image-process 字段，或者数组
 *
 * */
export default class ProcessModel {
  // TODO 后期考虑增加type,区分 image,video,imm。精细处理
  constructor (model, config = {}) {
    this._model = []
    this._config = deepClone({
      ...defaultsConfig,
      ...config
    })
    if (Array.isArray(model)) {
      this._arrayModelFormat(model)
    } else if (isString(model)) {
      this._stringModelFormat(model)
    }
  }

  VERSION = version

  _model
  _config

  /**
   * 返回modelItem
   * @param {string} name - name 必传
   * @param {string} value
   * @return {undefined}
   *
   * */
  _createModelItem (name, value) {
    const that = this
    if (!name) return
    // 是否为无参数命令
    const isNoArgCommand = this._config.withoutParamsCommand.includes(name)
    // 是否为多个参数的命令
    const multipleArgCommand = this._config.multipleArgCommand.includes(name)
    let argType = ''
    if (isNoArgCommand) {
      argType = WITHOUT_PARAMETERS
    } else if (multipleArgCommand) {
      argType = MULTI_PARAMETER
    } else {
      argType = SINGLE_PARAMETER
    }
    const modelItem = {
      name,
      [ARGUMENTS_NAME]: that._commandValueFormat(name, value),
      [COMMAND_TYPE_KEY]: argType
    }
    return modelItem
  }

  /***
   * 处理命令的值。
   * @param {string} name - name 必传，否则返回undefined
   * @param {any} value - 接收任何值
   * @return
   * 当 name 是一个无参数命令时 返回 NO_ARG_COMMAND_VAL
   * 当 name 是只有一个参数的命令时 返回 value
   * 当 name 是一个多参数命令时，如果value 是对象，则返回value;如果value 是字符串，则认为value 是一个多参数字符串，会把其格式化成对象返回；如果value 是undefined ，则返回{}；其他类型，返回value
   */
  _commandValueFormat (name, value) {
    if (!name) {
      // TODO name 必传
      return
    }
    const config = this._config
    // 是否为无参数命令
    const isNoArgCommand = config.withoutParamsCommand.includes(name)

    if (isNoArgCommand) {
      return NO_ARG_COMMAND_VAL
    } else {
      // 是否为多个参数的命令
      const multipleArgCommand = config.multipleArgCommand.includes(name)
      // value 不存在
      const valueIsUndefined = isUndefined(value)
      if (multipleArgCommand) {
        if (valueIsUndefined) return {}
        const valueType = typeof value
        if (valueType === 'object') {
          return value
        } else if (valueType === 'string') {
          const splitStr = value.split(config.COMMAND_SEPARATOR)
          return splitStr.reduce((pre, cur) => {
            if (cur) {
              const curSplit = cur.split(config.PARAMETER_SEPARATOR)
              const curComArgName = curSplit[0]
              if (curComArgName) {
                curSplit.shift()
                /***
                 * https://support.huaweicloud.com/fg-obs/obs_01_0461.html
                 * 因为在图片水印的时候，参数的值不一定只有一个_ ，所以这里删除第一个，后面的还原
                 */
                pre[curComArgName] = curSplit.join(config.PARAMETER_SEPARATOR)
              }
            }
            return pre
          }, {})
        } else {
          return {}
        }
      } else {
        return value
      }
    }
  }

  /***
   * 对数组模型进行格式化
   * @param {array} model - 模型
   * @param {string} model.name - 命令名称
   * @param {string | number | any} model.value - 命令值;可以是一个字符串模型，或者undefined
   * @private
   */
  _arrayModelFormat (model) {
    model.forEach(p1 => {
      const curName = p1.name
      this.append(curName, p1[ARGUMENTS_NAME])
    })
  }

  /***
   * 对字符串模型进行格式化
   * @param str
   * @private
   * @example
   * /resize,m_fill,w_270,h_205,limit_0/format,jpg
   */
  _stringModelFormat (str) {
    const commandSplit = str.split(this._config.PIPE_SEPARATOR)
    const COMMAND_SEPARATOR = this._config.COMMAND_SEPARATOR
    commandSplit.forEach(p1 => {
      if (p1) {
        const commandValSplit = p1.split(COMMAND_SEPARATOR)
        const commAndName = commandValSplit[0]
        commandValSplit.shift()

        const nameValue = commandValSplit.join(COMMAND_SEPARATOR)
        this.append(commAndName, nameValue)
      }
    })
  }

  /***
   * 追加参数。如果有同一个命令。参数会合并
   * @param name
   * @param value
   */
  append (name, value) {
    this._modelHandle(name, value, 'append')
  }

  /***
   * 设置参数，覆盖
   * @param name
   * @param value
   */
  set (name, value) {
    this._modelHandle(name, value, 'set')
  }

  /**
   * 删除指定命令
   * */
  delete (name) {
    if (name) {
      const model = this._model
      const nameIndex = model.findIndex(item => item.name === name)
      if (nameIndex > -1) {
        this._model.splice(nameIndex, 1)
      }
    }
  }

  /***
   * 指定name 是否存在
   * @param {string} name - 命令名称
   * @return {boolean}
   */
  has (name) {
    return this._model.some(item => item.name === name)
  }

  /***
   * 排序
   */
  sort () {
    const model = this._model
    const COMMAND_SORT = this._config.commandSort
    model.sort((a, b) => {
      return COMMAND_SORT.indexOf(a.name) - COMMAND_SORT.indexOf(b.name)
    })
    this._model = model
  }

  /***
   * model 处理
   * @param name
   * @param value
   * @param type {string} [set|append] set/append
   */
  _modelHandle (name, value, type) {
    if (!name) {
      return
    }
    const model = this._model
    // const typeValue = typeof value
    // const isNoArgCommand = WITHOUT_PARAMETERS_COMMAND.includes(name)
    const modelItem = this._createModelItem(name, value)
    if (!modelItem) return
    const modelLen = model.length
    if (modelLen === 0) {
      model.push(modelItem)
    } else {
      let hasCurCommand = true
      const lastIndex = modelLen - 1
      for (let i = 0; i < modelLen; i++) {
        const item = model[i]
        if (item.name === name) {
          const argType = item[COMMAND_TYPE_KEY]
          if (argType === SINGLE_PARAMETER) {
            // 只有一个参数的命令
            item[ARGUMENTS_NAME] = modelItem[ARGUMENTS_NAME]
          } else if (argType === MULTI_PARAMETER) {
            // 多参数命令
            if (type === 'set') {
              item[ARGUMENTS_NAME] = modelItem[ARGUMENTS_NAME]
            } else {
              item[ARGUMENTS_NAME] = {
                ...item[ARGUMENTS_NAME],
                ...modelItem[ARGUMENTS_NAME]
              }
            }
          }
          break
        } else if (i === lastIndex) {
          hasCurCommand = false
        }
      }
      if (!hasCurCommand) {
        model.push(modelItem)
      }
    }
    this._model = model
    this.sort()
  }

  toString () {
    const model = this._model
    const config = this._config
    return model.reduce((pre, cur) => {
      let val = ''
      const commandValue = cur[ARGUMENTS_NAME]
      const argType = cur[COMMAND_TYPE_KEY]
      // 不是无参数命令
      if (argType !== WITHOUT_PARAMETERS) {
        if (argType === MULTI_PARAMETER) {
          if (isNotEmptyObj(commandValue)) {
            let initVal = ''
            Object.keys(commandValue).forEach(p1 => {
              if (!myIsEmpty(commandValue[p1])) {
                initVal += `${config.COMMAND_SEPARATOR}${p1}${config.PARAMETER_SEPARATOR}${commandValue[p1]}`
              }
            })
            val = initVal
          }
        } else {
          if (!myIsEmpty(commandValue)) {
            val = `${config.COMMAND_SEPARATOR}${commandValue}`
          }
        }
        if (val) {
          pre += `${config.PIPE_SEPARATOR}${cur.name}${val}`
        }
      } else {
        pre += `${config.PIPE_SEPARATOR}${cur.name}`
      }
      return pre
    }, '')
  }
}

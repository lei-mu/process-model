import {
  WITHOUT_PARAMETERS_COMMAND as imageWithout,
  COMMAND_SORT as imageSort,
  MULTIPLE_ARG_COMMAND as imageMultiple
} from './image'
import {
  WITHOUT_PARAMETERS_COMMAND as immWithout,
  COMMAND_SORT as immSort,
  MULTIPLE_ARG_COMMAND as immMultiple
} from './imm'
import {
  WITHOUT_PARAMETERS_COMMAND as videoWithout,
  COMMAND_SORT as videoSort,
  MULTIPLE_ARG_COMMAND as videoMultiple
} from './video'

// 任务流名称
export const PROCESS_NAME = 'x-image-process'

/**
 * 分隔符
 * https://support.huaweicloud.com/fg-obs/obs_01_0224.html#obs_01_0224__table19527120647
 * */
// 参数分隔符
export const PARAMETER_SEPARATOR = '_'

// 命令分隔符
export const COMMAND_SEPARATOR = ','

// 管道分隔符
export const PIPE_SEPARATOR = '/'

// 无参数命令
export const WITHOUT_PARAMETERS_COMMAND = [...imageWithout, ...immWithout, ...videoWithout]

// 命令排序
export const COMMAND_SORT = [...imageSort, ...immSort, ...videoSort]

// 有多个参数的命令
export const MULTIPLE_ARG_COMMAND = [...imageMultiple, ...immMultiple, ...videoMultiple]

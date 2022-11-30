/***
 * https://support.huaweicloud.com/ugobs-obs/obs_41_0032.html
 *
 */





/***
 * 图片处理
 */

/**
 * 图片效果
 * */
// 亮度
export const COMMAND_BRIGHT = 'bright'

// 对比度
export const COMMAND_CONTRAST = 'contrast'

// 锐化
export const COMMAND_SHARPEN = 'sharpen'

// 模糊
export const COMMAND_BLUR = 'blur'

/**
 * 设置缩略
 * */
export const COMMAND_RESIZE = 'resize'

/**
 * 旋转图片
 * */
// 旋转设置
export const COMMAND_ROTATE = 'rotate'

// 自适应方向
export const COMMAND_AUTO_ORIENT = 'auto-orient'

/**
 * 剪切图片
 * */
// 普通剪切
export const COMMAND_CROP = 'crop'

// 内切圆
export const COMMAND_CIRCLE = 'circle'

// 索引剪切
export const COMMAND_INDEXCROP = 'indexcrop'

// 圆角剪切
export const COMMAND_ROUNDED_CORNERS = 'rounded-corners'

/**
 * 设置水印
 * */
// 设置水印
export const COMMAND_WATERMARK = 'watermark'

/**
 * 格式转换
 * */
// 格式转换
export const COMMAND_FORMAT = 'format'

// 渐进显示
export const COMMAND_INTERLACE = 'interlace'

/**
 * 质量变换
 * */
// 质量变换
export const COMMAND_QUALITY = 'quality'

// 设置图片瘦身
export const COMMAND_IMAGESLIM = 'imageslim'

/**
 * 获取图片信息
 * */
export const COMMAND_INFO = 'info'

/***
 * 获取图片平均色值
 * @type {string}
 */
// 获取图片平均色值
export const COMMAND_AVERAGE_HUE = 'average-hue'

// 无参数命令
export const WITHOUT_PARAMETERS_COMMAND = [COMMAND_INFO, COMMAND_AVERAGE_HUE, COMMAND_IMAGESLIM]

// 命令排序
export const COMMAND_SORT = [COMMAND_RESIZE, COMMAND_CROP, COMMAND_CIRCLE, COMMAND_INDEXCROP, COMMAND_ROUNDED_CORNERS, COMMAND_ROTATE, COMMAND_AUTO_ORIENT, COMMAND_BRIGHT, COMMAND_CONTRAST, COMMAND_SHARPEN, COMMAND_BLUR, COMMAND_WATERMARK, COMMAND_QUALITY, COMMAND_FORMAT, COMMAND_INTERLACE, COMMAND_IMAGESLIM, COMMAND_INFO, COMMAND_AVERAGE_HUE]

// 有多个参数的命令
export const MULTIPLE_ARG_COMMAND = [COMMAND_BLUR,COMMAND_RESIZE,COMMAND_CROP,COMMAND_CIRCLE,COMMAND_INDEXCROP,COMMAND_ROUNDED_CORNERS,COMMAND_WATERMARK,COMMAND_QUALITY]

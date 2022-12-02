# ProcessModel

ProcessModel 定义了一些实用的方法来处理类似 `/resize,w_200,h_200,m_fill,limit_0/format,webp/imageslim` 的字符串。

api 类似[URLSearchParams](https://developer.mozilla.org/zh-CN/docs/Web/API/URLSearchParams)



## 使用场景

[oss 数据处理](https://help.aliyun.com/document_detail/99372.html)

类似：`https://image-demo.oss-cn-hangzhou.aliyuncs.com/example.jpg?x-oss-process=image/crop,x_100,y_50`

[obs 图片处理](https://support.huaweicloud.com/fg-obs/obs_01_0001.html)

类似：`https://e-share.obs.cn-north-1.myhuaweicloud.com/example.jpg?x-image-process=image/resize,w_500,limit_0`

其他...



## 使用

### [npm](https://www.npmjs.com/package/process-model)

```` js
npm install process-model -S
````

### cdn

unpkg

```` js
https://www.unpkg.com/browse/process-model
````

jsdelivr

```` js
https://www.jsdelivr.com/package/npm/process-model
````



```` js
import ProcessModel from 'process-model'

const model = new ProcessModel()

model.append('resize', {
  w: 200,
  height: 200
})

model.delete('format')

model.has('resize')

model.set('resize', {
  w: 300
})

model.append('resize', 'w_400,h_500,limit_0')

model.sort()

model.toString() // /resize,w_400,h_500,limit_0
````

### 构造函数

```` js
ProcessModel(model, config)
````

返回一个ProcessModel 对象

#### model

字符串或者数组。对于同命令参数，后面的会覆盖前面的。

字符串

```` js
const modelInit = `/crop,x_100,y_50/format,webp`
const model = new ProcessModel(modelInit)
````

数组模型

````js
const modelInit = [
  {
    name: 'crop', // 命令名称
    value: { // 命令值
      x: 100,
      y: 500
    }
  },
  {
    name: 'resize',
    value: 'w_200,h_200' // 命令值也可以是一个多参数字符串
  },
  {
    name: 'format',
    value: 'png'
  },
  {
    name: 'imageslim'
  }
]

const model = new ProcessModel(modelInit)
````

#### config

默认参数

```` js
  // 无参数命令合集
  withoutParamsCommand: ['info', 'average-hue', ...],
  // 多个参数的命令合集
  multipleArgCommand: ['resize', 'crop', 'circle', ...],
  // 命令排序规则
  commandSort: ['resize', 'crop', ..., 'info', 'average-hue'],
  // 管道分隔符
  PIPE_SEPARATOR: '/',
  // 参数分隔符
  PARAMETER_SEPARATOR: '_',
  // 命令分隔符
  COMMAND_SEPARATOR: ','
````

将参数分为三类

1. 没有参数的命令; 例如 `info`,`imageslim`
2. 只有一个参数的命令; 例如 `format`, `interlace`
3. 多个参数的命令；例如`resize`

分别表示在上边的配置里

### 方法

#### append
追加参数。如果有同一个命令，参数会合并

```` js
model.append(name, value)
````

name： 命令名称；

value: 命令值；对象或者参数字符串；

````
model.append('resize', 'w_200,h_300,limit_0')
model.append('resize', {
	w: 400,
	h: 500,
	m: 'fill'
})
// 空值会被清除
model.append('resize', {
	m: null
})
model.append('info')
model.append('format', 'png')

model.toString() //  /resize,w_400,h_500,limit_0/format,png/info
````



#### set

设置参数。如果有同一个命令，会覆盖
```` js
model.set(name, value)
````

name： 命令名称；

value: 命令值；对象或者参数字符串；

````
model.set('resize', 'w_200,h_300,limit_0')
model.set('resize', {
	w: 400
})
model.set('info')
model.set('format', 'png')

model.toString() //  /resize,w_400/format,png/info
````

#### delete

删除指定命令
```` js
model.delete(name)
````

name： 命令名称；

````js
model.set('resize', 'w_200,h_300,limit_0')
model.set('resize', {
	w: 400
})
model.set('info')
model.set('format', 'png')

model.delete('resize')

model.toString() //  /format,png/info
````

#### has

判断是否存在指定命令

````js
model.has(name)
````

name： 命令名称；

````js
model.set('resize', 'w_200,h_300,limit_0')
model.set('resize', {
	w: 400
})
model.set('info')
model.set('format', 'png')

model.delete('resize')

model.has('resize') //  false
````

#### sort
按照 `config.commandSort` 排序规则进行排序

```` js
model.sort()
````



#### toString

返回序列化字符串;已经按照 `config.commandSort` 排序规则进行排序过。在使用`append`、`set` 等命令时，无需关注顺序。

```` js
model.toString()
````

### 属性

#### VERSION

返回版本号

```` js
model.VERSION // 1.0.0
````
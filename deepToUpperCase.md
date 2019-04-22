## 深度遍历对象，对值做大小写转换处理


```js
// 会生成新变量
export const deepToUpperCase = (target) => {
  if (target instanceof Array) {
    const arr = []
    target.forEach(item => {
        arr.push(deepToUpperCase(item))
    })
    return arr
  }
  else if (target instanceof Object) {
    const obj = {}
    Object.keys(target).forEach(key => {
        obj[key] = deepToUpperCase(target[key])
    })
    return obj
  }
  else if (typeof target == 'string') {
    return target.toUpperCase()
  }
  else {
    return target
  }
}
```

```js
//  在原有对象里直接修改
export const deepToUpperCaseCurrent = (current) => {
  if (current instanceof Array) {
    current.forEach((item, index) => {
        current[index] = deepToUpperCaseCurrent(item)
    })
    return current
  } else if (current instanceof Object) {
    Object.keys(current).forEach((key) => {
        current[key] = deepToUpperCaseCurrent(current[key])
    })
    return current
  } else if (typeof current == 'string') {
    return current.toUpperCase()
  } else {
    return current
  }
}
```
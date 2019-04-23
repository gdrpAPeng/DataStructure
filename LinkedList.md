## 单向链表

* 链表是一种非连续性, 非顺序性的一种存储结构，属于线性表

* 每个节点包含着一个 data(信息域) 和 next(指针域) 


### Node 节点类

```js
function Node(element) {
    this.element = element  //  信息域
    this.next = null    //  指针域
}
```

### 链表类
```js
function LList() {
    this.head = new Node('head')    //  头节点
    this.find = find    //  查找
    this.insert = insert    //  插入
    this.remove = remove
    this.findPre = findPre  //  查找前一个节点
}
```
链表内置方法


#### find: 查找与指定元素相匹配的节点
```js
function find(element) {
    let currentNode = this.head
    // 找不到时 currentNode 为 null
    while(currentNode.element != element) {
        currentNode = currentNode.next
    }
    return currentNode
}
```

#### insert: 在指定元素节点后面 插入 指定节点
```js
// 在某个指定节点后面 插入
function insert(element, target) {
    var node = new Node(element)
    var targetNode = this.find(target)  //  找到那个节点
    // 将新节点的 next 指向 目标节点的下一个节点
    // 再将目标节点的 next 指向 新节点
    node.next = targetNode.next
    targetNode.next = node
}
```

#### remove: 移除特定的节点
先找到该节点的上一个节点
```js
function remove(element) {
    var node = this.findPre(element)
    // 不为 null
    if(node.next) {
        node.next = node.next.next
    }
}
```

#### findPre: 找到特定元素节点的上一个节点
```js
// 找到目标节点的上一个节点
function findPre(element) {
    var currentNode = this.head
    while(currentNode.next && currentNode.next.element != element) {
        currentNode = currentNode.next
    }
    return currentNode
}
```
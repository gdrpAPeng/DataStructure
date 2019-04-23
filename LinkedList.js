
// 节点
function Node(element) {
    this.element = element  //  当前节点元素
    this.next = null    //  指向
}

function LList() {
    this.head = new Node('head')    //  头节点
    this.find = find    //  查找
    this.insert = insert    //  插入
    this.remove = remove
    this.findPre = findPre  //  查找前一个节点
    // this.display = display  //  显示链表 
}

function find(element) {
    let currentNode = this.head
    // 找不到时 currentNode 为 null
    while(currentNode.element != element) {
        currentNode = currentNode.next
    }
    return currentNode
}
// 在某个指定节点后面 插入
function insert(element, target) {
    var node = new Node(element)
    var targetNode = this.find(target)  //  找到那个节点
    // 将新节点的 next 指向 目标节点的下一个节点
    // 再将目标节点的 next 指向 新节点
    node.next = targetNode.next
    targetNode.next = node
}

function remove(element) {
    var node = this.findPre(element)
    // 不为 null
    if(node.next) {
        node.next = node.next.next
    }
}
// 找到目标节点的上一个节点
function findPre(element) {
    var currentNode = this.head
    while(currentNode.next && currentNode.next.element != element) {
        currentNode = currentNode.next
    }
    return currentNode
}
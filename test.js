const goods = [{
    "pid": "1321",
    "money": "28",
    "s_money": "",
    "j_money": "100-20"
}, {
    "pid": "1322",
    "money": "58",
    "s_money": "",
    "j_money": "100-20"
}, {
    "pid": "1324",
    "money": "18",
    "s_money": "",
    "j_money": "100-20"
}, {
    "pid": "1351",
    "money": "18.88",
    "s_money": "",
    "j_money": "100-20"
}, {
    "pid": "1333",
    "money": "28",
    "s_money": "18",
    "j_money": ""
}, {
    "pid": "1332",
    "money": "28",
    "s_money": "18.8",
    "j_money": ""
}, {
    "pid": "1366",
    "money": "28",
    "s_money": "",
    "j_money": "100-20,200-45"
}, {
    "pid": "1367",
    "money": "68",
    "s_money": "",
    "j_money": "100-20,200-45"
}, {
    "pid": "1368",
    "money": "98",
    "s_money": "",
    "j_money": "100-20,200-45"
}, {
    "pid": "1369",
    "money": "28.88",
    "s_money": "",
    "j_money": "100-20,200-45"
}
]

let reduceRules = {}
let total = 0

goods.forEach(item => {
    if(item.j_money && !item.s_money) {
        item.j_money.split(',').forEach(inItem => {
            if(!reduceRules[inItem]) {
                reduceRules[inItem] = []
            }
            //  将数据丢到对应满减规则里
            //  如果对应多种规则，在多种规则里都会存在一个商品数据
            item.isOk = false   //  判断是否已经算进去总价了
            reduceRules[inItem].push(item)  
        })
    } else {
        // 原价商品和特价商品
        total = total + Number(item.s_money? item.s_money: item.money);
    }
});
console.log(total)
let tempMoney = 0;
let max, min;
Object.keys(reduceRules).forEach(key => {
    tempMoney = 0
    reduceRules[key].forEach(item => {
        if(!item.isOk) {
            tempMoney += Number(item.money)
        }
    })
    // 判断是否满足 满减金额
    max = Number(key.split('-')[0])
    min = Number(key.split('-')[1])
    console.log(tempMoney, max, min)
    if(tempMoney > max) {
        tempMoney -= min;
        // 满足满减--那就标记一下
        reduceRules[key].forEach(item => {
            item.isOk = true
        })
    }
    console.log(tempMoney)
    total += tempMoney
})

console.log(reduceRules);
console.log(total);
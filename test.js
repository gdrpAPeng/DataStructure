// const goods = [{
//     "pid": "1321",
//     "money": "28",
//     "s_money": "",
//     "j_money": "100-20"
// }, {
//     "pid": "1322",
//     "money": "58",
//     "s_money": "",
//     "j_money": "100-20"
// }, {
//     "pid": "1324",
//     "money": "18",
//     "s_money": "",
//     "j_money": "100-20"
// }, {
//     "pid": "1351",
//     "money": "18.88",
//     "s_money": "",
//     "j_money": "100-20"
// }, {
//     "pid": "1333",
//     "money": "28",
//     "s_money": "18",
//     "j_money": ""
// }, {
//     "pid": "1332",
//     "money": "28",
//     "s_money": "18.8",
//     "j_money": ""
// }, {
//     "pid": "1366",
//     "money": "28",
//     "s_money": "",
//     "j_money": "100-20,200-45"
// }, {
//     "pid": "1367",
//     "money": "68",
//     "s_money": "",
//     "j_money": "100-20,200-45"
// }, {
//     "pid": "1368",
//     "money": "98",
//     "s_money": "",
//     "j_money": "100-20,200-45"
// }, {
//     "pid": "1369",
//     "money": "28.88",
//     "s_money": "",
//     "j_money": "100-20,200-45"
// }
// ]

/**
 * 分类：
 *      只满足一种满减规则(简称 - 仅一)
 *          满足金额 => 不管了
 *          不满足 => 多种满减规则里有无符合此满减规则的商品，补不足
 *      多种满减规则
 *          存在与 仅一 匹配的 => 移除該滿減規則 => 递归
 *          不存在与 仅一 匹配的 => 
 */






// let reduceRules = {}
// let total = 0

// goods.forEach(item => {
//     if(item.j_money && !item.s_money) {
//         item.j_money.split(',').forEach(inItem => {
//             if(!reduceRules[inItem]) {
//                 reduceRules[inItem] = []
//             }
//             //  将数据丢到对应满减规则里
//             //  如果对应多种规则，在多种规则里都会存在一个商品数据
//             item.isOk = false   //  判断是否已经算进去总价了
//             reduceRules[inItem].push(item)  
//         })
//     } else {
//         // 原价商品和特价商品
//         total = total + Number(item.s_money? item.s_money: item.money);
//     }
// });
// console.log(total)
// let tempMoney = 0;
// let max, min;
// Object.keys(reduceRules).forEach(key => {
//     tempMoney = 0
//     reduceRules[key].forEach(item => {
//         if(!item.isOk) {
//             tempMoney += Number(item.money)
//         }
//     })
//     // 判断是否满足 满减金额
//     max = Number(key.split('-')[0])
//     min = Number(key.split('-')[1])
//     console.log(tempMoney, max, min)
//     if(tempMoney > max) {
//         tempMoney -= min;
//         // 满足满减--那就标记一下
//         reduceRules[key].forEach(item => {
//             item.isOk = true
//         })
//     }
//     console.log(tempMoney)
//     total += tempMoney
// })

// console.log(reduceRules);
// console.log(total);


const getMinPrice = (goods) => {
    let total = 0
    let nomalTotal = 0  //  统计 特价、没有满减 的 金额
    // 整理所有满减规则
    let reduceRules = []
    let goodsArr = []   //  根据满减规则划分的商品数组
    goods.forEach(item => {
        item.j_money.split(',').forEach(inItem => {
            if(reduceRules.indexOf(inItem) < 0 && inItem) {
                reduceRules.push(inItem)
                goodsArr.push([])   //  先占位，一个满减规则对应一个数组
            }
        })
    })
    console.log(reduceRules)
    console.log('================满减规则')


    // 排序一下(正常情况肯定是买越多减越多，太智障的就不考虑了)
    reduceRules.sort(function(a, b) {
        return Number(a.split('-')[1]) < Number(b.split('-')[1])? 1: -1
    })
    console.log(reduceRules)
    console.log('================排序后的满减规则')

    
    // 将符合满减规则的丢到对应的位置里
    goods.forEach(item => {
        // 特价商品，直接累加金额
        if(item.s_money) {
            nomalTotal += parseFloat(item.s_money)
        }
        // 非特价，且存在满减规则
        else if(item.j_money) {
            item.j_money.split(',').forEach(inItem => {
                item.isOK = false   //  利用 js 对象 引用传递
                var index = reduceRules.indexOf(inItem);
                goodsArr[index].push(item)
            })
        } 
        // 原价
        else {
            nomalTotal += parseFloat(item.money)
        }
    })
    console.log(goodsArr)
    console.log('================满减商品')


    // 排序，符合多条满减规则的商品放后面
    goodsArr.forEach(item => {
        item.sort(function(a, b) {
            return a.j_money.split(',').length > b.j_money.split(',').length? 1: -1
        })
    })
    console.log(goodsArr)
    console.log('================排序后的满减商品')


    // 好了开始算钱了
    // 这里计算的只是 存在 满减规则 的商品
    // 只满足一种满减规则的，直接累加
    let ruleMax, ruleMin, tempNumber, tempIndex
    goodsArr.forEach((item, index) => {
        ruleMax = Number(reduceRules[index].split('-')[0])
        ruleMin = Number(reduceRules[index].split('-')[1])
        tempNumber = 0  //  临时计算价格
        tempIndex = -1  //  如果满足金额了，标记下标
        // 如果要求高，这里应该判断有多少种可以组合成满减的商品序列 -- 回溯
        // 暂时直接撸，能用就行
        // 遍历当前满减规则里的商品数据
        // 用 some 是为了随时跳出循环
        item.some((inItem, inIndex) => {
            // 未满足金额, 或者只符合当前计算规则, 则继续计算
            if(tempNumber < ruleMax || inItem.j_money.split(',').length <= 1) {
                // 此商品未参与计算，则累加
                if(!inItem.isOK) {
                    inItem.isOK = true  //  标记此商品已经计算过
                    tempNumber += parseFloat(inItem.money)
                }
            } else {
                tempIndex = inIndex //  如果要优化，可能会用到
                return true
            }
        })
        console.log(tempNumber)
        // 说明满足了满减金额
        if(tempNumber >= ruleMax) {
            total += (tempNumber - ruleMin)
        } else {
            total += tempNumber
        }
    })


    // 再遍历没有计算过的商品
    console.log(goodsArr)
    console.log('================待计算的满减商品')
    let extraTotal = 0
    goodsArr.forEach(item => {
        item.forEach(inItem => {
            if(!inItem.isOK) {
                extraTotal += parseFloat(inItem.money)
            }
        })
    })

    console.log(extraTotal)
    console.log('================待计算的金额')

    return total + nomalTotal + extraTotal
}


const goods = [
    {
        pid: '001',
        money: 50,
        s_money: '',
        j_money: '100-10'
    },
    {
        pid: '002',
        money: 20,
        s_money: '',
        j_money: '100-10'
    },
    {
        pid: '003',
        money: 50,
        s_money: '',
        j_money: '100-10,200-10'
    },
]
console.log(getMinPrice(goods))
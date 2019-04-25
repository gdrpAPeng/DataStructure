/*
 * @Author: APeng 
 * @Date: 2019-04-25 17:10:57 
 * @Last Modified by: APeng
 * @Last Modified time: 2019-04-25 18:05:56
 * 回溯算法
 */

/**
 * 1-3 的全排列
 */
let flag = new Array(4).fill(0)
let result = new Array(3).fill(0)

function dfs(deep) {
    if (deep == 4) {
        console.log(result)
        return
    }
    for (let i = 1; i <= 3; i++) {
        if (!flag[i]) {
            flag[i] = 1
            result[deep-1] = i
            dfs(deep + 1)
            flag[i] = 0
        }
    }
}
dfs(1)
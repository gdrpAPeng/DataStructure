/**
 * 希尔排序
 */
/**
 *  算法描述
 *      先将整个待排序的记录序列分割成为若干子序列分别进行直接插入排序，具体算法描述：
 *          定义增量变化规则
 *          按增量序列个数k，对序列进行k 趟排序
 *          每趟排序，根据对应的增量d，将待排序列分割成若干长度为m 的子序列
 *          分别对各子表进行直接插入排序。仅增量因子为1 时，整个序列作为一个表来处理，表长度即为整个序列的长度
 */
function shellSort(arr) {
    let len = arr.length;
    let d = Math.floor(len / 2);     // 定义每次排序的增量
    while (d >= 1) {    // 每次改变增量，这里自定义增量规则也可以
        for (let i = 0; i < d; i++) {       //  i的范围取决于增量
            for (let j = i + d; j < len; j += d) {  // 这里做插入排序
                for (let k = j; k > 0; k -= d) {
                    if (arr[k] < arr[k - d]) {
                        let temp = arr[k - d];
                        arr[k - d] = arr[k];
                        arr[k] = temp;
                    }
                }
            }
        }
        d = Math.floor(d /= 2);     //向下取整
    }
    return arr;
}
let arr = [49,38,65,97,76,13,27,49,55,04];
console.log(shellSort(arr))
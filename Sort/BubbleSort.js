/**
 * 冒泡排序
 * 2018-06-07 21:36
 */

/**
 * 算法描述
 *   比较相邻的元素。如果第一个比第二个大，就交换它们两个；
 *   对每一对相邻元素作同样的工作，从开始第一对到结尾的最后一对，这样在最后的元素应该会是最大的数；
 *   针对所有的元素重复以上的步骤，除了最后一个；
 *   重复步骤1~3，直到排序完成。
 */
function bubbleSort(arr) {
    let len = arr.length;
    for(let i = 0; i < len; i++) {
        for(let j = 0; j < len-1-i; j++) {
            if(arr[j] > arr[j+1]) {
                let temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
            }
        }
    }
    return arr;
}
let arr = [49,38,65,97,76,13,27,49,55,04];
console.log(bubbleSort(arr));
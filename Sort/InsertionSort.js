/**
 * 插入排序
 */
/**
 *  算法描述
 *      分为有序区、无序区
 *      每次将无序区第一个元素与有序区中元素逐一匹配
 *      找到相应位置插入
 * 
 *      从第一个元素开始，该元素可以认为已经被排序
 *      取出下一个元素，在已经排序的元素序列中从后向前扫描
 *      如果该元素（已排序）大于新元素，将该元素移到下一位置
 *      重复步骤3，直到找到已排序的元素小于或者等于新元素的位置
 *      将新元素插入到该位置后
 */
 function insertionSort(arr) {
     let len = arr.length;
     for(let i = 1; i < len; i++) {
         for(let j = i; j > 0; j--) {
             if(arr[j] < arr[j-1]) {    // 无序区第一个 比 有序区尾部元素小，则调换位置，继续下一轮比对
                 let temp = arr[j];
                 arr[j] = arr[j-1];
                 arr[j-1] = temp;
             } else {
                 break;
             }
         }
     }
     return arr;
 }
 let arr = [49,38,65,97,76,13,27,49,55,04];
 console.log(insertionSort(arr));
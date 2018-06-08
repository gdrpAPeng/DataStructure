/**
 * 选择排序
 */
/**
 *  算法描述
 *      首先在未排序序列中找到最小（大）元素
 *      存放到排序序列的起始位置
 *      再从剩余未排序元素中继续寻找最小（大）元素，然后放到已排序序列的末尾
 */
 function selectionSort(arr) {
     let len = arr.length;
     for(let i = 0; i < len-1; i++ ) {
         let min = arr[i];      // 将数组第一个元素初始化为最小值
         let minIndex = i;      // 标记第一个元素的下标
         for(let j = i+1; j < len; j++) { 
            if(arr[j] < min) {      // 寻找最小元素
                min = arr[j];
                minIndex = j;
            }
         }
         if(minIndex!=i){
             arr[minIndex] = arr[i];
             arr[i] = min;
         }
     }
     return arr;
 }
 let arr = [49,38,65,97,76,13,27,49,55,04];
 console.log(selectionSort(arr));
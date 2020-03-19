import { Data } from "../typings/api"

export type Debounce = () => void
export type DebounceFunc = () => void
export type Throttle = () => void
export type ThrottleFunc = () => void

// 时间戳转时间
export function timestampToTime(timestamp: string): string {
    const date: Date = new Date(timestamp)
    const Y = date.getFullYear() + '-'
    const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
    const D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
    const h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
    const m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
    const s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
    return Y + M + D + h + m + s
}

// 防抖函数
export function debounce(func: any, timeout: number): Debounce {
    let timer: NodeJS.Timeout | null
    return () => {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            func()
        }, timeout);
    }
}

// 节流函数
export function throttle(func: ThrottleFunc, timeout: number): Throttle {
    let timer: NodeJS.Timeout | null
    return () => {
        if(!timer) {
            timer = setTimeout(() => {
                timer = null
                func()
            }, timeout);
        }
    }
}

// 文件上传config
export const config = {
    headers: {
        'Content-type': 'multipart/learning-data'
    }
}

// 设置token
export const setToken = (token: string) => {
    window.localStorage.setItem("token", token)
    return true
}

//删除token
export const removeToken = () => {
    window.localStorage.removeItem("token")
    window.localStorage.removeItem("userInfo")
}

// 快排
export function quickSort<T>(arr: T[]): T[] {
    const sortLoop = <T>(arr: T[]): T[] => {
        let len: number = arr.length
        if(len < 2) {
            return arr
        } else {
            let flag: T = arr[0]
            const left: T[] = []
            const right: T[] = []
            for(let i = 1; i < len; i++) {
                if (arr[i] < flag) {
                    left.push(arr[i])
                } else {
                    right.push(arr[i])
                }
            }
            return [...sortLoop(left), flag, ...sortLoop(right)]
        }
    }
    return sortLoop(arr)
}

// 数组扁平化
export function flatten<T> (arr: T[]) {
    let result: T[] = []
    for(let i = 0; i < arr.length; i++) {
        if(Array.isArray(arr[i])) {
            result = result.concat(flatten(arr[i] as any))
        } else {
            result.push(arr[i])
        }
    }
    return result
}

// 查找点赞数最多

export function GetArrayMost(arr: number[]){
    var arrMap = new Map();
    var key = arr[0],
        value = 1;
    arr.forEach((item, index) => {
      if (arrMap.get(item) !== undefined) {
        let num = arrMap.get(item);
        arrMap.set(item, ++num);
      } else {
        arrMap.set(item, 1);
      }
      if (arrMap.get(item) > value) {
        key = item;
        value = arrMap.get(item);
      }
    });
    return [key, value];
}

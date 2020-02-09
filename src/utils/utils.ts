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
        'Content-type': 'multipart/form-data'
    }
}

// 设置token

export const setToken = (token: string) => {
    window.localStorage.setItem("token", token)
    return true
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

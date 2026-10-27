import { useSyncExternalStore } from 'react'
let now=Date.now()
let timer:ReturnType<typeof setInterval>|undefined
const subscribers=new Set<()=>void>()
// 首页和页脚共用一个时钟；最后一个订阅者离开时清理，SSR 不读取动态时间。
function subscribe(listener:()=>void) {
  subscribers.add(listener)
  now=Date.now()
  if(!timer)timer=setInterval(()=>{now=Date.now();subscribers.forEach(update=>update())},1000)
  return()=>{subscribers.delete(listener);if(subscribers.size===0){clearInterval(timer);timer=undefined}}
}
const snapshot=()=>now
const serverSnapshot=():number|null=>null
export function useClock(){return useSyncExternalStore(subscribe,snapshot,serverSnapshot)}

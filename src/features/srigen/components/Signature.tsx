'use client'
import { motion, useAnimationFrame, useInView, useMotionTemplate, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useEffect, useRef, type PointerEvent } from 'react'
import { imageRoot, images } from '../content/data'

export function LaceCursor() {
  const cursor=useRef<HTMLDivElement>(null),reduced=useReducedMotion()
  const data=useRef({x:-300,y:-300,shown:false,inside:true,mode:'base',snapUntil:0,link:8,points:Array.from({length:13},()=>({x:-300,y:-300}))})
  useEffect(()=>{
    if(reduced||!window.matchMedia('(pointer:fine)').matches)return
    const node=cursor.current,root=node?.closest<HTMLElement>('.sg-root');if(!node||!root)return
    root.dataset.cursor='active'
    const move=(event:globalThis.PointerEvent)=>{if(event.pointerType==='touch')return;const state=data.current;state.x=event.clientX;state.y=event.clientY;if(!state.shown){state.points.forEach(point=>{point.x=state.x;point.y=state.y});state.shown=true}const target=event.target instanceof Element?event.target:null;state.mode=target?.closest('input,textarea,select,.sg-box')?'ghost':target?.closest('a,button,[role=button]')?'hot':'base'}
    const down=()=>{data.current.snapUntil=performance.now()+150}
    const leave=()=>{data.current.inside=false;node.style.opacity='0'}
    const enter=()=>{data.current.inside=true}
    window.addEventListener('pointermove',move,{passive:true});window.addEventListener('pointerdown',down,{passive:true});document.documentElement.addEventListener('mouseleave',leave);document.documentElement.addEventListener('mouseenter',enter)
    return()=>{delete root.dataset.cursor;window.removeEventListener('pointermove',move);window.removeEventListener('pointerdown',down);document.documentElement.removeEventListener('mouseleave',leave);document.documentElement.removeEventListener('mouseenter',enter)}
  },[reduced])
  useAnimationFrame(()=>{
    const node=cursor.current,state=data.current;if(!node||reduced||!state.shown||!state.inside)return
    node.style.opacity='1'
    const snap=performance.now()<state.snapUntil,target=snap?12.5:state.mode==='hot'?4.6:8
    state.link+=(target-state.link)*.25
    state.points[0]={x:state.x,y:state.y}
    for(let i=1;i<state.points.length;i++)state.points[i].y+=snap?.15:1.15
    // 两轮长度约束形成松弛鞋带；不读取或修改业务数据，组件卸载时移除全部事件。
    for(let pass=0;pass<2;pass++)for(let i=1;i<state.points.length;i++){
      const point=state.points[i],previous=state.points[i-1],dx=point.x-previous.x,dy=point.y-previous.y,distance=Math.max(.0001,Math.hypot(dx,dy)),strength=pass===0?.62:.85
      point.x+=(previous.x+dx*state.link/distance-point.x)*strength;point.y+=(previous.y+dy*state.link/distance-point.y)*strength
    }
    Array.from(node.children).forEach((child,i)=>{
      const element=child as HTMLElement,p=state.points[Math.min(i,12)],q=state.points[Math.min(i+1,12)],angle=Math.atan2(q.y-p.y,q.x-p.x)
      element.style.opacity=state.mode==='ghost'?'.25':'1';element.style.transform=`translate3d(${p.x-6}px,${p.y-2.5}px,0) rotate(${angle}rad)`
    })
  })
  return <div ref={cursor} className="sg-lace-cursor" aria-hidden="true">{Array.from({length:12},(_,i)=><i key={i} style={{width:13-i*.25,height:5-i*.08}}/>)}<b/></div>
}

export function FooterWordmark({word}:{word:string}) {
  const root=useRef<HTMLDivElement>(null),letters=useRef<Array<HTMLSpanElement|null>>([]),copies=useRef<Array<HTMLSpanElement|null>>([]),runner=useRef<HTMLImageElement>(null)
  const prints=useRef<Array<HTMLElement|null>>([]),steps=useRef({lastHop:-1,next:0,births:Array<number>(8).fill(0),positions:Array<number>(8).fill(0)})
  const reduced=useReducedMotion(),visible=useInView(root,{margin:'20% 0px 20% 0px'})
  const {scrollYProgress}=useScroll({target:root,offset:['start 96%','start 24%']})
  const mx=useMotionValue(0),my=useMotionValue(0),targetRadius=useMotionValue(0),radius=useSpring(targetRadius,{stiffness:130,damping:20}),x=useSpring(mx,{stiffness:180,damping:24}),y=useSpring(my,{stiffness:180,damping:24}),soft=useTransform(radius,r=>r*.5)
  const mask=useMotionTemplate`radial-gradient(circle ${radius}px at ${x}px ${y}px,#000 ${soft}px,transparent ${radius}px)`
  const timer=useRef<ReturnType<typeof setTimeout>|undefined>(undefined)
  useEffect(()=>()=>clearTimeout(timer.current),[])
  useAnimationFrame(time=>{
    if(!visible||reduced)return
    const progress=scrollYProgress.get()
    letters.current.forEach((letter,index)=>{if(!letter)return;const amount=Math.min(1,Math.max(0,(progress-index*.055)/.55)),smooth=1-Math.pow(1-amount,3),translate=(1-smooth)*108,wave=Math.sin(time*.0012+index*.6)*5*smooth,angle=Math.sin(time*.0009+index*.9)*.9*smooth,transform=`translateY(${translate}%) translateY(${wave}px) rotate(${angle}deg)`;letter.style.transform=transform;if(copies.current[index])copies.current[index]!.style.transform=transform})
    if(runner.current&&root.current){const width=root.current.clientWidth+260,position=(time*.11)%width-130,hop=-Math.abs(Math.sin(time*.005))*18;runner.current.style.transform=`translate3d(${position}px,${hop}px,0) rotate(${Math.sin(time*.005)*7}deg)`;const footfall=Math.floor(time*.005/Math.PI),state=steps.current;if(footfall!==state.lastHop){state.lastHop=footfall;state.births[state.next]=time;state.positions[state.next]=position+45;state.next=(state.next+1)%state.births.length}prints.current.forEach((print,index)=>{if(!print)return;const age=time-state.births[index];print.style.opacity=String(state.births[index]>0?Math.max(0,.18*(1-age/2800)):0);print.style.transform=`translateX(${state.positions[index]}px) rotate(${index%2?8:-8}deg)`})}
  })
  function move(event:PointerEvent<HTMLDivElement>){if(reduced)return;const rect=event.currentTarget.getBoundingClientRect();mx.set(event.clientX-rect.left);my.set(event.clientY-rect.top);targetRadius.set(event.pointerType==='touch'?150:170)}
  return <div ref={root} className="sg-footer-wordmark" aria-hidden="true" onPointerMove={move} onPointerLeave={()=>targetRadius.set(0)} onPointerDown={event=>{move(event);const bounds=event.currentTarget.getBoundingClientRect();targetRadius.set(Math.hypot(bounds.width,bounds.height)*.72);clearTimeout(timer.current);timer.current=setTimeout(()=>targetRadius.set(0),1500)}}>
    <div className="sg-footer-letter-row">{Array.from(word).map((letter,index)=><span key={index}><span ref={node=>{letters.current[index]=node}}>{letter}</span></span>)}</div>
    <motion.div className="sg-footer-letter-row sg-footer-letter-volt" style={reduced?{opacity:0}:{maskImage:mask,WebkitMaskImage:mask}}>{Array.from(word).map((letter,index)=><span key={index}><span ref={node=>{copies.current[index]=node}}>{letter}</span></span>)}</motion.div>
    {!reduced&&<div className="sg-footer-runway">{Array.from({length:8},(_,index)=><i className="sg-run-print" key={index} ref={node=>{prints.current[index]=node}}/>)}<img ref={runner} src={imageRoot+images.left} alt=""/></div>}
  </div>
}

'use client'
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, useVelocity } from 'framer-motion'
import { useEffect, useRef, useState, type ReactNode, type PointerEvent } from 'react'
import { imageRoot, images } from '../content/data'
import type { Locale } from '../types'
import { useSrigenHost } from '../host'
import {useSceneProgress} from './scroll'

export const ease = [0.16, 1, 0.3, 1] as const
let hasEntered=false
export function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  const reduced = useReducedMotion()
  return <motion.div className={className} initial={reduced ? false : { y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 1.55, ease, delay }}>{children}</motion.div>
}
export function Title({ children, className = '', highlight }: { children: string; className?: string; highlight?:string }) {
  return <span className={`sg-title-lines ${className}`}>{children.split('\n').map((line,index)=><ScrollTitleLine key={line} line={line} index={index} highlight={highlight}/>)}</span>
}
function ScrollTitleLine({line,index,highlight}:{line:string;index:number;highlight?:string}) {
  const ref=useRef<HTMLSpanElement>(null)
  const reduced = useReducedMotion()
  const {scrollYProgress,scrollY}=useScroll({target:ref,offset:[`start ${98-index*4}%`,`start ${68-index*4}%`]})
  const velocity=useVelocity(scrollY),smooth=useSpring(velocity,{stiffness:120,damping:25})
  const skew=useTransform(smooth,value=>Math.max(-4,Math.min(4,-value*.002)))
  const y=useTransform(scrollYProgress,[0,1],['112%','0%'])
  const parts=highlight?line.split(highlight):[line]
  return <span className="sg-title-clip" ref={ref}><motion.span style={reduced?{}:{y,skewX:skew}}>{parts.map((part,i)=><span key={i}>{i>0&&<mark>{highlight}</mark>}{part}</span>)}</motion.span></span>
}
export function Curtain() {
  const reduced = useReducedMotion()
  const [quick]=useState(()=>hasEntered)
  useEffect(()=>{hasEntered=true},[])
  if (reduced) return null
  return <motion.div aria-hidden="true" className={`sg-curtain ${quick?'sg-curtain-quick':''}`} initial={{ y: 0 }} animate={{ y: '-101%' }} transition={{ delay: quick?.16:2, duration: quick?.6:.8, ease }}>
    {quick&&<svg className="sg-curtain-zip" viewBox="0 0 1440 40"><motion.path d="M0 20 H360 Q400 2 440 20 T520 20 H1440" fill="none" stroke="currentColor" strokeWidth="4" initial={{pathLength:0}} animate={{pathLength:1}} transition={{duration:.5,ease:[.45,0,.2,1]}}/></svg>}
    <svg className="sg-laces" viewBox="0 0 120 260"><g fill="none" stroke="currentColor">{[20, 65, 110, 155, 200].map((y, i) => <g key={y}>{[22,98].map(x => <motion.circle key={x} cx={x} cy={y} r="7" initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.08*i, type: 'spring' }}/>)}</g>)}<motion.path d="M22 20 L98 65 L22 110 L98 155 L22 200 L60 240 M98 20 L22 65 L98 110 L22 155 L98 200 L60 240" strokeWidth="4" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.32, duration: 1 }}/></g></svg>
    <div className="sg-curtain-word">{'SRIGEN'.split('').map((letter,i)=><motion.span key={i} initial={{y:100}} animate={{y:0}} transition={{delay:0.65+i*0.07,duration:0.5,ease}}>{letter}</motion.span>)}</div>
    <motion.i initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 1.5, duration: 0.4 }}/>
  </motion.div>
}
export function ShoeBox({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false)
  const reduced = useReducedMotion()
  const host = useSrigenHost()
  const box=useRef<HTMLButtonElement>(null),hovering=useRef(false),bursting=useRef(false),timer=useRef<ReturnType<typeof setTimeout>|undefined>(undefined)
  const press=useRef({x:0,y:0,time:0})
  const x = useMotionValue(0), y = useMotionValue(0),px=useMotionValue(200),py=useMotionValue(120),radius=useMotionValue(0)
  const rotateX = useSpring(y, { stiffness: 100, damping: 20 }), rotateY = useSpring(x, { stiffness: 100, damping: 20 })
  const cursorX=useSpring(px,{stiffness:180,damping:24}),cursorY=useSpring(py,{stiffness:180,damping:24}),r=useSpring(radius,{stiffness:130,damping:20})
  const innerR=useTransform(r,value=>value*.55),outerR=useTransform(r,value=>value*1.12),ringInner=useTransform(r,value=>value*.86)
  const mask=useMotionTemplate`radial-gradient(circle ${r}px at ${cursorX}px ${cursorY}px, #000 ${innerR}px, transparent ${r}px)`
  const ring=useMotionTemplate`radial-gradient(circle ${outerR}px at ${cursorX}px ${cursorY}px, transparent ${ringInner}px, #d6fb5180 ${r}px, transparent ${outerR}px)`
  useEffect(()=>()=>clearTimeout(timer.current),[])
  function move(event: PointerEvent<HTMLButtonElement>) {
    const bounds = event.currentTarget.getBoundingClientRect()
    px.set(event.clientX-bounds.left);py.set(event.clientY-bounds.top)
    if(!reduced){x.set(((event.clientX-bounds.left)/bounds.width-.5)*16);y.set(-((event.clientY-bounds.top)/bounds.height-.5)*12)}
    if(!bursting.current)radius.set(event.pointerType==='touch'?150:185)
  }
  function burst(){
    const bounds=box.current?.getBoundingClientRect();if(!bounds)return
    clearTimeout(timer.current);bursting.current=true;setOpen(true)
    radius.set(Math.hypot(bounds.width,bounds.height)*.72)
    timer.current=setTimeout(()=>{bursting.current=false;radius.set(hovering.current?185:0);setOpen(hovering.current)},1500)
  }
  return <div className="sg-box-stage">
    <motion.img className="sg-side-shoe sg-left-shoe" src={imageRoot + images.left} alt="" animate={{ x: open ? '-12%' : '-55%', opacity: open ? 1 : 0, rotate: open ? -14 : -35 }} transition={{ duration: reduced ? 0 : 0.9, ease }}/>
    <motion.img className="sg-side-shoe sg-right-shoe" src={imageRoot + images.right} alt="" animate={{ x: open ? '12%' : '55%', opacity: open ? 1 : 0, rotate: open ? 14 : 35 }} transition={{ duration: reduced ? 0 : 0.9, ease }}/>
    <motion.button ref={box} type="button" className="sg-box" aria-expanded={open} aria-label={locale === 'zh' ? '移动、拖动或轻触鞋盒，透视 001 鞋履' : 'Move, drag or tap the box to reveal the 001'} onPointerMove={move} onPointerEnter={event=>{if(event.pointerType!=='touch'){hovering.current=true;setOpen(true);move(event)}}} onPointerLeave={()=>{hovering.current=false;if(!bursting.current){setOpen(false);radius.set(0)}x.set(0);y.set(0)}} onPointerDown={event=>{press.current={x:event.clientX,y:event.clientY,time:performance.now()};move(event);event.currentTarget.setPointerCapture(event.pointerId)}} onPointerUp={event=>{if(event.currentTarget.hasPointerCapture(event.pointerId))event.currentTarget.releasePointerCapture(event.pointerId);if(performance.now()-press.current.time<320&&Math.hypot(event.clientX-press.current.x,event.clientY-press.current.y)<9)burst();else if(event.pointerType==='touch'&&!bursting.current){radius.set(0);setOpen(false)}}} onPointerCancel={()=>{if(!bursting.current){radius.set(0);setOpen(false)}}} onClick={event=>{if(event.detail===0){const bounds=box.current?.getBoundingClientRect();if(bounds){px.set(bounds.width*.63);py.set(bounds.height*.42)}burst()}}} style={{ rotateX: reduced ? 0 : rotateX, rotateY: reduced ? 0 : rotateY }} animate={reduced?{}:{y:[0,9,0,-9,0],rotate:[-2.4,-.9,-2.4,-3.9,-2.4],scale:[1,1.008,1,.992,1]}} transition={{duration:12,repeat:Infinity,ease:'linear'}}>
      <span className="sg-box-lid"><small>{locale === 'zh' ? '轻拿轻放 · 满怀期待' : 'HANDLE WITH HYPE'}</small><strong>{host.brandName[locale]}</strong><span>001 — {locale === 'zh' ? '首次发售' : 'FIRST DROP'}</span><i className="sg-barcode"/><small>US 4–13 · {locale === 'zh' ? '男女同款' : 'UNISEX'}</small></span>
      <motion.span className="sg-box-scan" style={reduced?{clipPath:open?'none':'circle(0%)'}:{maskImage:mask,WebkitMaskImage:mask}}><img src={imageRoot+images.arrival} alt={locale==='zh'?'001 鞋履与包装的透视画面':'001 sneaker inside the packaging'}/><i/><b>001</b></motion.span>
      <motion.span className="sg-box-scan-ring" style={{background:ring}}/>
    </motion.button>
  </div>
}
export function FloatingShoe({ className = '' }: { className?: string }) {
  const reduced = useReducedMotion()
  return <motion.img src={imageRoot + images.shoe} alt="SRIGEN 001" className={`sg-floating-shoe ${className}`} animate={reduced ? {} : { y: [0, -18, 0], rotate: [-9, -5, -9] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }} draggable={false}/>
}
export function FlipCard({ front, back, label, scrollFlip = false }: { front: ReactNode; back: ReactNode; label: string; scrollFlip?: boolean }) {
  const [flipped, setFlipped] = useState(false)
  const target = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target, offset: ['start 85%', 'start 30%'] })
  const rotate = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0, 0, 180, 180])
  return <div className="sg-flip-card" ref={target}>
    <button className="sg-flip-hit" aria-label={label} aria-pressed={flipped} onClick={() => setFlipped(value => !value)} onPointerEnter={event => { if(event.pointerType !== 'touch') setFlipped(true) }} onPointerLeave={event => {if(event.pointerType !== 'touch')setFlipped(false)}} onBlur={()=>setFlipped(false)}>
      <motion.span className="sg-flip-inner" style={scrollFlip && !reduced && !flipped ? { rotateY: rotate } : undefined} animate={scrollFlip && !reduced && !flipped ? undefined : { rotateY: flipped ? 180 : 0 }} transition={{ duration: reduced ? 0 : 0.75, ease }}>
        <span className="sg-flip-face sg-flip-front">{front}</span><span className="sg-flip-face sg-flip-back">{back}</span>
      </motion.span>
    </button>
  </div>
}
export function Arrival({ locale }: { locale: Locale }) {
  const ref = useRef<HTMLElement>(null), reduced = useReducedMotion()
  const scrollYProgress = useSceneProgress({ target: ref, offset: ['start start', 'end end'] })
  const shoeY=useTransform(scrollYProgress,[0,.74],['16vh','0vh'])
  const shoeScale=useTransform(scrollYProgress,[0,.74],[.45,1]),shoeRotate=useTransform(scrollYProgress,[0,.74],[-16,-2.8])
  const haloScale=useTransform(scrollYProgress,[0,.18,.68,1],[0,0,1.12,1])
  const ringScale=useTransform(scrollYProgress,[0,.3,.85,1],[.6,.6,1.35,1.35])
  const textOpacity=useTransform(scrollYProgress,[.62,.92],[0,1]),captionY=useTransform(scrollYProgress,[.62,.92],[26,0])
  return <section className="sg-arrival" ref={ref} data-motion="arrival"><div className="sg-sticky-stage">
    <p className="sg-eyebrow">03 — {locale === 'zh' ? '即将抵达' : 'THE ARRIVAL'}</p>
    <div className="sg-arrival-number">001</div>
    <motion.div className="sg-arrival-halo" style={reduced?{}:{scale:haloScale}}/>
    <motion.div className="sg-arrival-orbit" style={reduced?{}:{scale:ringScale}}/>
    <motion.div className="sg-arrival-photo" style={reduced?{}:{y:shoeY,scale:shoeScale,rotate:shoeRotate}}><img src={imageRoot+images.arrival} alt={locale==='zh'?'001 与鞋盒的圆形到达画面':'001 arriving in its box'}/></motion.div>
    <motion.div className="sg-arrival-caption" style={reduced ? {} : { opacity: textOpacity,y:captionY }}><h2>SRIGEN 001 — “VOLT”</h2><p>{locale === 'zh' ? '首个配色 · 也是最后一个' : 'FIRST AND FINAL COLORWAY'}</p></motion.div>
  </div></section>
}
export function Manifesto({ locale }: { locale: Locale }) {
  const lines = locale === 'zh' ? ['001 不是产品线','它是一场 300 双的事件','最后一双售出之时','便是模具销毁之日'] : ['THE 001 IS NOT A PRODUCT LINE.','IT IS A 300-PAIR EVENT.','WHEN THE LAST PAIR GOES,','THE MOULD IS DESTROYED.']
  return <section className="sg-manifesto sg-section" data-motion="manifesto"><p className="sg-eyebrow">04 — {locale === 'zh' ? '我们的宣言' : 'THE MANIFESTO'}</p><h2><Title highlight="300">{lines.join('\n')}</Title></h2><Reveal><i className="sg-manifesto-rule"/></Reveal></section>
}
export function Shutter({ locale }: { locale: Locale }) {
  const ref = useRef<HTMLElement>(null), reduced = useReducedMotion()
  const scrollYProgress = useSceneProgress({ target: ref, offset: ['start start', 'end end'] })
  const clip=useTransform(scrollYProgress,[0,.45],['inset(65% 0% 0% 0%)','inset(0% 0% 0% 0%)'])
  const scale=useTransform(scrollYProgress,[.22,.72],[.7,1]),rotate=useTransform(scrollYProgress,[.22,.72],[8,-2.8])
  const opacity=useTransform(scrollYProgress,[.22,.26],[0,1]),textOpacity=useTransform(scrollYProgress,[.62,.9],[0,1])
  return <section className="sg-shutter" ref={ref} data-motion="shutter"><div className="sg-sticky-stage">
    <div className="sg-ready-prompt"><p className="sg-eyebrow">11 — {locale==='zh'?'准备好了吗':'READY?'}</p><h2>{locale==='zh'?'继续向下滚动':'KEEP SCROLLING'}</h2></div>
    <motion.div className="sg-ready-dark" style={reduced?{}:{clipPath:clip}}><motion.img src={imageRoot+images.pack} alt={locale==='zh'?'001 圆形产品展示':'001 circular product display'} style={reduced?{}:{scale,rotate,opacity}}/><motion.div className="sg-shutter-reveal" style={reduced?{}:{opacity:textOpacity}}><h2>{locale === 'zh' ? '值得等待' : 'WORTH THE WAIT.'}</h2><p>11.07.2026 — {locale === 'zh' ? '首次 · 也是最后一次' : 'FIRST AND FINAL'}</p></motion.div></motion.div>
  </div></section>
}

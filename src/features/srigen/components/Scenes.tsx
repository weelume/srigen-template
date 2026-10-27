'use client'
import Link from 'next/link'
import { motion, useMotionValue, useReducedMotion, useTransform, type MotionValue } from 'framer-motion'
import { useEffect, useRef, type ReactNode } from 'react'
import { imageRoot, images } from '../content/data'
import { pageHref } from '../routing'
import type { Locale } from '../types'
import { Reveal } from './Motion'
import {useSceneProgress} from './scroll'
import { SectionLabel } from './UI'

export function HingedReveal({children,index=0}:{children:ReactNode;index?:number}) {
  const reduced=useReducedMotion()
  return <motion.div className="sg-hinged-card" initial={reduced?false:{rotateX:-88,y:-70,opacity:0}} whileInView={{rotateX:0,y:0,opacity:1}} viewport={{once:true,amount:.2}} transition={{duration:1.6,delay:index*.18,ease:[.34,1.3,.5,1]}}>{children}</motion.div>
}
export function DetailGallery({locale,basePath}:{locale:Locale;basePath:string}) {
  const container=useRef<HTMLElement>(null),track=useRef<HTMLDivElement>(null),reduced=useReducedMotion()
  const distance=useMotionValue(0)
  const scrollYProgress=useSceneProgress({target:container,offset:['start start','end end']})
  const x=useTransform([scrollYProgress,distance],([progress,length])=>-(Number(progress)*Number(length)))
  useEffect(()=>{
    const section=container.current,content=track.current
    if(!section||!content)return
    const measure=()=>{const length=Math.max(0,content.scrollWidth-section.clientWidth);distance.set(length);section.style.height=reduced?'auto':`${window.innerHeight+length}px`}
    const observer=new ResizeObserver(measure);observer.observe(content);window.addEventListener('resize',measure);measure()
    return()=>{observer.disconnect();window.removeEventListener('resize',measure)}
  },[distance,reduced])
  return <section ref={container} className={`sg-detail-gallery ${reduced?'sg-detail-native':''}`} data-motion="horizontal-details" tabIndex={0} aria-label={locale==='zh'?'细节长廊，向下滚动查看':'Detail gallery, scroll down to explore'} onKeyDown={event=>{if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();window.scrollBy({top:window.innerHeight*.65*(event.key==='ArrowRight'?1:-1),behavior:reduced?'instant':'smooth'})}}}><div className="sg-sticky-stage"><div className="sg-gallery-label"><SectionLabel number="10">{locale==='zh'?'细节之处':'THE DETAILS'}</SectionLabel></div><motion.div ref={track} className="sg-gallery-track" style={reduced?{}:{x}}>
    <GalleryImage image={images.toe} label={locale==='zh'?'鞋头 — 加固结构':'TOE BOX — REINFORCED'} index={0} progress={scrollYProgress}/>
    <article className="sg-gallery-colorway"><p className="sg-eyebrow">{locale==='zh'?'配色 — 01/01':'COLORWAY — 01/01'}</p><div><h2>VOLT</h2><p>{locale==='zh'?'骨白色麂皮，搭配荧光绿后跟拉环。001 的第一个，也是最后一个配色。':'Bone suede with an acid-green volt pull. The first and final colorway of the 001.'}</p></div></article>
    <GalleryImage image={images.lace} label={locale==='zh'?'鞋带单元 — 蜡棉':'LACE UNIT — WAXED COTTON'} index={2} progress={scrollYProgress}/>
    <GalleryImage image={images.heel} label={locale==='zh'?'后跟 — 荧光拉环':'HEEL TAB — VOLT PULL'} index={3} progress={scrollYProgress}/>
    <Link className="sg-gallery-link" href={pageHref(basePath,locale,'lookbook')}><h2>{locale==='zh'?<>翻开<br/>街头图鉴</>:<>SEE THE<br/>LOOKBOOK</>}</h2><small>{locale==='zh'?'穿上它 · 走上街头':'ON-BODY, ON-STREET'}</small></Link>
  </motion.div></div></section>
}
function GalleryImage({image,label,index,progress}:{image:string;label:string;index:number;progress:MotionValue<number>}) {
  const reduced=useReducedMotion(),x=useTransform(progress,[0,1],[20-index*6,-26-index*6])
  return <figure className={`sg-gallery-photo sg-gallery-photo-${index}`}><motion.img src={imageRoot+image} alt={label} style={reduced?{}:{x,scale:index===0?1.1:1.05}}/><figcaption>{label}</figcaption></figure>
}
export function Composition({locale}:{locale:Locale}) {
  const ref=useRef<HTMLElement>(null)
  const scrollYProgress=useSceneProgress({target:ref,offset:['start 95%','end 0%']})
  return <section ref={ref} className="sg-section sg-composition-scene" data-motion="composition"><SectionLabel number="09">{locale==='zh'?'构成之美':'THE COMPOSITION'}</SectionLabel><div className="sg-corner-stage">
    <CollageCard index={0} progress={scrollYProgress}><img src={imageRoot+images.composition} alt={locale==='zh'?'双鞋后跟的对称构图':'Symmetrical heel composition'}/></CollageCard>
    <CollageCard index={1} progress={scrollYProgress}><strong>{locale==='zh'?<>只裁切<br/>一次</>:<>CUT<br/>ONCE.</>}</strong></CollageCard>
    <CollageCard index={2} progress={scrollYProgress}><i/><strong>{locale==='zh'?'限量编号':'EDITION'}<br/>001–300</strong></CollageCard>
    <CollageCard index={3} progress={scrollYProgress}><img src={imageRoot+images.detail} alt={locale==='zh'?'鞋头细节':'Toe detail'}/></CollageCard>
    <Reveal className="sg-corner-headline"><h2>{locale==='zh'?<>每一部分<br/>都经过考量</>:<>EVERY PART,<br/>CONSIDERED.</>}</h2></Reveal>
  </div></section>
}
function CollageCard({children,index,progress}:{children:ReactNode;index:number;progress:MotionValue<number>}) {
  const reduced=useReducedMotion(),dir=[[-.7,-.6,-4.8],[.7,-.55,4],[-.65,.6,3.6],[.7,.62,-4]][index]
  const x=useTransform(progress,[index*.07,index*.07+.62],[dir[0]*70,0]),y=useTransform(progress,[index*.07,index*.07+.62],[dir[1]*70,0]),rotate=useTransform(progress,[index*.07,index*.07+.62],[dir[2],0])
  return <motion.figure className={`sg-corner-card sg-corner-${index}`} style={reduced?{}:{x,y,rotate}}>{children}</motion.figure>
}

const anatomyParts=[
  {zh:'全粒面鞋面',en:'FULL-GRAIN UPPER',bodyZh:'麂皮覆盖耐磨针织骨架',bodyEn:'Suede mapped over abrasion knit',x:36,y:52,left:true,labelY:16},
  {zh:'蜡棉鞋带',en:'WAXED LACES',bodyZh:'棉芯、打蜡、骨白同色',bodyEn:'Cotton core, waxed, tone-on-tone bone',x:46,y:41,left:false,labelY:24},
  {zh:'SR-FOAM™ 中底',en:'SR-FOAM™ MIDSOLE',bodyZh:'双密度 · 34% 能量回弹',bodyEn:'Dual-density · 34% rebound',x:48,y:66,left:true,labelY:58},
  {zh:'橡胶外底',en:'OUTSOLE',bodyZh:'波浪切槽 · 湿地抓地配方',bodyEn:'Wave-sipe rubber, wet-grip compound',x:50,y:71,left:false,labelY:72},
  {zh:'限量编号',en:'EDITION MARK',bodyZh:'后跟激光雕刻 001/300',bodyEn:'001/300 laser-etched at the heel',x:66,y:53,left:false,labelY:48},
]
export function TechnicalScene({locale,walkthrough=false}:{locale:Locale;walkthrough?:boolean}) {
  const ref=useRef<HTMLElement>(null),reduced=useReducedMotion()
  const scrollYProgress=useSceneProgress({target:ref,offset:walkthrough?['start start','end end']:['start 88%','end 8%']})
  const parts=walkthrough?anatomyParts:anatomyParts.filter((_,index)=>index!==3)
  return <section ref={ref} className={`sg-technical-scene ${walkthrough?'sg-technical-pinned':''}`} data-motion={walkthrough?'walkthrough':'callouts'}><div className={walkthrough?'sg-sticky-stage':'sg-tech-stage'}>
    {walkthrough&&<div className="sg-gallery-label"><SectionLabel number="03">{locale==='zh'?'逐层探索':'THE WALKTHROUGH'}</SectionLabel></div>}
    <div className="sg-tech-grid"><div className="sg-tech-image"><img src={imageRoot+images.plate} alt={locale==='zh'?'001 侧面结构技术图':'001 lateral technical plate'}/><small>FIG. 001-{walkthrough?'B — WALKTHROUGH':'A — LATERAL VIEW'}</small><b>001</b></div><svg viewBox="0 0 1000 700" className="sg-tech-lines" aria-hidden="true">{parts.map((part,index)=><CalloutLine part={part} index={index} key={part.en} progress={scrollYProgress} reduced={!!reduced}/>)}</svg><div className="sg-tech-labels">{parts.map((part,index)=><TechnicalLabel key={part.en} part={part} index={index} locale={locale} progress={scrollYProgress} reduced={!!reduced}/>)}</div></div>
    {walkthrough&&<div className="sg-tech-progress"><motion.i style={reduced?{}:{scaleY:scrollYProgress}}/></div>}
    <div className="sg-tech-mobile">{parts.map(part=><div key={part.en}><strong>{locale==='zh'?part.zh:part.en}</strong><p>{locale==='zh'?part.bodyZh:part.bodyEn}</p></div>)}</div>
  </div></section>
}
function CalloutLine({part,index,progress,reduced}:{part:typeof anatomyParts[number];index:number;progress:MotionValue<number>;reduced:boolean}) {
  const start=.06+index*.17,length=useTransform(progress,[start,start+.15],[0,1]),dot=useTransform(progress,[start,start+.075],[0,1])
  const x=200+part.x*6,y=170+part.y*3.6,end=part.left?125:875,elbow=part.left?160:840,labelY=part.labelY*7
  return <g><motion.path d={`M ${x} ${y} L ${elbow} ${labelY} L ${end} ${labelY}`} fill="none" stroke="currentColor" strokeWidth="1.25" style={reduced?{}:{pathLength:length}}/><motion.circle cx={x} cy={y} r="5" fill="currentColor" style={reduced?{}:{scale:dot}}/></g>
}
function TechnicalLabel({part,index,locale,progress,reduced}:{part:typeof anatomyParts[number];index:number;locale:Locale;progress:MotionValue<number>;reduced:boolean}) {
  const start=.06+index*.17,opacity=useTransform(progress,[start+.04,start+.15],[0,1]),y=useTransform(progress,[start+.04,start+.15],[12,0])
  return <motion.div className={part.left?'sg-tech-label-left':'sg-tech-label-right'} style={{top:`${part.labelY}%`,...(reduced?{}:{opacity,y})}}><strong>{locale==='zh'?part.zh:part.en}</strong><p>{locale==='zh'?part.bodyZh:part.bodyEn}</p></motion.div>
}

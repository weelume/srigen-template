'use client'
import { useState, type FormEvent, type ReactNode } from 'react'
import { brand } from '../config/brand'
import { specs } from '../content/data'
import type { Locale } from '../types'
import { Reveal } from './Motion'
import { useClock } from './clock'

export function SectionLabel({number,children}:{number:string;children:ReactNode}) { return <p className="sg-eyebrow"><i/>{number} — {children}</p> }
export function Countdown({locale,compact=false}:{locale:Locale;compact?:boolean}) {
  const now=useClock()
  const remaining=now===null?null:Math.max(0,Math.floor((Date.parse(brand.release)-now)/1000))
  const values=remaining===null?['--','--','--','--']:[Math.floor(remaining/86400),Math.floor(remaining/3600)%24,Math.floor(remaining/60)%60,remaining%60].map(value=>String(value).padStart(2,'0'))
  if(compact)return <time className="sg-countdown-compact" dateTime={brand.release}>{values[0]}D {values.slice(1).join(':')}</time>
  return <div className="sg-countdown" role="timer" aria-label={locale==='zh'?'距离发售时间':'Time until the drop'}>{values.map((value,i)=><div key={i}><strong>{value}</strong><span>{(locale==='zh'?['天','时','分','秒']:['DAYS','HRS','MIN','SEC'])[i]}</span></div>)}{remaining===0&&<p className="sg-countdown-ended">{locale==='zh'?'演示发售时间已到 · 本站不提供购买服务':'Demo drop time reached · No checkout on this site'}</p>}</div>
}
export function SpecTable({locale,number='12'}:{locale:Locale;number?:string}) {
  return <section className="sg-section sg-specs"><SectionLabel number={number}>{locale==='zh'?'规格数字':'THE NUMBERS'}</SectionLabel><div>{specs.map(([label,value],i)=><Reveal key={label.en} delay={i*0.07}><div className="sg-spec-row"><span>{label[locale]}</span><strong>{value[locale]}</strong></div></Reveal>)}</div></section>
}
export function NotifyForm({locale}:{locale:Locale}) {
  const [email,setEmail]=useState(''),[status,setStatus]=useState<'idle'|'invalid'|'validated'>('idle')
  function submit(event:FormEvent<HTMLFormElement>){event.preventDefault();setStatus(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())?'validated':'invalid')}
  return <form className="sg-notify-form" onSubmit={submit} noValidate>
    <label htmlFor="sg-email">{locale==='zh'?'邮箱地址':'Email address'}</label>
    <div><input id="sg-email" type="email" autoComplete="email" placeholder={locale==='zh'?'输入你的邮箱':'Your email address'} value={email} onChange={event=>{setEmail(event.target.value);setStatus('idle')}} aria-invalid={status==='invalid'} aria-describedby="sg-form-status sg-form-note" required/><button className="sg-pill" type="submit">{locale==='zh'?'校验邮箱':'Check email'}</button></div>
    <p id="sg-form-status" role="status" className={status==='invalid'?'sg-form-error':'sg-form-status'}>{status==='invalid'?(locale==='zh'?'请输入有效的邮箱地址':'Enter a valid email address'):status==='validated'?(locale==='zh'?'邮箱格式正确。演示表单未发送、未保存，也不会订阅提醒。':'Email format is valid. This demo has not sent or saved anything, and no reminder was subscribed.'):'\u00a0'}</p>
    <p id="sg-form-note" className="sg-form-note">{locale==='zh'?'演示表单 · 仅本地校验 · 不发送或保存个人数据':'DEMO FORM · LOCAL VALIDATION ONLY · NO DATA SENT OR SAVED'}</p>
  </form>
}

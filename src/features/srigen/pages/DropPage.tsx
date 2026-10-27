'use client'
import { boxContents, imageRoot } from '../content/data'
import { brand } from '../config/brand'
import type { PageProps } from '../types'
import { FlipCard, FloatingShoe, Reveal, Title } from '../components/Motion'
import { Shell } from '../components/Shell'
import { Countdown, NotifyForm, SectionLabel } from '../components/UI'

export default function DropPage({locale='zh',basePath}:PageProps) {
  const steps=locale==='zh'?[
    ['加入提醒名单','在下方输入邮箱。发售前 24 小时一次，开售时一次，不再打扰。'],
    ['10:00 ET — 大门开启','11 月 7 日，先到先得。每地址限购一双。统一 180 美元，运费已含。'],
    ['永久售罄','第 300 双售出后，我们会拍摄销毁模具的全过程。不返场，也没有「亲友版」。'],
  ]:[
    ['GET ON THE LIST','Drop an email below. One reminder at T-24h, one when the door opens. Nothing else, ever.'],
    ['10:00 ET — THE DOOR OPENS','November 7. First come, first served. One pair per address. $180 flat, shipping included.'],
    ['SOLD OUT, FOREVER',"When pair 300 goes, the mould is destroyed on camera. No re-runs. No ‘friends & family.’"],
  ]
  return <Shell locale={locale} basePath={basePath}><section className="sg-section sg-inner-hero sg-split"><div><SectionLabel number="01">{locale==='zh'?'限量发售':'THE DROP'}</SectionLabel><h1><Title highlight={locale==='zh'?'你的闹钟':'ALARM.'}>{locale==='zh'?'定好\n你的闹钟':'SET AN\nALARM.'}</Title></h1><div className="sg-drop-tags"><span>REL. {brand.date} — 10:00 ET</span><span>{locale==='zh'?'300 双':'300 PAIRS'}</span><span>{locale==='zh'?'唯一配色':'ONE COLORWAY'}</span><span>{locale==='zh'?'180 美元 — 含运费':'$180 — SHIPPING INCLUDED'}</span></div><p>{locale==='zh'?'001 只发售一次。300 双，一个配色，一个价格。这个页面，是唯一入口。':'The 001 releases once. Three hundred pairs, one colorway, one price. This page is the only door in.'}</p></div><div className="sg-inner-shoe"><FloatingShoe/></div></section><section className="sg-section sg-drop-timer"><Countdown locale={locale}/><a className="sg-pill" href="#sg-notify">{locale==='zh'?'发售提醒':'Notify me'}</a></section><section className="sg-section"><SectionLabel number="02">{locale==='zh'?'你将收到':'WHAT YOU GET'}</SectionLabel><div className="sg-three-grid">{[boxContents[1],boxContents[0],boxContents[2]].map((item,i)=><FlipCard key={item.title.en} label={locale==='zh'?`查看${item.title.zh}`:`View ${item.title.en}`} front={<><span className="sg-card-letter">{'ABC'[i]}</span><strong>{item.title[locale]}</strong><small>{locale==='zh'?'轻触翻面':'HOVER ↻'}</small></>} back={<><img src={imageRoot+item.image} alt={item.title[locale]}/><span>{item.body[locale]}</span></>}/>)}</div></section><section className="sg-section"><SectionLabel number="03">{locale==='zh'?'发售如何进行':'HOW THE DROP WORKS'}</SectionLabel><div className="sg-three-grid sg-steps">{steps.map(([title,body],i)=><Reveal key={title} delay={i*0.1}><span className="sg-index">0{i+1}</span><h2>{title}</h2><p>{body}</p></Reveal>)}</div></section><section className="sg-section sg-drop-manifesto"><h2><Title>{locale==='zh'?'不抽签\n不补货\n永不返场':'NO RAFFLES.\nNO RESTOCKS.\nEVER.'}</Title></h2><p>{locale==='zh'?'每个地址一双，没有提前入场，没有隐藏名单。售罄之后，它就是一件藏品。销毁模具的过程，我们会公开。':"Bots hate a fair door. One pair per address, no early access, no backdoor lists. When it’s gone it’s a museum piece — we film the mould being destroyed and post it."}</p><p className="sg-demo-note">{locale==='zh'?'以上为品牌概念展示，本演示站不提供交易或真实提醒服务。':'Brand concept demonstration. This site does not offer checkout or actual reminders.'}</p></section><section className="sg-section sg-notify" id="sg-notify"><SectionLabel number="04">{locale==='zh'?'设置提醒':'GET THE ALARM'}</SectionLabel><h2><Title>{locale==='zh'?'一个邮箱\n两次提醒':'ONE EMAIL.\nTWO REMINDERS.'}</Title></h2><NotifyForm locale={locale}/></section><section className="sg-section sg-end-cta"><h2><Title>{locale==='zh'?'发售之时\n与你相见':'SEE YOU AT\nTHE DROP.'}</Title></h2></section></Shell>
}

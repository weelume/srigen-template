'use client'
import { imageRoot, images } from '../content/data'
import type { PageProps } from '../types'
import { FloatingShoe, Reveal, Title } from '../components/Motion'
import { EndCTA, Shell } from '../components/Shell'
import { SectionLabel, SpecTable } from '../components/UI'
import {TechnicalScene} from '../components/Scenes'

export default function AnatomyPage({locale='zh',basePath}:PageProps) {
  const materials=locale==='zh'?[
    ['麂皮','全粒面、滚筒染色的骨白麂皮。磨痕让它更美，穿着即是最终工艺。'],['针织','麂皮之下的耐磨骨架。分区密度，不留摩擦热点。'],['SR-FOAM™','两种密度，一次成型。落地柔软，蹬离坚定。'],
  ]:[['SUEDE','Full-grain, drum-dyed bone. It scars beautifully — wear is the finish.'],['KNIT','Abrasion-mapped chassis under the suede. Zonal density, zero hot spots.'],['SR-FOAM™','Two densities poured in one mould. Soft at strike, firm at toe-off.']]
  return <Shell locale={locale} basePath={basePath}><section className="sg-section sg-inner-hero sg-split"><div><SectionLabel number="02">{locale==='zh'?'产品解剖':'ANATOMY'}</SectionLabel><h1><Title>{locale==='zh'?'拆解\n001':'THE 001,\nDECONSTRUCTED.'}</Title></h1><p>{locale==='zh'?'每一层，都有名字。每一种材料，都有理由。向下滚动，让鞋履自己解释。':'Every layer, named. Every compound, chosen for a reason. Scroll — the shoe explains itself.'}</p></div><div className="sg-inner-shoe"><FloatingShoe/></div></section><TechnicalScene locale={locale} walkthrough/><section className="sg-section"><SectionLabel number="04">{locale==='zh'?'材质':'MATERIALS'}</SectionLabel><div className="sg-three-grid">{materials.map(([title,body],i)=><Reveal key={title} delay={i*0.12}><img className="sg-material-image" src={imageRoot+[images.upper,images.toe,images.sole][i]} alt={title}/><span className="sg-index">0{i+1}</span><h2>{title}</h2><p>{body}</p></Reveal>)}</div></section><SpecTable locale={locale} number="05"/><section className="sg-section sg-edition"><SectionLabel number="06">{locale==='zh'?'限量编号':'THE EDITION'}</SectionLabel><h2><Title>001/300</Title></h2><p>{locale==='zh'?'你的编号会以激光刻在后跟，并写入 NFC 标签。300 双真实存在，而模具不再存在。':"Your number is laser-etched at the heel and written into the NFC tag. Three hundred exist. The mould doesn’t."}</p><img src={imageRoot+images.edition} alt={locale==='zh'?'独立编号细节':'Individually numbered edition detail'}/></section><EndCTA locale={locale} basePath={basePath} title={locale==='zh'?'现在\n找到你的那双':'NOW GO GET\nYOUR PAIR.'}/></Shell>
}

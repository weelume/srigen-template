import type { ComponentType } from 'react'
import market from '../../../.tpl/template.json'
import type { PageProps } from './types'
import './theme.css'
export interface TemplatePage { slug: string; title: string; localizedTitles: {en:string}; load: () => Promise<{default:ComponentType<PageProps>}> }
export const pages:TemplatePage[]=[
  {slug:'',title:'首页',localizedTitles:{en:'Home'},load:()=>import('./pages/HomePage')},
  {slug:'drop',title:'限量发售',localizedTitles:{en:'The Drop'},load:()=>import('./pages/DropPage')},
  {slug:'anatomy',title:'产品解剖',localizedTitles:{en:'Anatomy'},load:()=>import('./pages/AnatomyPage')},
  {slug:'lookbook',title:'街头图鉴',localizedTitles:{en:'Lookbook'},load:()=>import('./pages/LookbookPage')},
  {slug:'story',title:'品牌故事',localizedTitles:{en:'Story'},load:()=>import('./pages/StoryPage')},
  {slug:'404',title:'404 页面',localizedTitles:{en:'404'},load:()=>import('./pages/NotFoundPage')},
]
interface Screenshot {src:string;alt:string;device:'desktop'|'tablet'|'mobile';width:number;height:number}
const screenshots=(market.screenshots as Screenshot[]).map(item=>({...item,src:`/templates/srigen/screenshots/${item.src.split('/').at(-1)}`}))
if(screenshots.length===0)throw new Error('模板缺少真实展示截图')
export const srigenTemplate={
  id:'srigen',gitUrl:market.gitUrl,name:market.name,localizedNames:market.localizedNames,sceneId:market.sceneId,listed:false,tags:market.tags,summary:market.summary,accentColor:market.accentColor,
  cover:screenshots[0].src,screenshots:screenshots as [typeof screenshots[number],...typeof screenshots],
  surfaces:[{id:'site',name:'响应式官网',platform:'pc' as const,locales:['zh','en'] as const,pages}],
}

import { notFound } from 'next/navigation'
import { parseRoute } from '../../features/srigen/routing'
import { pages } from '../../features/srigen/template'
export function generateStaticParams(){return pages.flatMap(page=>[{slug:page.slug?page.slug.split('/'):[]},{slug:['en',...(page.slug?page.slug.split('/'):[])]}])}
export default async function Page({params}:{params:Promise<{slug?:string[]}>}) {
  const {slug:parts=[]}=await params,{locale,slug}=parseRoute(parts)
  const entry=pages.find(page=>page.slug===slug)
  if(!entry)notFound()
  const {default:PageComponent}=await entry.load()
  return <PageComponent locale={locale} basePath=""/>
}

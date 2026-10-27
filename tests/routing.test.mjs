import {test} from 'node:test'
import assert from 'node:assert/strict'
import {pageHref,parseRoute,switchLanguage} from '../src/features/srigen/routing.ts'
test('default Chinese and English pages resolve the same slug',()=>{
  assert.deepEqual(parseRoute([]),{locale:'zh',slug:''})
  assert.deepEqual(parseRoute(['en','anatomy']),{locale:'en',slug:'anatomy'})
})
test('language switch preserves page, query and anchor at standalone and mounted roots',()=>{
  assert.equal(switchLanguage('/templates/srigen/site','en','/templates/srigen/site/drop','?source=gallery','#sg-notify'),'/templates/srigen/site/en/drop?source=gallery#sg-notify')
  assert.equal(switchLanguage('/templates/srigen/site','zh','/templates/srigen/site/en/lookbook','',''),'/templates/srigen/site/lookbook')
  assert.equal(switchLanguage('','zh','/en/story','?a=1','#history'),'/story?a=1#history')
})
test('home links preserve valid base paths without double slashes',()=>{
  assert.equal(pageHref('','zh'),'/')
  assert.equal(pageHref('','en'),'/en')
  assert.equal(pageHref('/templates/srigen/site/','en','drop'),'/templates/srigen/site/en/drop')
})

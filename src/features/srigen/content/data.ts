import { bi } from '../types'
export const imageRoot = '/templates/srigen/images/'
export const images = {
  shoe: '975dKWWwPtL3k9bP3zc9pUWJEos.png',
  plate: 'TPqzTrtWUhETDPMayD6iQd9h1Wk.jpg',
  arrival: 'KjktOzTRlIU5EXdn1jlBVoYQ.jpg',
  left: 'yZdEWIP5Odyy7bv9JIKhxzSrxo.png',
  right: 'llvXjs18t94nqIgwJVvU6ahq00.png',
  sole: '1HxZ6zMO62iWDtyDCJxtMVqGxc.jpg',
  upper: 'AmnEUOJ9fuZ9q3HiQVMOw1k6HE.jpg',
  edition: '3MXeTXRQoOPCxNFbubX82EY42I.jpg',
  toe: 'To0NP0No4TRPyTx3RHeYOTwp9D8.jpg',
  heel: 'PQsSgVFn8uEgV4Rg791HXSmyto.jpg',
  lace: 'ZqoKUb9cojho3eDoBWeKDzT4.jpg',
  box: 'oosPpszXOqCU5wXVJodKEac3Y0.jpg',
  pack: 'DEEeAdaZXMZ7Czb1idQZAHBEZ4.jpg',
  proof: 'ULTxok35uxBHqXlzeUYr7OaONmc.jpg',
  composition: 'B51Zdz539QYhXS8WZ3O3I0hA.jpg',
  detail: 'r91ldql3zXiiFosSOAIvqmJJjkU.jpg',
  story: 'xV1Y7r0SFKbcN3IYBqzxZcI.jpg',
}
export const navigation = [
  { slug: 'drop', title: bi('限量发售', 'The Drop') },
  { slug: 'anatomy', title: bi('产品解剖', 'Anatomy') },
  { slug: 'lookbook', title: bi('街头图鉴', 'Lookbook') },
  { slug: 'story', title: bi('品牌故事', 'Story') },
]
export const featureCards = [
  { title: bi('SR-FOAM™', 'SR-FOAM™'), body: bi('双密度 · 34% 能量回弹', 'Dual-density · 34% rebound'), label: bi('中底单元', 'SOLE UNIT'), image: images.sole },
  { title: bi('全粒面麂皮', 'FULL-GRAIN'), body: bi('麂皮覆盖耐磨针织骨架', 'Suede over abrasion knit'), label: bi('鞋面', 'UPPER'), image: images.upper },
  { title: bi('限量 300 双', '300 PAIRS'), body: bi('独立编号 · 永不复刻', 'Numbered. Then never again.'), label: bi('编号 001/300', 'EDITION 001/300'), image: images.edition },
  { title: bi('312 克', '312 G'), body: bi('以 US 9 为标准的轻盈重量', 'Featherweight at a US 9'), label: bi('鞋头', 'TOE BOX'), image: images.toe },
  { title: bi('8 毫米落差', '8 MM DROP'), body: bi('为全天穿着调校', 'Tuned for all-day wear'), label: bi('后跟结构', 'HEEL STACK'), image: images.heel },
  { title: bi('蜡棉鞋带', 'WAXED LACES'), body: bi('骨白色 · 同色同调', 'Bone, tone on tone'), label: bi('鞋带单元', 'LACE UNIT'), image: images.lace },
]
export const materials = [
  { title: bi('SR-FOAM™', 'SR-FOAM™'), body: bi('双密度回弹，34% 能量反馈。落地柔软，蹬离坚定。', 'Dual-density return. 34% energy rebound, tuned soft at heel-strike, firm at toe-off.') },
  { title: bi('麂皮 + 针织', 'SUEDE + KNIT'), body: bi('全粒面麂皮覆盖耐磨针织骨架。每一道磨痕，都成为你的印记。', 'Full-grain suede mapped over an abrasion-knit chassis. Built to scuff beautifully.') },
  { title: bi('300 双', '300 PAIRS'), body: bi('每双鞋都以激光刻下专属编号。售罄之后，不再重来。', "Every pair laser-etched with its edition number. When they're gone, they're gone.") },
]
export const specs = [
  [bi('重量', 'WEIGHT'), bi('312 克（US 9）', '312 G (US 9)')],
  [bi('前后掌落差', 'HEEL-TOE DROP'), bi('8 毫米', '8 MM')],
  [bi('尺码', 'SIZES'), bi('US 4–13 · 男女同款', '4–13 US · UNISEX')],
  [bi('限量', 'EDITION'), bi('300 双', '300 PAIRS')],
  [bi('价格', 'PRICE'), bi('180 美元', '$180 USD')],
]
export const boxContents = [
  { title: bi('鞋盒', 'BOX'), image: images.box, body: bi('抗压盒盖、荧光绿薄纸、硫酸纸版次卡。', 'Crush-proof lid, volt tissue, edition card in vellum.') },
  { title: bi('鞋履', 'SHOE'), image: images.pack, body: bi('001「Volt」鞋履，配麂皮防尘袋。', "The 001 'Volt' pair, bagged in suede dust covers.") },
  { title: bi('凭证', 'PROOF'), image: images.proof, body: bi('NFC 真伪验证标签与激光雕刻的 001/300 编号。', 'NFC authenticity tag + laser-etched 001/300 numbering.') },
]
export const looks = [
  { image: 'dXYaj17qouani2228O9fXOQx8Ik.jpg', title: bi('雨夜 · 如约而至', 'RAIN CHECK — CASHED') },
  { image: 'eYXvlh7vmJJ4nVz8cPAtxZeOc.jpg', title: bi('金色时刻 · 骨白一双', 'GOLDEN HOUR, BONE PAIR') },
  { image: 'pxlZSxEX5dBueGre4ry3F0CSq9U.jpg', title: bi('步履 · 已至', 'STEPS — TAKEN') },
  { image: 'Gkx0roxH8lfq9otD8MUDeos2k.jpg', title: bi('俯瞰 · 就此锁定', 'TOP-DOWN. LOCKED IN.') },
  { image: 'BCjT94F2UEUOe9Np5CIg9TdTBQ.jpg', title: bi('石阶上的步伐', 'STRIDE ON STONE') },
  { image: 'IVmsdYvzxQRDwJ63pOPCxqeldW4.jpg', title: bi('路灯下的荧光', 'VOLT UNDER STREETLIGHT') },
]
export const quotes = [
  [bi('今秋唯一值得期待的首发。现在就敢这么说。', 'The only drop that matters this fall. Calling it now.'), '@sole_archive'],
  [bi('只做 300 双也太狠了。实物的荧光麂皮绝了。', '300 pairs is criminal. The volt suede is unreal in person.'), '@laced.daily'],
  [bi('看过样品。销毁模具是真的，他们会拍下来。', 'Saw the sample. The mould-destruction thing is real — they film it.'), '@heat.index'],
  [bi('很多年来，第一个有定力只做一双鞋的品牌。', 'First brand in years with the discipline to make ONE shoe.'), '@courtside.wav'],
  [bi('光是鞋盒就像一件家具。鞋子反而像是附赠。', 'That box alone is furniture. The shoe is a bonus.'), '@archivefits'],
  [bi('定了三个闹钟。说不补货，就是不补货。', 'Set three alarms. No restocks means no restocks.'), '@ninetysixer'],
] as const
export const timeline = [
  { year: '2024', title: bi('最初的草图', 'THE SKETCH'), body: bi('在皇后区一间公寓里，同一个轮廓画了 200 遍。第 200 张，终于留下。', 'One silhouette drawn 200 times in a Queens apartment. The 200th stuck.') },
  { year: '2025', title: bi('六次原型', 'SIX PROTOTYPES'), body: bi('六家工厂，六次打样，五次拒绝。第六次，终于理所当然。', 'Six factories, six samples, five rejections. The sixth felt inevitable.') },
  { year: '2026', title: bi('001 诞生', 'THE 001'), body: bi('300 双，已裁切。模具销毁的日期，也已定下。', "Three hundred pairs cut. The mould's destruction is already scheduled.") },
]
export const beliefs = [
  { title: bi('稀缺是一种诚实', 'SCARCITY IS HONESTY'), body: bi('材料、注意力、时间，一切都有限。假装无限，才是大多数品牌说的谎。', 'Everything is limited — materials, attention, time. Pretending otherwise is the lie most brands tell.') },
  { title: bi('一件事 · 做到底', 'ONE THING, DONE'), body: bi('产品目录是一种对冲。我们愿意把整个名字，押在一件作品上。', "A catalog is a hedge. We'd rather stake the whole name on a single object.") },
  { title: bi('以凭证代替承诺', 'PROOF OVER PROMISE'), body: bi('独立编号，销毁录像，NFC 验证。相信凭据，而非广告。', 'Numbered pairs, filmed mould destruction, NFC verification. Believe receipts, not campaigns.') },
]

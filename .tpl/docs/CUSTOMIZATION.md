# 修改指南

- 品牌、发售时间、价格：config/brand.ts；日期以带时区的 ISO 表示，同时更新展示日期。
- 标题、参数、材料、图鉴：content/data.ts，中英文同时修改。
- 色彩、玻璃质感、字号、原生滚动条、断点：theme.css。
- 动效触发、节奏和减少动态设置：components/Motion.tsx；菜单、语言和焦点在 Shell.tsx。
- 新页面：新建 pages/ 组件并更新 template.tsx、navigation、.tpl/template.json。
- 图片：替换 public/templates/srigen/images 并同步 sources.json。

每次修改按影响运行 pnpm typecheck、pnpm test、pnpm build，并浏览器验证相应页面。禁止自动接入邮件、支付或数据存储。

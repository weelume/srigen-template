# 架构

Next.js App Router 负责匹配路径。src/features/srigen 中 config/brand.ts 管理品牌与发售，content/data.ts 管理中英文内容、图片映射和结构化集合，theme.css 集中定义主题。components/Motion.tsx 维护交互鞋盒、首屏鞋带幕布、悬浮、翻转、滚动圆形到达与分幕；Shell.tsx 负责导航、语言、背景滚动锁定、焦点管理与页脚；UI.tsx 提供倒计时、参数表和本地表单。pages/ 组合五页，template.tsx 提供声明式页面注册，host.tsx 可选注入品牌配置。

public/templates/srigen 包含所有运行素材；.tpl/assets 仅保存真实展示截图。无服务端业务、数据库、持久化或外部发送。

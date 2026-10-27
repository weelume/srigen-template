# SRIGEN 001

双语限量运动鞋首发网站。五个业务页面及 404 页面：首页、发售、解剖、街头图鉴与故事；默认中文，英文以 `/en` 开头。包含光标透视鞋盒、产品悬浮、双面卡片、滚动圆形到达、宣言高亮、底部揭幕与横向细节长廊、视差摄影、倒计时和邮箱本地校验。

## 运行

Node 24.16.0、pnpm 9.15.4。在独立目录执行 `pnpm install --frozen-lockfile`、`pnpm dev`，访问 http://localhost:3000；Ctrl+C 停止。生产为 `pnpm build`、`pnpm start`。`PORT=43671 pnpm start` 可指定端口。默认无需环境变量，无数据库、支付、持久化、邮件或外部发送。

## 修改与验证

先读 `.tpl/README.md`、`.tpl/template.json`、`.tpl/project.json`。品牌在 `src/features/srigen/config/brand.ts`，双语内容在 `content/data.ts`，主题和响应式在 `theme.css`，交互在 `components/`，页面在 `pages/`。日期通过品牌配置维护，倒计时到零后停止，显示演示到期说明。

执行 `pnpm typecheck`、`pnpm test`、`pnpm build`。浏览器检查导航、EN 切换、邮箱无效/有效反馈、鞋盒与卡片、滚动叙事。支持 1440×1000、834×1180、390×844 和 320px。减少动态效果保留完整内容。

## 交付与许可

`pnpm bundle` 只在 Linux 文件系统打包干净 Git 提交，输出 `.work/packages/` 的组件包和来源记录；完整工程可用 `git archive` 导出。运行素材在 `public/templates/srigen`，展示素材在 `.tpl/assets`。许可与素材来源见 `.tpl/docs/LICENSE.md` 和 `public/templates/srigen/sources.json`。参考设计素材尚无商业再分发授权，不可宣称具有原作者许可。

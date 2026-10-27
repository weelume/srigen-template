import { useScroll, useTransform } from 'framer-motion'

/**
 * 固定舞台的多属性动画统一消费同一份 JS 进度。
 * 当前 Motion 版本会把标准 offset 的部分属性映射到原生 ViewTimeline，
 * 场景离开视口后其填充值会与 JS 属性不同步；函数式派生明确保持一个驱动源。
 */
export function useSceneProgress(options: Parameters<typeof useScroll>[0]) {
  const { scrollYProgress } = useScroll(options)
  return useTransform(scrollYProgress, value => Math.min(1, Math.max(0, value)))
}

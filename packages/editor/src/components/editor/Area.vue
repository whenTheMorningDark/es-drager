<template>
  <div v-show="show" class="es-editor-area" :style="areaStyle"></div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
interface AreaData {
  scale: number
}
// 定义 props 并设置默认值
const props = withDefaults(defineProps<AreaData>(), {
  scale: 1
})
const emit = defineEmits(['move', 'up'])
const show = ref(false)
const areaData = ref({
  width: 0,
  height: 0,
  top: 0,
  left: 0
})
const areaStyle = computed(() => {
  const { width, height, top, left } = areaData.value
  return {
    width: width + 'px',
    height: height + 'px',
    top: top + 'px',
    left: left + 'px'
  }
})

function onMouseDown(e: MouseEvent) {
  // 鼠标按下的位置
  const { pageX: downX, pageY: downY } = e
  const elRect = (e.target as HTMLElement)!.getBoundingClientRect()

  // 鼠标在编辑器中的偏移量（考虑 scale）
  const offsetX = (downX - elRect.left) / props.scale
  const offsetY = (downY - elRect.top) / props.scale

  const onMouseMove = (e: MouseEvent) => {
    // 移动的距离
    const disX = (e.pageX - downX) / props.scale
    const disY = (e.pageY - downY) / props.scale

    // 得到默认的left、top
    let left = offsetX,
      top = offsetY
    // 宽高取鼠标移动距离的绝对值
    let width = Math.abs(disX),
      height = Math.abs(disY)
    // 避免点击显示
    if (width > 2 || height > 2) {
      show.value = true
    }

    // 如果往左，将left减去增加的宽度
    if (disX < 0) {
      left = offsetX - width
    }

    // 如果往上，将top减去增加的高度
    if (disY < 0) {
      top = offsetY - height
    }

    areaData.value = {
      width,
      height,
      left,
      top
    }

    emit('move', { ...areaData.value })
  }

  const onMouseUp = () => {
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseup', onMouseUp)

    show.value = false
    areaData.value = {
      width: 0,
      height: 0,
      top: 0,
      left: 0
    }

    emit('up', areaData.value)
  }
  document.addEventListener('mousemove', onMouseMove)
  document.addEventListener('mouseup', onMouseUp)
}

defineExpose({
  onMouseDown,
  areaData
})
</script>

<style lang="scss" scoped>
.es-editor-area {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100px;
  height: 100px;
  border: 1px dashed var(--el-color-primary);
  background-color: rgba(var(--el-color-primary-rgb), 0.1);
}
</style>

<template>
  <template v-for="(list, index) in dragList">
    <Drager
      v-for="(item, index2) in list"
      :key="index"
      :width="100"
      :height="100"
      :left="index2 * 150 + 30"
      :top="index * 150 + 30"
      v-bind="item"
      :style="{ color: item.color }"
    >
      {{ t(item.text) }}
    </Drager>
  </template>

  <Drager v-bind="nested">
    <Drager v-for="item in nested.children" v-bind="item">{{ item.text }}</Drager>
  </Drager>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { t } from '@es-drager/common/i18n'
import Drager from 'es-drager'

const dragList = ref([
  [
    { text: 'examples.move', resizable: false, rotatable: false },
    { color: '#00c48f', text: 'examples.moveAndResize', rotatable: false },
    {
      color: '#ff9f00',
      text: 'examples.rotate',
      rotatable: true,
      resizable: false
    },
    { color: '#f44336', text: 'examples.rotateAndResize', rotatable: true }
  ],
  [
    { color: '#6A00FF', text: 'examples.skew', skewable: true },
    { color: '#6A00FF', text: 'examples.boundary', boundary: true },
    { color: '#D80073', text: 'examples.checkCollision', checkCollision: true },
    { color: '#1BA1E2', text: 'examples.minSzie', minWidth: 10, minHeight: 10 }
  ],
  [
    { color: '#31eff6', text: 'examples.snap', boundary: true, snap: true },
    { color: '#f46619', text: 'examples.markline', boundary: true, markline: true },
    { color: '#6bf419', text: 'examples.snapAndMarkline', boundary: true, snap: true, markline: true },
    { color: '#A20025', text: 'examples.disabled', disabled: true },
  ]
])

const nested = ref({
  boundary: true,
  snap: true,
  markline: true,
  width: 550,
  height: 100,
  left: 30,
  top: 3 * 150 + 30,
  children: [
    { text: 'Child1', width: 100, height: 100, boundary: true, zIndex: 1 },
    { text: 'Child2', width: 100, height: 100, boundary: true, zIndex: 1, left: 110 },
  ]
})
</script>

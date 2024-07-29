<template>
  <div class="paint-wrapper">
    <div class="canvas">
      <PaintBlock/>
    </div>
    <div class="chat">
      <Chat />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Chat from '@/components/chat/Chat.vue'
import PaintBlock from '@/components/paint/PaintBlock.vue'

export default defineComponent({
  components: {
    PaintBlock,
    Chat,
  },
})
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';

.paint-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  height: calc(100vh - 50px);
  margin: 15px 10px;
}

.canvas {
  background-color: $background-color;
}
</style>

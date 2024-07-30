<template>
  <div class="h-[85vh] flex justify-between items-start my-[5px] mx-[10px]">
    <PaintBlock/>
    <Chat />
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

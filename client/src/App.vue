<template>
  <div class="app">
    <Toolbar/>
    <Settingsbar/>
    <Canvas/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Canvas from '@/components/Canvas.vue'
import Toolbar from '@/components/Toolbar.vue'
import Settingsbar from '@/components/Settingsbar.vue'

export default defineComponent({
  components: {
    Canvas,
    Toolbar,
    Settingsbar
  }
})
</script>

<style scoped lang="scss">
@import "@/styles/variables.scss";

.app {
  height: 100vh;
  max-height: 100vh;
  width: 100vw;
  background-color: $background-color;
}
</style>
